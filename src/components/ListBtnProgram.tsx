import { dataLink } from "@/app/types/dataLink";
import Link from "next/link";
import React, { useEffect, useState } from "react";

type LinkBtn = {
  lable: string;
  url: string;
};

type listBtnProgramProps = {
  linkContent: dataLink | undefined;
  handleLinkContent: (link: dataLink) => void;
};

const ListBtnProgram = (props: listBtnProgramProps) => {
  const { linkContent, handleLinkContent } = props;
  const [dataLinkBtn, setDataLinkBtn] = useState<Array<LinkBtn>>();
  const [shimmerLoad, setShimmerLoad] = useState<boolean>(true);
  const [selected, setSelected] = useState<dataLink>();
  const env = process.env.NODE_ENV === "production";

  useEffect(() => {
    const link = env ? "/Link" : "";
    const urlDataLink = link + "/data_link.json";

    fetch(urlDataLink)
      .then((response) => response.json())
      .then((json) => {
        if (json.dataLinkProgram) {
          setDataLinkBtn(json.dataLinkProgram);
          setShimmerLoad(!shimmerLoad);
        }
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env]);

  return (
    <div className="flexCenter pb-16">
      <div className="padding-container max-container flex w-full flex-col justify-center gap-1">
        <div className="flex-1 text-white font-bold flex mb-2 justify-center items-center align-middle text-xl text-center">
          @masjidpesonadarussalam
        </div>
        <div className="flex-1 text-white font-bold flex mb-2 justify-center items-center align-middle text-xl text-center">
          Link Program DKM :
        </div>

        {shimmerLoad && (
          <div className="animate-pulse flex flex-col ">
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
            <div className="rounded-full bg-gray-100 opacity-50 h-12 w-full py-3 my-2"></div>
          </div>
        )}

        {dataLinkBtn &&
          dataLinkBtn.map((item: LinkBtn, index: number) => (
            <div
              key={index}
              className={
                selected?.lable == item.lable
                  ? "w-full flex justify-between px-4 bg-white font-normal text-lg text-green-500 overflow-hidden rounded-full hover:rounded-full ring-1 ring-white py-3 my-2"
                  : "w-full flex justify-between px-4 bg-transparent font-normal text-lg text-white overflow-hidden rounded-full hover:rounded-full ring-1 ring-white py-3 my-2"
              }
            >
              <div
                className="flex flex-1 w-full h-full"
                onClick={() => setSelected(item)}
              >
                <Link
                  className="flex-1 mr-1 text-sm xs:text-base"
                  href={
                    env
                      ? "https://musholladarussalamid.github.io/Link/" +
                        item.url
                      : item.url
                  }
                  passHref
                  target="_blank"
                >
                  {item.lable}
                </Link>
              </div>
              <button
                type="button"
                className=" rounded-full ring-1 p-1 ring-white bg-white bg-opacity-20 ring-opacity-20 flex justify-center items-center center"
                data-hs-overlay="#hs-overlay-bottom"
                onClick={() => handleLinkContent(item)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
                  />
                </svg>
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ListBtnProgram;
