import { Bars3Icon } from "@heroicons/react/16/solid";
import React from "react";

const header = () => {
  return (
    <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">
      <div className="flex-1">
        <label
          htmlFor="left-sidebar-drawer"
          className="btn btn-primary drawer-button lg:hidden"
        >
          <Bars3Icon className="h-5 inline-block w-5" />
        </label>
      </div>
      <div className="flex-none">
        <h1 className="text-2xl font-semibold ml-2">Welcome to Portal!</h1>
      </div>
    </div>
  );
};

export default header;
