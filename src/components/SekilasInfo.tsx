import React from 'react'

const SekilasInfo = () => {
  return (
    <div className="flexCenter max-container flex w-full bg-green-700 p-1 ">
      <div className=" text-white m-1">Sekilas Info : </div>
      <div className=" text-white overflow-x-hidden flex-1 w-full">
        <div className="animate-marquee whitespace-nowrap w-full">
          <span className="mx-2">
            {" | "}
            Selamat Datang Di Website Resmi Masjid Pesona Darussalam. Memberdayakan
            Umat Dan Menyuarakan Moderasi Islam.
          </span>
        </div>
      </div>
      <div className="ml-2 mr-1 ">
        <iframe
          src="https://free.timeanddate.com/clock/i95041og/n108/tlid38/fs18/fcfff/tct/pct/th1"
          width="72"
          height="23"
        ></iframe>
      </div>
    </div>
  );
}

export default SekilasInfo