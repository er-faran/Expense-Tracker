"use client";
import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";
import Image from "next/image";
import logo from "../../images/logo.png";

const LeftNavigation = ({ value, setValue, loggedInUserDetails }) => {
  const handleChange = (event, newValue) => {
    setValue(newValue);
    localStorage.setItem("selectedTab", String(newValue));
  };

  function a11yProps(index) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  return (
    <>
      <div className="flex flex-wrap items-center justify-center gap-3 font-mono">
        <Image src={logo} width={65} height={65} />
        <h1 className="text-white text-2xl  mb-5">Your Expense Tracker</h1>
      </div>
      <div className="text-secondary-light text-xl">
        {loggedInUserDetails?.result?.name}
      </div>
      <div className="text-primary-text">
        {loggedInUserDetails?.result?.email}
      </div>
      <nav id="side-navbar" className="mt-10">
        <Tabs
          id="side-navigation-tabs"
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{ borderRight: 1, borderColor: "divider" }}
          className="side-nav-tabs-continer"
        >
          <Tab
            disabled={!loggedInUserDetails?.result?._id}
            label="Expenses"
            className="side-nav-tab"
            value={1}
            {...a11yProps(1)}
          />
          <Tab
            disabled={!loggedInUserDetails?.result?._id}
            label="Reports"
            className="side-nav-tab"
            value={2}
            {...a11yProps(2)}
          />
          <Tab
            // disabled={!loggedInUserDetails?.result?._id}
            label={loggedInUserDetails?.result?._id ? "Logout" : "Login"}
            className="side-nav-tab"
            value={5}
            {...a11yProps(5)}
          />
        </Tabs>
      </nav>
    </>
  );
};

export default LeftNavigation;
