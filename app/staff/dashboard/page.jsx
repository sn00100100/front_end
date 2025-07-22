export default function Dashboard() {
  return (
   <>
    <div>
      <h1 className="text-xl font-bold p-2">Welcome, Staff!</h1>
    </div>
    <div className="grid grid-cols-4 gap-4 justify-center p-2">
      <div className="border">Notifications</div>
      <div className="border">Messages</div>
      <div className="border">Outstanding Fines</div>
      <div className="border">Settings</div>
    </div>
    <div className="grid grid-cols-1 border m-2">
      <div>some text</div>
    </div>
   </> 
  );
}
