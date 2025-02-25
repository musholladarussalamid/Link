import { dataLink } from "@/app/types/dataLink";
import Image from "next/image";
import Link from "next/link";
import React, { MouseEventHandler } from "react";

type link = {
  label: string;
  url: string;
  img: string;
};

const dataShareLink: link[] = [
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

type ModalShareProps = {
  linkContent: dataLink | undefined;
  handleLinkContent: (link: dataLink) => void;
};

const ModalShare = (props: ModalShareProps) => {
  const { linkContent, handleLinkContent } = props;

  const unsecuredCopyToClipboard = (text:string) => {
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
      id="hs-overlay-bottom"
      className="hs-overlay max-container hs-overlay-open:translate-y-0 translate-y-full fixed bottom-0 inset-x-0 transition-all duration-300 transform max-h-[45vh] h-full w-full z-[60] bg-white border-b hidden rounded-xl rounded-t-10 rounded-b-none"
      tabIndex={-1}
    >
      <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-200">
        <h3 className="font-bold text-gray-700">Share this link</h3>
        <button
          type="button"
          className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-non dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
          data-hs-overlay="#hs-overlay-bottom"
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
        {dataShareLink.map((item: link, index: number) => {
          let shareLink: string = "";
          if (item.label == "WhatsApp") {
            shareLink =
              "https://wa.me/?text=" +
              linkContent?.lable +
              " - " +
              linkContent?.url;
          }
          if (item.label == "Facebook") {
            shareLink =
              "https://www.facebook.com/sharer.php?u=" + linkContent?.url;
          }
          if (item.label == "Email") {
            shareLink =
              "mailto:?subject=Info DKM Musholla Darussalam! &body= " +
              linkContent?.lable +
              " - " +
              linkContent?.url;
          }

          return (
            <Link key={index} href={shareLink}>
              <div className="flex justify-between py-2">
                <div className="flex justify-start align-center gap-3">
                  <Image
                    className="rounded-sm"
                    src={item.img}
                    alt="wa logo"
                    height={24}
                    width={24}
                  />
                  <p className=" text-base">Shere via {item.label}</p>
                </div>
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
                    d="M8.25 4.5l7.5 7.5-7.5 7.5"
                  />
                </svg>
              </div>
            </Link>
          );
        })}

        <div className="flex relative mt-2">
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
                d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
              />
            </svg>
          </div>
          <input
          readOnly
            type="search"
            id="search"
            className="block read-only:bg-gray-100 w-full p-4 ps-10 text-sm text-gray-700 border border-gray-300 rounded-lg bg-gray-50 focus:ring-transparent focus:border-transparent dark:bg-transparent dark:border-transparent dark:placeholder-gray-400 dark:focus:ring-transparent dark:focus:border-transparent"
            placeholder="link"
            defaultValue={linkContent?.url}
            required
          />
          <button
            onClick={()=>copylink(linkContent?.url ? linkContent.url : "#")}
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

export default ModalShare;
