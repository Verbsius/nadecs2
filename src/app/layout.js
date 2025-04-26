import "./globals.css";
export const metadata = {
  title: "NadeShare",
  description: "Your nade sharing platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-georgia">{children}</body>
    </html>
  );
}
