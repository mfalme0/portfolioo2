'use client'
import React, { useState } from "react";
import LanLoader from "../Components/lan/loader";
import Header from "../Components/header";
import LanPageContent from "../Components/lan/content";
import { CustomEvents, DynamicEvents } from "../Components/lan/events";

export default function LanClientWrapper({ images }: { images: string[] }) {
  const [loadingComplete, setLoadingComplete] = useState(false);

  return (
    <>
      <Header />
      {!loadingComplete && <LanLoader onComplete={() => setLoadingComplete(true)} />}

      {loadingComplete && (
        <>
          <LanPageContent />
          <CustomEvents />
          <div className="max-w-5xl mx-auto px-6 pb-16 relative z-10">
            <DynamicEvents />
          </div>
        </>
      )}
    </>
  );
}
