import type { Metadata } from "next";
import "./globals.css";
import LayoutProvider from "@/components/LayoutProvider";
import ReduxProvider from "@/components/ReduxProvider";

export const metadata: Metadata = {
  title: "Task Manager",
  description: "Task Manager",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ReduxProvider>
      <LayoutProvider>{children}</LayoutProvider>
    </ReduxProvider>
  );
}
