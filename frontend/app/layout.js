import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Expense Tracker",
  description:
    "Track your expenses easily with Your Expense Tracker. Manage your finances efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <title>Your Expense Tracker</title>
        <meta
          name="description"
          content="Track your expenses easily with Your Expense Tracker. Manage your finances efficiently."
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <body className={inter.className}>{children}</body>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </html>
  );
}
