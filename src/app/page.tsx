"use client";

import Banner from "@/components/Banner";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import ListBtnInformasi from "@/components/ListBtnInformasi";
import ModalShare from "@/components/ModalShare";
import SekilasInfo from "@/components/SekilasInfo";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";
import { dataLink } from "./types/dataLink";

export default function Home() {

  const [linkContent, setLinkContent] = useState<dataLink|undefined>()

  const handleLinkContent = (link: dataLink) => {
    setLinkContent(link)
    
  }

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
    <div className=" h-screen bg-gradient-to-b from-green-500 to-green-900 ">
      <SekilasInfo />
      <div className=" h-full overflow-scroll">
        <Hero />
        {/* <Banner /> */}
        <ListBtnInformasi
          linkContent={linkContent}
          handleLinkContent={handleLinkContent}
        />
        <ModalShare
          linkContent={linkContent}
          handleLinkContent={handleLinkContent}
        />
        <Footer />
      </div>
    </div>
  );
}
