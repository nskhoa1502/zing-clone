import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { apiGetArtist } from "../../apis";
import icons from "../../utils/icons";
import { Artist, ListSong, Section } from "../../components";
import DOMPurify from "dompurify";

const { AiOutlineUserAdd, BsFillPlayFill } = icons;

const Singer = () => {
  const { singer } = useParams();
  const [artistData, setArtistData] = useState(null);
  const [isHoverPlay, setIsHoverPlay] = useState(false);
  const [readMore, setReadMore] = useState(false);
  const ref = useRef();

  // console.log(singer);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const res = await apiGetArtist(singer);
        if (res.data.err === 0) {
          setArtistData(res?.data?.data);
        }
        console.log(res?.data?.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };

    singer && fetchArtistData(singer);
  }, [singer]);

  useEffect(() => {
    ref.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });
  }, [singer]);

  return (
    <div className="flex flex-col w-full ">
      <div ref={ref} className="w-full h-full relative ">
        <div className="artist-cover-top"></div>
        <img
          src={artistData?.cover}
          alt="cover"
          className="w-full object-cover h-[400px]"
        />
        <div className="artist-cover-bottom"></div>
        <div className="text-white absolute  left-0 right-0 bottom-[50px] px-[60px]">
          <div className="flex gap-8 items-center">
            <h1 className="text-[60px] font-bold ">{artistData?.name}</h1>
            <span
              onMouseLeave={() => setIsHoverPlay(false)}
              onMouseEnter={() => setIsHoverPlay(true)}
              className="relative p-2 rounded-full bg-white mt-3 text-main-500 hover:bg-white hover:text-gray-100 cursor-pointer "
            >
              <div className="w-8 h-8 "></div>
              {isHoverPlay && (
                <span className="absolute top-0 right-0 left-0 bottom-0 bg-main-500 rounded-full animate-scale-up-center-full "></span>
              )}{" "}
              <span className="absolute p-2 left-0 right-0 top-0 bottom-0">
                {" "}
                <BsFillPlayFill size={32} />
              </span>
            </span>
          </div>
          <div className="flex gap-3 items-center mt-4">
            <span className="text-sm text-gray-100">{`${Number(
              artistData?.totalFollow.toFixed(1)
            ).toLocaleString()} người quan tâm`}</span>
            <button
              type="button"
              className="px-4 py-1 rounded-l-full rounded-r-full text-sm flex items-center justify-center gap-1 bg-main-500 text-white"
            >
              <span>
                <AiOutlineUserAdd />
              </span>
              <span className="text-sm opacity-90">QUAN TÂM</span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[30px] px-[60px] w-full flex flex-col">
        {/* <div className="w-[30%] flex-auto border border-red-500 p-4 pr-7 bg-gray-300 rounded-md">
          <img
            src={artistData?.topAlbum?.thumbnail}
            alt="thumbnail"
            className="w-[151px] h-[151px] object-cover rounded-md"
          />
        </div>
        <div className="w-[70%] flex-auto  border border-red-500">Song</div> */}
        <h3 className="text-lg font-bold px-3">
          {
            artistData?.sections?.filter(
              (section) => section?.sectionId === "aSongs"
            )[0]?.title
          }
        </h3>
        <div className="flex justify-between flex-wrap w-full mt-3">
          {artistData?.sections
            ?.filter((section) => section?.sectionId === "aSongs")[0]
            ?.items?.map((item, index) => (
              <div
                className={` ${index % 2 === 0 ? "pr-2" : "pl-2"} w-[50%] `}
                key={index}
              >
                <ListSong songData={item} isHideAlbum isHideNode />
              </div>
              // <div>hello</div>
            ))}
        </div>
      </div>

      {artistData?.sections
        ?.filter(
          (section) =>
            section?.sectionId !== "aSongs" &&
            section?.sectionId !== "aReArtist"
        )
        .map((section, index) => (
          <Section editorTheme={section} key={index} />
        ))}

      <div className="flex flex-col w-full mt-[30px] px-[60px]">
        <h3 className="text-lg font-bold mb-5 ">NGHỆ SĨ/OA</h3>
        <div className="flex items-start  gap-[20px]">
          {artistData?.sections
            ?.filter((section) => section?.sectionId === "aReArtist")[0]
            ?.items.map((item) => (
              <Artist
                key={item?.id}
                title={item?.name}
                image={item?.thumbnailM}
                follower={item?.totalFollow}
                link={item?.link}
              />
            ))}
        </div>
        <div className="flex-1"></div>
      </div>
      <div className="mt-[30px] px-[60px]">
        <h3 className="px-[120px] text-lg font-bold mb-5">{`Về ${artistData?.name}`}</h3>
        <div className="flex gap-8">
          <img
            src={artistData?.thumbnailM}
            alt="thumbnail"
            className="w-[45%] flex-none h-[275px] object-contain rounded-md"
          />
          <div className="flex flex-col gap-8 text-xs">
            <p
              className="text-[14px] leading-[1.2rem]"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(artistData?.biography),
              }}
            ></p>
            <div>
              <div className="flex flex-col gap-2">
                <span className="text-[20px] font-bold">
                  {Number(artistData?.follow.toFixed(1)).toLocaleString()}
                </span>
                <span>Người quan tâm</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-[500px]"></div>
    </div>
  );
};

export default Singer;
