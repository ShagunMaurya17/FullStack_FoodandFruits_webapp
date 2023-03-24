import React from "react";
import { Route, Routes } from "react-router-dom";
import {
  DBHeader,
  DBHome,
  DBItems,
  DBNewItem,
  DBUsers,
  DBOrders,
} from "../components";

const DBRightSection = () => {
  return (
    <div className=" flex flex-col py-12 px-12 flex-1 h-full">
      <DBHeader />
      <div className=" flex flex-col flex-1 overscroll-y-scroll scrollbar-none">
        <Routes>
          <Route exact path="/home" element={<DBHome />} />
          <Route exact path="/orders" element={<DBOrders />} />
          <Route exact path="/items" element={<DBItems />} />
          <Route exact path="/newItem" element={<DBNewItem />} />
          <Route exact path="/users" element={<DBUsers />} />
        </Routes>
      </div>
    </div>
  );
};

export default DBRightSection;
