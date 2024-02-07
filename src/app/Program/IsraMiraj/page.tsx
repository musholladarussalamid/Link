"use client";

import SekilasInfo from "@/components/SekilasInfo";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalDonasi from "@/components/ModalDonasi";
import { dataLink } from "@/app/types/dataLink";
import { dataDetailProgram } from "@/app/types/dataDetailProgram";

const IsraMiraj = () => {
  const [linkContent, setLinkContent] = useState<
    dataDetailProgram | undefined
  >();
  const env = process.env.NODE_ENV === "production";
  const base_url = env ? "/Link" : "";
  const [shimmerLoad, setShimmerLoad] = useState<boolean>(true);
  const [descriptionContent, setDescriptionContent] = useState("");

  const handleLinkContent = (link: dataDetailProgram) => {
    setLinkContent(link);
  };

  useEffect(() => {
    const link = env ? "/Link" : "";
    const urlDataLink = link + "/data_link.json";

    fetch(urlDataLink)
      .then((response) => response.json())
      .then((json) => {
        if (json.dataLinkProgram) {
          const detailProgramSarpras = json.dataLinkProgram[0];
          console.log("detailProgramSarpras => ", detailProgramSarpras);
          setLinkContent(detailProgramSarpras);
          setShimmerLoad(!shimmerLoad);
        }
      });
  }, []);

  useEffect(() => {
    if (linkContent?.description && linkContent?.description != undefined) {
      setDescriptionContent(linkContent?.description);
    }
  }, [linkContent]);

  return (
    <div className=" h-screen overflow-scroll">
      <SekilasInfo />

      {/* Gamber Program */}
      <div className="max-container">
        <div className="flex p-2 justify-center ">
          <div className="box-content rounded-md">
            <Image
              priority
              width={500}
              height={500}
              className=" h-full p-2"
              src={base_url + linkContent?.image}
              alt="logo"
            />
          </div>
        </div>
      </div>

      {/* Caption */}
      <div className="max-container">
        <div className="flex p-2 justify-start">
          <div className="box-content rounded-md">
            <div className=" text-2xl text-lime-900 font-semibold mb-6">
              Wakaf Sarana dan Prasarana
            </div>
            <div className=" text-sm text-gray-500 mb-1">Donasi Terkumpul</div>
            <div className="flex gap-2">
              <div className=" text-xl text-lime-500 font-semibold mb-2">
                Rp 18.735.000
              </div>
              <span className="text-md text-gray-500"> dari target</span>
              <div className=" text-lg text-lime-700 font-semibold mb-2">
                Rp 20.500.000
              </div>
            </div>
            <div className="bg-white rounded-xl overflow-hidden py-1">
              <div className="relative h-6 flex items-center justify-center">
                <div className="absolute top-0 bottom-0 left-0 rounded-lg w-[98%] bg-blue-200"></div>
                <div className="relative text-blue-900 font-medium text-sm">
                  98%
                </div>
              </div>
            </div>
            {/* Description */}
            <div className="py-3">
              <div
                className=" teg"
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(descriptionContent),
                }}
              />
              {linkContent?.hashtag}
            </div>
            <button
              className="w-full inline-block px-12 py-3 my-2 text-sm text-center font-medium text-white bg-green-600 border border-green-600 rounded active:text-green-500 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring"
              data-hs-overlay="#hs-overlay-bottom-program-donasi"
              onClick={() => handleLinkContent(linkContent!!)}
            >
              Donasi
            </button>
          </div>
        </div>
      </div>

      <ModalDonasi
        linkContent={linkContent}
        handleLinkContent={handleLinkContent}
      />
    </div>
  );
};

export default IsraMiraj;
