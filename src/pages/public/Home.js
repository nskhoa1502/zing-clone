import React, { useEffect } from "react";
import { Header } from "../../components";
import * as apis from "../../apis";

const Home = () => {
  useEffect(() => {
    const fetchDataHome = async () => {
      try {
        const response = await apis.getHome();
        console.log(response.data.data);
      } catch (error) {
        console.error(error.response.data);
      }
    };

    fetchDataHome();
  }, []);
  return (
    <div className="overflow-y-auto ">
      <div className="h-[70px] px-[59px] flex items-center">
        <Header />
      </div>
    </div>
  );
};

export default Home;
