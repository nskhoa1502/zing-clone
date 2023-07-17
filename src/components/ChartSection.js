import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { useSelector } from "react-redux";
import _ from "lodash";
import { SongItem } from "./";
import { Link } from "react-router-dom";
import path from "../utils/path";
import icons from "../utils/icons";

const { BsFillPlayFill } = icons;

const ChartSection = () => {
  const [data, setData] = useState(null);
  const { chart, rank } = useSelector((state) => state.app);
  const [tooltipState, setTooltipState] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [selected, setSelected] = useState(null);
  const chartRef = useRef();

  // console.log(chart);
  // console.log(rank);

  const options = {
    responsive: true,
    pointRadius: 0,
    aspectRatio: 4,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: {
          color: "rgba(255,255,255,0.3)",
          drawTicks: false,
        },
        min: chart?.minScore,
        max: chart?.maxScore,
        border: { dash: [2, 4] },
        // display: false,
      },
      x: {
        ticks: { color: "white" },
        grid: { color: "transparent", drawTicks: false },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: ({ tooltip }) => {
          if (!chartRef || !chartRef.current) return;
          if (tooltip.opacity === 0) {
            //Hide tooltip when hover out
            if (tooltipState.opacity !== 0)
              setTooltipState((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const counters = [];
          for (let i = 0; i < 3; i++) {
            counters.push({
              data: chart?.items[Object.keys(chart?.items)[i]]
                ?.filter((item) => +item.hour % 2 !== 0)
                ?.map((item) => item.counter),
              encodeId: Object.keys(chart?.items)[i],
            });
          }
          // console.log("counter", counters);
          console.log(+tooltip.body[0]?.lines[0]?.replace(",", ""));
          const result = counters.find((i) =>
            i.data.some(
              (n) => n === +tooltip.body[0]?.lines[0]?.replace(",", "")
            )
          );
          console.log("result", result);
          setSelected(result.encodeId);

          const newTooltipData = {
            opacity: 1,
            left: tooltip.caretX,
            top: tooltip.caretY,
          };
          if (!_.isEqual(tooltipState, newTooltipData))
            setTooltipState(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  useEffect(() => {
    const labels = chart?.times
      ?.filter((item) => +item.hour % 2 !== 0)
      ?.map((item) => `${item?.hour}:00`);

    const datasets = [];
    if (chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chart?.items[Object.keys(chart?.items)[i]]
            ?.filter((item) => +item.hour % 2 !== 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.2,
          borderWidth: 3,
          pointBackgroundColor: "white",
          pointHoverRadius: 4,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 3,
          animation: false,
        });
      }
    }

    // console.log({ labels, datasets });
    console.log(rank);

    setData({ labels, datasets });
  }, [chart]);

  // console.log(tooltipState);
  console.log(selected);
  return (
    <div className="h-[450px] flex flex-col gap-4 mx-[59px] mt-12 p-5 rounded-md bg-gradient-to-t from-[#69467D] to-[#780E93]">
      <div className="flex gap-2 items-center">
        <Link to={path.ZING_CHART} className="text-2xl font-bold chart-title  ">
          #zingchart
        </Link>
        <span className="text-main-500 p-1 rounded-full bg-white">
          <BsFillPlayFill size={16} />
        </span>
      </div>

      <div className="flex gap-4 h-[300px]">
        <div className="flex-4  flex flex-col gap-4">
          {rank?.length > 0 &&
            rank
              ?.filter((item, index) => index < 3)
              ?.map((item, index) => (
                <SongItem
                  key={index}
                  thumbnail={item?.thumbnail}
                  title={item?.title}
                  artists={item?.artistsNames}
                  sid={item?.encodeId}
                  order={index + 1}
                  percent={Math.round((item?.score * 100) / chart?.totalScore)}
                  style="text-white bg-[hsla(0,0%,100%,.07)] hover:bg-[#945ea7]"
                />
              ))}
          <Link
            to={path.ZING_CHART}
            className="text-white px-4 py-2 rounded-l-full rounded-r-full border border-white w-fit m-auto"
          >
            Xem thêm
          </Link>
        </div>
        <div className="flex-6 relative ">
          {data && <Line ref={chartRef} data={data} options={options} />}
          <div
            className="tooltip "
            style={{
              top: tooltipState.top,
              left: tooltipState.left,
              opacity: tooltipState.opacity,
              position: "absolute",
            }}
          >
            <SongItem
              thumbnail={rank?.find((i) => i?.encodeId === selected)?.thumbnail}
              title={rank?.find((i) => i?.encodeId === selected)?.title}
              artists={
                rank?.find((i) => i?.encodeId === selected)?.artistsNames
              }
              sid={rank?.find((i) => i?.encodeId === selected)?.encodeId}
              style={"bg-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartSection;
