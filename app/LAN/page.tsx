// Components/lan/client-wrapper.tsx
'use client'
import React, { useState } from "react";
import LanLoader from "../Components/lan/loader";
import Header from "../Components/header";
import LanPageContent from "../Components/lan/content";


export default function LanClientWrapper({ images }: { images: string[] }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <Header />
      {!loadingComplete && <LanLoader onComplete={() => setLoadingComplete(true)} />}

      {loadingComplete && <LanPageContent />}
    </>
  );
}