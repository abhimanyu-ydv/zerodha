import React from "react";
import { useSearchParams } from "react-router-dom";

import Hero from "./Hero";
import CreateTicket from "./CreateTicket";

function SupportPage() {
  // The search text lives in the URL (?q=...) so topic links can pre-fill it
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q") || "";

  const handleQueryChange = (text) => {
    setSearchParams(text ? { q: text } : {}, { replace: true });
  };

  return (
    <>
      <Hero query={query} onQueryChange={handleQueryChange} />
      <CreateTicket query={query} />
    </>
  );
}

export default SupportPage;
