import members from '@/data/memberstest.json'

export default function Book() {
  return (
   <>
    <h1 className="text-xl font-bold m-2">Search member</h1>
    <form>
      <input type="text" placeholder="First" className='border border-gray-600'></input> 
      <input type="text" placeholder="Last" className='border border-gray-600'></input> 
      <input type="text" placeholder="Email" className='border border-gray-600'></input> 
      <button>Search</button>
    </form>
    <table className="table-auto m-4">
      <thead>
      <tr>
        <th>First</th>
        <th>Last</th>
        <th>Email</th>
      </tr>
      </thead>
      <tbody>
      {members.data.members.map((member) => (
        <tr key={member.email} className="gap-2">
          <td>{member.firstName}</td>
          <td className='ps-7'>{member.lastName}</td>
          <td className='ps-7'>{member.email}</td>
        </tr>
        ))}
      </tbody> 
    </table>
   </> 
  );
}
