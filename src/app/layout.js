import localFont from "next/font/local";
import { Ubuntu, Poppins } from "next/font/google";
import "./globals.css";
import { Providers } from "@/context/provider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const ubuntu = Ubuntu({
  subsets: ["latin"],
  variable: "--font-ubuntu",
  weight: ["300", "400", "500", "700"],
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["300", "400", "500", "700"],
});

export const metadata = {
  title: "News Dashboard",
  description: "News Dashboard created with News API",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${ubuntu.variable} ${poppins.variable} ${geistSans.variable} ${geistMono.variable}  antialiased`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
