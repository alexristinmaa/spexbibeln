import type { Metadata } from "next";
import "./globals.css";

import styles from './layout.module.css';
import Link from "next/link";
import Image from 'next/image';

import {Raleway} from 'next/font/google';
import hbSpexet from './hbspexet.png';

export const metadata: Metadata = {
  title: "Spexbibeln",
  description: "För alla dina frågor",
};

const raleway = Raleway({
  weight: "800"
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={styles.body}>
          <Link href="/">
            <header className={styles.header}>
              <div className={styles.line}></div>
              <Image className={styles.logo} src={hbSpexet} alt='hbspexetlogga' width={200} height={200}></Image>
              <h1 className={raleway.className}>SPEXBIBELN</h1>
              <Image className={styles.logo} src={hbSpexet} alt='hbspexetlogga' width={200} height={200}></Image>
              <div className={styles.line}></div>
            </header>
          </Link>
          <main className={styles.main}>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
