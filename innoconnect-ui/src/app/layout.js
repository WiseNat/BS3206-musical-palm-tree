import { Inter } from "next/font/google";
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import "./ui/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Innoconnect",
  description: "Innoconnect Application",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider theme={theme}>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
