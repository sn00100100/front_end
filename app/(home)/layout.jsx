import '@/app/globals.css'
import Header from '@/app/components/layout/header'
import Footer from '@/app/components/layout/footer'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        { children }
        <Footer />
      </body>
    </html>
  );
}