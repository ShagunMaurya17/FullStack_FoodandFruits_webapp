import React from "react";
import { DBLeftSection, DBRightSection } from "../components";

const DashBoard = () => {
  return (
    <div className="w-screen h-screen flex items-center bg-primary ">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default DashBoard;
