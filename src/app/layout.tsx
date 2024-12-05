import "@/style/globals.css";
import { Provider } from "@/components/provider";
import { ThemeProvider } from "@/components/themeProvider";
import { ThemeToggle } from "@/components/themeToggle";

export const metadata = {
  title: "Flights",
  description: "Manage your journey in one app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Provider>
          <ThemeProvider><ThemeToggle />{children}</ThemeProvider>
        </Provider>
      </body>
    </html>
  );
}
