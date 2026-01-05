import NextTopLoader from 'nextjs-toploader';
import '../globals.css'
import Script from 'next/script';
import { SpeedInsights } from "@vercel/speed-insights/next"

// app/login/layout.js
export default function LoginLayout({ children }) {
    return (
        <html lang="en">
            <head>
                {/* Google Analytics */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-5P46EQPE6Q"
                    strategy="afterInteractive"
                />
                <Script id="google-analytics" strategy="afterInteractive">
                    {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-5P46EQPE6Q');
          `}
                </Script>
            </head>
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

                {/* Vercel Speed Insights */}
                <SpeedInsights />
            </body>
        </html>
    );
}
