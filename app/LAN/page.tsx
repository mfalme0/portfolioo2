'use client'
import React, { useState } from "react";
import PageLoader from "../Components/page-loader";
import Header from "../Components/header";
import LanPageContent from "../Components/lan/content";

export default function LanClientWrapper() {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <Header />
      {!loadingComplete && <PageLoader theme="lan" onComplete={() => setLoadingComplete(true)} />}

      {loadingComplete && (
        <LanPageContent />
      )}
    </>
  );
}
