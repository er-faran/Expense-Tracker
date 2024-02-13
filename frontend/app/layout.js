import { Inter } from "next/font/google";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Your Expense Tracker",
  description:
    "Track your expenses easily with Your Expense Tracker. Manage your finances efficiently.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <link rel="icon" href="/favicon.png" /> */}
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={metadata.description} />
        <meta name="robots" content="index, follow" />
        <meta
          name="keywords"
          content="expense tracker, finances, tracking, expenses, your expense tracker"
        />
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.png" />
        <link rel="canonical" href="https://your-expense-tracker.vercel.app/" />
        {/* Add Open Graph (OG) meta tags for better social media sharing */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:image" content="/favicon.png" />
        <meta
          property="og:url"
          content="https://your-expense-tracker.vercel.app/"
        />
        <meta property="og:type" content="website" />
        {/* Add Twitter Card meta tags for better Twitter sharing */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
      </head>
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
