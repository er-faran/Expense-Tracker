"use client";
import React, { useState } from "react";
import Image from "next/image";
import logo from "../../images/logo.png";

const LeftNavigation = ({ value, setValue, loggedInUserDetails }) => {
  const handleChange = (newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", String(newValue));
  };

  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono">
        <Image alt="Expense Tracker" src={logo} width={65} height={65} />
        <h1 className="text-white text-2xl  mb-5">Your Expense Tracker</h1>
      </div>
      <div className="text-secondary-light text-xl">
        {loggedInUserDetails?.result?.name}
      </div>
      <div className="text-primary-text">
        {loggedInUserDetails?.result?.email}
      </div>
      <nav
        id="side-navbar"
        className="mt-10 flex flex-row md:flex-col justify-center items-start"
      >
        <button
          className={`w-full text-start p-2 text-lg border-0 border-primary-light  ${
            value === 1 ? "md:border-r-2 text-primary-light" : ""
          }`}
          disabled={value === 1 || !loggedInUserDetails?.result?._id}
          onClick={() => handleChange(1)}
        >
          Expenses
        </button>
        <button
          className={`w-full text-start p-2 text-lg border-0 border-primary-light  ${
            value === 2 ? "md:border-r-2 text-primary-light" : ""
          }`}
          disabled={value === 2 || !loggedInUserDetails?.result?._id}
          onClick={() => handleChange(2)}
        >
          Reports
        </button>
        <button
          className={`w-full text-start p-2 text-lg border-0 border-primary-light  ${
            value === 5 ? "md:border-r-2 text-primary-light" : ""
          }`}
          disabled={value === 5}
          onClick={() => handleChange(5)}
        >
          {loggedInUserDetails?.result?._id ? "Logout" : "Login"}
        </button>
      </nav>
    </>
  );
};

export default LeftNavigation;
