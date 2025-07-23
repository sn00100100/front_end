import '@/app/globals.css'
import Hero1 from '@/app/components/ui/hero1'
import Hero2 from '@/app/components/ui/hero2'
import Hero3 from '@/app/components/ui/hero3'
import Hero4 from '@/app/components/ui/hero4'

export default function Home() {
  return (
   <div className="grid p-2">
       <div>
         <Hero1 />
         <Hero2 />
         <Hero3 />
         <Hero4 />
       </div>
   </div> 
  );
}