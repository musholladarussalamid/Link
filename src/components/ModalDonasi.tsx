import { dataLink } from "@/app/types/dataLink";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

type link = {
  label: string;
  url: string;
  img: string;
};

const dataLink: link[] = [
  {
    label: "WhatsApp",
    url: "wa",
    img: "./wa_logo.svg",
  },
  {
    label: "Facebook",
    url: "fb",
    img: "./fb_logo.svg",
  },
  {
    label: "Email",
    url: "email",
    img: "./email_logo.svg",
  },
];

type ModalDonasiProps = {
  linkContent: dataLink | undefined;
  handleLinkContent: (link: dataLink) => void;
};

const ModalDonasi = (props: ModalDonasiProps) => {
  const { linkContent, handleLinkContent } = props;

  const unsecuredCopyToClipboard = (text: string) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      console.error("Unable to copy to clipboard", err);
    }
    document.body.removeChild(textArea);
  };

  /**
   * Copies the text passed as param to the system clipboard
   * Check if using HTTPS and navigator.clipboard is available
   * Then uses standard clipboard API, otherwise uses fallback
   */
  const copylink = (content: string) => {
    if (window.isSecureContext && navigator.clipboard) {
      navigator.clipboard.writeText(content);
    } else {
      unsecuredCopyToClipboard(content);
    }
  };

  return (
    <div
      id="hs-overlay-bottom-program-donasi"
      className="hs-overlay max-container hs-overlay-open:translate-y-0 translate-y-full fixed bottom-0 inset-x-0 transition-all duration-300 transform max-h-[45vh] h-full w-full z-[60] bg-white border-b hidden rounded-xl rounded-t-10 rounded-b-none"
      tabIndex={-1}
    >
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
        <h3 className="font-bold text-gray-700">Donasi Sekarang</h3>
        <button
          type="button"
          className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-non dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-overlay-bottom-program-donasi"
        >
          <span className="sr-only">Close modal</span>
          <svg
            className="flex-shrink-0 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        <div>
          Transfer Donasi ke Bank Mandiri, No. Rekening 102.000.5964.165 A.n
          Putu M Mahardika dengan kode transaksi 84 di belakang nominal
          transfer. Konfirmasi donasi anda hubungi +62 xxx-xxxx-xxxx
        </div>
        <div className="flex relative mt-2">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
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
            defaultValue={linkContent?.url}
            required
          />
          <button
            onClick={() => copylink(linkContent?.url ? linkContent.url : "#")}
            type="submit"
            className="text-gray-500 absolute end-2.5 bottom-2.5 bg-blue-100 hover:bg-blue-100 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-100 dark:hover:bg-blue-100 dark:focus:ring-blue-100"
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDonasi;
