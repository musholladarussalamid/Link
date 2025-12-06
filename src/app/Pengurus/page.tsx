"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ListBtnPengurus from "@/components/ListBtnPengurus";
import ModalShareProgram from "@/components/ModalShareProgram";
import SekilasInfo from "@/components/SekilasInfo";
import React, { useEffect, useState } from "react";
import { dataLink } from "../types/dataLink";

const Pengurus = () => {
  const [linkContent, setLinkContent] = useState<dataLink | undefined>();

  const handleLinkContent = (link: dataLink) => {
    setLinkContent(link);
  };

  useEffect(() => {
    var head = document.getElementsByTagName("head").item(0);
    head?.childNodes.forEach((item) => {
      if (item.nodeName != "STYLE") {
      } else {
        console.log("Item => ", item.textContent);
        item.textContent = "";
      }
    });
  });

  return (
    <div className=" h-screen bg-gradient-to-b from-green-500 to-green-900">
      <SekilasInfo />
      <div className=" h-full overflow-scroll">
        <Hero />
        {/* <Banner /> */}
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
    </div>
  );
};

export default Pengurus;
