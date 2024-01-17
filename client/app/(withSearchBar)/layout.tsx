import { SearchBar } from "@/components";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SearchBar />
      {children}
    </>
  );
}
