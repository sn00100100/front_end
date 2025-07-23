import myData from '@/public/data/book'
const javascriptObject = JSON.parse(jsonString)

export default function Catalog() {
  return (
   <>
    <p>{ javascriptObject }</p>
   </> 
  );
}
