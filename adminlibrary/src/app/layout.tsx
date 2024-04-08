'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Layout, Flex} from 'antd';
import { useStyles } from "./Navigation/dashboard/styles/style";
import { BookProvider } from "../../providers/BookProvider";
import { UserProvider } from "../../providers/LoginProviders";
import ConfigProvider from '../../providers/AppConfigProvider'
import { TransactionProvider } from "../../providers/TransactionProvider";


const inter = Inter({ subsets: ["cyrillic"] });
const { Header, Footer, Sider, Content } = Layout;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { styles } = useStyles();
  return (
    <html lang="en" style={{ height: '100%' }}>
      <head>
        <title>Admin portal</title>
      </head>
      <body className={inter.className} style={{ height: '100%', margin: 0, }}>
      
        <UserProvider> 
            
          <BookProvider>
             <ConfigProvider>
             <TransactionProvider> 
             {children}
             </TransactionProvider>
             </ConfigProvider> 
          </BookProvider>
        </UserProvider>
      
      </body>
    </html>
  );
}
