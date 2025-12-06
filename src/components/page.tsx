"use client";

import React, { useState } from "react";
import Hero from "@/components/Hero";
import ListBtnInformasi from "@/components/ListBtnInformasi";
import ListBtnPengurus from "@/components/ListBtnPengurus";
import Footer from "@/components/Footer";
import SekilasInfo from "@/components/SekilasInfo";
import ModalShareProgram from "@/components/ModalShareProgram";
import { dataLink } from "@/app/types/dataLink";

export default function Home() {
  const [linkContent, setLinkContent] = useState<dataLink>();

  const handleLinkContent = (link: dataLink) => {
    if (link) {
      setLinkContent(link);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <div
        className="w-full bg-cover bg-center"
        style={{ backgroundImage: "url('/bg-img-1.png')" }}
      >
        <SekilasInfo />
        <Hero />
        <ListBtnInformasi
          linkContent={linkContent}
          handleLinkContent={handleLinkContent}
        />
        <ListBtnPengurus
          linkContent={linkContent}
          handleLinkContent={handleLinkContent}
        />
        <ModalShareProgram
          linkContent={linkContent}
          handleLinkContent={handleLinkContent}
        />
        <Footer />
      </div>
    </main>
  );
}
