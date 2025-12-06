"use client";

import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import SekilasInfo from "@/components/SekilasInfo";
import React, { useEffect, useState } from "react";

type MediaSosial = {
  ID_Medsos: string;
  Nama_Platform: string;
  Username: string;
  URL_Profil: string;
  Email_Terkait: string;
  Tujuan_Akun: string;
  Penanggung_Jawab: string;
  Tanggal_Dibuat: string;
};

const MediaSosial = () => {
  const [dataMedsos, setDataMedsos] = useState<MediaSosial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  // Fallback data untuk testing
  const fallbackData: MediaSosial[] = [
    {
      ID_Medsos: "MS-001",
      Nama_Platform: "Instagram",
      Username: "@masjidpesonadarussalam",
      URL_Profil: "https://www.instagram.com/masjidpesonadarussalam",
      Email_Terkait: "musholladarussalamid@gmail.com",
      Tujuan_Akun: "",
      Penanggung_Jawab: "",
      Tanggal_Dibuat: "",
    },
    {
      ID_Medsos: "MS-002",
      Nama_Platform: "Youtube",
      Username: "@musholladarussalam1774",
      URL_Profil: "https://www.youtube.com/@musholladarussalam1774",
      Email_Terkait: "musholladarussalamid@gmail.com",
      Tujuan_Akun: "",
      Penanggung_Jawab: "",
      Tanggal_Dibuat: "",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbxdBYW4rx6caaDKHYJQv62ZhPOzlDWDtT1wFUZB223Tl7IG4QR0_Of_K98KiGZqfpve/exec",
          {
            method: "GET",
            cache: "no-cache",
            redirect: "follow",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data received:", data);
        console.log("Is array?", Array.isArray(data));
        console.log("Data length:", data?.length);

        if (Array.isArray(data) && data.length > 0) {
          setDataMedsos(data);
          setLoading(false);
        } else {
          console.error("Data is not a valid array:", data);
          throw new Error("Format data tidak valid atau kosong");
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // Gunakan fallback data jika fetch gagal
        setDataMedsos(fallbackData);
        setError("");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getPlatformIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();

    switch (platformLower) {
      case "instagram":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
          </svg>
        );
      case "youtube":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
          </svg>
        );
      case "facebook":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        );
      case "tiktok":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
          </svg>
        );
      case "twitter":
      case "x":
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        );
      default:
        return (
          <svg
            className="w-8 h-8 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
          </svg>
        );
    }
  };

  const getPlatformColor = (platform: string) => {
    const platformLower = platform.toLowerCase();
    switch (platformLower) {
      case "instagram":
        return "from-pink-500 to-purple-600";
      case "youtube":
        return "from-red-500 to-red-700";
      case "facebook":
        return "from-blue-500 to-blue-700";
      case "tiktok":
        return "from-gray-800 to-black";
      case "twitter":
        return "from-blue-400 to-blue-600";
      default:
        return "from-gray-500 to-gray-700";
    }
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
    <div className="h-screen bg-gradient-to-b from-green-500 to-green-900">
      <SekilasInfo />
      <div className="h-full overflow-scroll">
        <Hero />

        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Media Sosial Kami
            </h1>
            <p className="text-white/80">
              Ikuti dan hubungi kami melalui platform media sosial
            </p>
          </div>

          {loading && (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-white"></div>
            </div>
          )}

          {error && (
            <div className="bg-yellow-500/20 border border-yellow-500 text-white px-4 py-3 rounded-lg text-center mb-4">
              <p className="mb-2">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="bg-white text-yellow-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Coba Lagi
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="grid grid-cols-1 gap-3 pb-8 max-w-2xl mx-auto">
              {dataMedsos.map((medsos) => (
                <div
                  key={medsos.ID_Medsos}
                  className="bg-white/10 backdrop-blur-sm rounded-full overflow-hidden hover:bg-white/20 transition-all duration-300 ring-1 ring-white"
                >
                  <div className="flex items-center px-4 py-3">
                    <div className="flex-shrink-0 mr-4">
                      <div
                        className={`bg-gradient-to-r ${getPlatformColor(
                          medsos.Nama_Platform
                        )} rounded-full p-2`}
                      >
                        <div className="w-8 h-8 flex items-center justify-center">
                          {getPlatformIcon(medsos.Nama_Platform)}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base font-bold text-white truncate">
                        {medsos.Nama_Platform}
                      </h3>
                      <p className="text-sm text-white/80 truncate">
                        {medsos.Username}
                      </p>
                    </div>
                    <a
                      href={medsos.URL_Profil}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 ml-4 bg-white/20 hover:bg-white/30 rounded-full p-2 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className="w-5 h-5 text-white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default MediaSosial;
