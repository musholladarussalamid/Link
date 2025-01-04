"use client";

import SekilasInfo from "@/components/SekilasInfo";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ModalDonasi from "@/components/ModalDonasi";
import { dataLink } from "@/app/types/dataLink";
import { dataDetailProgram } from "@/app/types/dataDetailProgram";

const Krdopm = () => {
  const [linkContent, setLinkContent] = useState<
    dataDetailProgram | undefined
  >();
  const env = process.env.NODE_ENV === "production";
  const base_url = env ? "/Link" : "";
  const [shimmerLoad, setShimmerLoad] = useState<boolean>(true);
  const [descriptionContent, setDescriptionContent] = useState("");
  const [prosentase, setProsentase] = useState(0);

  const namaBank = linkContent?.rekening.bank;
  const atasNama = linkContent?.rekening.atas_nama;
  const rekening = linkContent?.rekening.rekening;
  const kode_unik = linkContent?.rekening.kode_unik;
  const denganKode = `dengan kode transaksi ${linkContent?.rekening.kode_unik} di belakang nominal transfer`;

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
          setLinkContent(detailProgramSarpras);
          setShimmerLoad(!shimmerLoad);
        }
      });
  }, []);

  useEffect(() => {
    if (linkContent?.description && linkContent?.description != undefined) {
      setDescriptionContent(linkContent?.description);
    }

    if (
      linkContent?.donation_achievement &&
      linkContent?.donation_achievement != undefined
    ) {
      setProsentase(
        (parseFloat(linkContent?.donation_achievement) /
          parseFloat(linkContent.donation_target)) *
          100
      );
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
        <div className="flex p-4 justify-start">
          <div className="box-content rounded-md">
            <div className=" text-2xl text-lime-900 font-semibold mb-6">
              {linkContent?.caption}
            </div>
            <div className=" text-sm text-gray-500 mb-1">Donasi Terkumpul</div>

            {/* Capaian Info */}
            <div className="flex gap-2">
              <div className=" text-xl text-lime-500 font-semibold mb-2">
                Rp {linkContent?.donation_achievement}
              </div>
              {linkContent?.donation_target != "" ? (
                <>
                  <span className="text-md text-gray-500"> dari target</span>
                  <div className=" text-lg text-lime-700 font-semibold mb-2">
                    Rp {linkContent?.donation_target}
                  </div>
                </>
              ) : (
                ""
              )}
            </div>

            {/* Prosentase */}
            {linkContent?.donation_target != "" ? (
              <div className="bg-white rounded-xl overflow-hidden py-1">
                <div className="relative h-6 flex items-center justify-center">
                  <div
                    className={
                      prosentase
                        ? `absolute top-0 bottom-0 left-0 rounded-lg bg-blue-200 w-[${prosentase}%]`
                        : `absolute top-0 bottom-0 left-0 rounded-lg bg-blue-200`
                    }
                  ></div>
                  <div className="relative text-blue-900 font-medium text-sm">
                    {prosentase}%
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}

            {/* Description */}
            <div className="py-3">
              <div
                className=" teg"
                dangerouslySetInnerHTML={{
                  __html: decodeURIComponent(descriptionContent),
                }}
              />
              <div className="mt-1 py-1">{linkContent?.hashtag}</div>
            </div>
            {/* <button
              className="w-full inline-block px-12 py-3 my-2 text-sm text-center font-medium text-white bg-green-600 border border-green-600 rounded active:text-green-500 hover:bg-transparent hover:text-green-600 focus:outline-none focus:ring"
              data-hs-overlay="#hs-overlay-bottom-program-donasi"
              onClick={() => handleLinkContent(linkContent!!)}
            >
              Donasi
            </button> */}
            <div className="">
              <div className="mb-4">
                Transfer Donasi ke Bank {namaBank}, No. Rekening{" "}
                <span className=" font-semibold">{rekening}</span> A.n{" "}
                <span className=" font-semibold">{atasNama}</span>{" "}
                {kode_unik ? denganKode : ""}.
              </div>
              <div className="flex relative mt-2 mb-4">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z"
                    />
                  </svg>
                </div>
                <input
                  readOnly
                  type="search"
                  id="search"
                  className="block read-only:bg-gray-100 w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-gray-400 dark:focus:ring-transparent dark:focus:border-transparent"
                  placeholder="Nomor Rekening"
                  defaultValue={rekening}
                  required
                />
                <button
                  onClick={() => copylink(rekening ? rekening : "-")}
                  type="submit"
                  className="text-gray-500 absolute end-2.5 bottom-2.5 bg-blue-100 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-100 dark:hover:bg-blue-100 dark:focus:ring-blue-100"
                >
                  Copy
                </button>
              </div>
              <div className="">
                *Konfirmasi donasi anda hubungi{" "}
                {linkContent?.konfirmasi_donasi.no_hp}{" "}
                {/* atau isi form konfirmasi{" "} */}
                {/* <Link
            className=" text-blue-500 font-semibold"
            href="https://forms.gle/78gZk7rqxYgpCfmq6"
          >
            di sini
          </Link>{" "} */}
              </div>
              <div></div>
            </div>
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

export default Krdopm;
