import Sidebar from "@/components/dashboardComponents/Sidebar";
import "../globals.css";
import MainContent from "@/components/dashboardComponents/MainContent";
import Header from "@/components/dashboardComponents/Header";
import TawkToChat from "@/components/TawkToChat";
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
        {user && user.role !== "superadmin" && <TawkToChat />}

      </body>
    </html>
  );
}
