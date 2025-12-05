import NextTopLoader from 'nextjs-toploader';
import '../globals.css'

// app/login/layout.js
export default function LoginLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <NextTopLoader
                    color="#39B54A"
                    initialPosition={0.08}
                    crawlSpeed={200}
                    height={3}
                    crawl={true}
                    showSpinner={false}
                    easing="ease"
                    speed={200}
                />
                {children}
            </body>
        </html>
    );
}
