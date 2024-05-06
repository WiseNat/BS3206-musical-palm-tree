import { Inter } from "next/font/google";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme";
import "./ui/globals.css";
import { auth } from "@/app/auth";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Innoconnect",
  description: "Innoconnect Application",
};

export default async function RootLayout({ children }) {
  const session = await auth();
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
