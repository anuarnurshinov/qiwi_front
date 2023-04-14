import { MutableRefObject, useEffect, useRef } from "react";
import "./globals.scss";
import { ThemeProvider, createTheme } from "@mui/material";
//@ts-ignore

export const metadata = {
  title: "Оплата Steam",
  description: "Перевод на кошелек Steam",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/ico"
          sizes="32x32"
          href="/images/favicon.ico"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
