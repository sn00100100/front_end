// REAL-WORLD EXAMPLE: How validation protects your member search page
// This demonstrates actual scenarios that could happen in your app

import { useState, useEffect } from 'react';
import { getMembers } from '../app/lib/api/members';

// === SCENARIO: Backend team makes a breaking change ===
// 
// Imagine your backend team accidentally deploys code that returns:
// {
//   "data": {
//     "members": [
//       {
//         "memberID": "123",        // ❌ String instead of number!
//         "firstName": null,        // ❌ Null instead of string!
//         "lastName": undefined,    // ❌ Missing field!
//         "email": 42               // ❌ Number instead of string!
//       }
//     ]
//   }
// }

// === BEFORE: Your old code (vulnerable) ===
function MemberSearchPageOLD() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        // OLD API - just returns raw JSON (no validation)
        const response = await fetch('http://127.0.0.1:80/api/members');
        const data = await response.json();
        const memberList = data.data?.members || [];
        
        setMembers(memberList);  // ❌ Trusting bad data!
      } catch (err) {
        setError(err.message);
      }
    }
    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <tbody>
          {members.map((member) => (
            // 💥 CRASH! These will throw errors with bad data:
            // - member.email could be 42 (can't use as React key)
            // - member.firstName.toUpperCase() crashes if null
            // - member.memberID might be string "123" 
            <tr key={member.email}>  
              <td>{member.firstName.toUpperCase()}</td>  
              <td>{member.lastName}</td>
              <td>{member.email}</td>
              <td>ID: {member.memberID + 1}</td>  
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// === AFTER: Your new code (protected) ===
function MemberSearchPageNEW() {
  const [members, setMembers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMembers() {
      try {
        // NEW API - validates data before returning
        const memberList = await getMembers();  // Uses Member.fromJSON()
        
        setMembers(memberList);  // ✅ Guaranteed valid Member instances!
      } catch (err) {
        // ✅ Clear error message if validation fails
        setError(`Failed to load members: ${err.message}`);
      }
    }
    fetchMembers();
  }, []);

  return (
    <div>
      <h1>Members</h1>
      {error && <p>Error: {error}</p>}
      <table>
        <tbody>
          {members.map((member) => (
            // ✅ SAFE! All properties guaranteed to be correct type
            <tr key={member.email}>
              <td>{member.firstName.toUpperCase()}</td>  {/* Always a string */}
              <td>{member.lastName}</td>                 {/* Always a string */}
              <td>{member.email}</td>                    {/* Always a string */}
              <td>ID: {member.memberID + 1}</td>         {/* Always a number */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// === WHAT HAPPENS WITH BAD DATA ===
/*

OLD CODE (before validation):
❌ Runtime errors in the browser:
   - "Cannot read property 'toUpperCase' of null"
   - "42 is not a valid React key"  
   - NaN appears in the UI (string + 1 = NaN)
   - User sees broken page with no clear error

NEW CODE (with validation):  
✅ Clear error handling:
   - API call fails fast with "Invalid Member JSON: missing or invalid required fields"
   - User sees friendly error message
   - No broken UI, easy to debug
   - Team can identify backend issue immediately

*/

// === ANOTHER REAL EXAMPLE: Form Submission ===
async function handleCreateMember(formData) {
  try {
    // This validates the server response
    const newMember = await createMember({
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      username: formData.get('username'),
      password: formData.get('password')
    });
    
    // ✅ newMember is guaranteed to be a valid Member instance
    console.log(`Created member: ${newMember.firstName} ${newMember.lastName}`);
    
    // Safe to add to state, display in UI, etc.
    return newMember;
    
  } catch (error) {
    // ✅ Handle both network errors AND validation errors
    if (error.message.includes('Invalid Member JSON')) {
      console.error('Server returned invalid member data:', error);
      throw new Error('Server error - please try again later');
    } else {
      console.error('Network error:', error);
      throw new Error('Connection failed - check your internet');
    }
  }
}

export { MemberSearchPageOLD, MemberSearchPageNEW, handleCreateMember }; 