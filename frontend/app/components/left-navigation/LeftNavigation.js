"use client";
import React, { useState } from "react";
import { Tab, Tabs } from "@mui/material";

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
    <div>
      <h1 className="text-white text-4xl mb-5">Expense Tracker</h1>
      <div className="text-secondary-light text-xl">
        {loggedInUserDetails?.result?.name}
      </div>
      <div className="text-primary-text">
        {loggedInUserDetails?.result?.email}
      </div>
      <div>
        <nav className="mt-10">
          <Tabs
            id="side-navigation-tabs"
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{ borderRight: 1, borderColor: "divider" }}
          >
            {/* <Tab
              disabled={!loggedInUserDetails?.result?._id}
              label="Dashboard"
              {...a11yProps(0)}
              className="side-nav-tab"
            /> */}
            <Tab
              disabled={!loggedInUserDetails?.result?._id}
              label="Expenses"
              {...a11yProps(1)}
              className="side-nav-tab"
              value={1}
            />
            <Tab
              disabled={!loggedInUserDetails?.result?._id}
              label="Reports"
              {...a11yProps(2)}
              className="side-nav-tab"
              value={2}
            />
            {/* <Tab
              disabled={!loggedInUserDetails?.result?._id}
              label="Configuraion"
              {...a11yProps(3)}
              className="side-nav-tab"
            /> */}
            {/* <Tab
              disabled={!loggedInUserDetails?.result?._id}
              label="Setting"
              {...a11yProps(4)}
              className="side-nav-tab"
            /> */}
            <Tab
              // disabled={!loggedInUserDetails?.result?._id}
              label={loggedInUserDetails?.result?._id ? "Logout" : "Login"}
              {...a11yProps(5)}
              className="side-nav-tab"
              value={5}
            />
          </Tabs>
        </nav>
      </div>
    </div>
  );
};

export default LeftNavigation;
