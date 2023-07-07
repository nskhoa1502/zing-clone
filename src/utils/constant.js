import icons from "./icons";

const { MdOutlineLibraryMusic, BiDisc, GrLineChart, MdOutlineFeed } = icons;

export const sidebarMenu = [
  {
    path: "mymusic",
    text: "Cá nhân",
    icons: <BiDisc size={24} />,
  },
  {
    path: "",
    text: "Khám phá",
    icons: <MdOutlineLibraryMusic size={24} />,
    end: true,
  },
  {
    path: "zing-chart",
    text: "#zingchart",
    icons: <GrLineChart size={24} />,
  },
  {
    path: "follow",
    text: "Theo dõi",
    icons: <MdOutlineFeed size={24} />,
  },
];
