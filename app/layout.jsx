import '@/app/globals.css'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <section>{ children }</section>
      </body>
    </html>
  );
}