import React, { useEffect } from "react";
import { apiGetChartHome } from "../../apis";

const ZingChart = () => {
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiGetChartHome();
        console.log(response.data);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };

    fetchChartData();
  }, []);
  return (
    <>
      <div className="w-full h-[70px]"></div>
      <div>ZingChart</div>
    </>
  );
};

export default ZingChart;
