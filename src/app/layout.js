import "./globals.css";
import NavBar from "@/components/NavBar";
import { Roboto } from "next/font/google";
import SessionProvider from '@/components/SessionProvider'
import { getServerSession } from "next-auth";

const roboto = Roboto({ subsets: ["latin"], weight: '400' });


export const metadata = {
  title: "The Reporting Source",
  description: "Verify Properties",

};

export default async function RootLayout({ children }) {

  const session = await getServerSession()

  return (
      <html lang="en">
        <body className={`${roboto.className} bg-offwhite`}>
          <SessionProvider session={session}>
            <NavBar />
            {children}
          </SessionProvider>
          </body>
      </html>
  );
}
