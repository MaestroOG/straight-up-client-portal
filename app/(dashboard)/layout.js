import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { getUser, getUserFromDB } from "@/lib/user";
import NextTopLoader from "nextjs-toploader";
import Script from "next/script";

export const metadata = {
  title: "Straight Up Digital Client Portal",
  description: "A client portal for managing projects and communication",
};


export default async function RootLayout({ children }) {
  const user = await getUser();
  const userFromDB = await getUserFromDB();
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
      <body
        className={`antialiased bg-background-gray flex`}
      >
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
        <Sidebar />
        <MainContent>
          <Header userFromDB={userFromDB} pfpLink={user?.profilePictureUrl} />
          {children}
        </MainContent>

        {/* Vercel Speed Insights */}
        <SpeedInsights />
      </body>
    </html>
  );
}
