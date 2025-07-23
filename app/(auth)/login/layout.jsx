import Header from '@/app/components/layout/header'

export default function AuthLayout ({ children }) {
    return (
        <html>
            <body>
                <Header />
                { children }
            </body>
        </html>
    )
}