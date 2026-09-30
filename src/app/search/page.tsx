import type { Metadata } from "next";
import { SearchView } from "@/components/search-view";
import { Footer, Header } from "@/components/site";

export const metadata: Metadata = { title: "Find Your Next Course — ByteSpace" };

export default function SearchPage() {
  return (
    <>
      <Header />
      <SearchView />
      <Footer />
    </>
  );
}
