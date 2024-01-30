"use client";
import React, { useEffect, useState } from "react";
import MainContent from "./MainContent";
import MainContentReports from "./MainContentReports";
import MoneyDistribution from "../money-distribution/MoneyDistribution";
import MainContentAuth from "./MainContentAuth";

const RightMainSection = ({
  selectedTabId = "0",
  loggedInUserDetails,
  setSelectedTabId,
}) => {
  const [selectedTab, setSelectedTab] = useState(selectedTabId);
  const [showNewTransactionForm, setShowNewTransactionForm] = useState(null);

  useEffect(() => {
    setSelectedTab(localStorage?.getItem("selectedTab"));
  }, [selectedTabId]);

  console.log(selectedTab, selectedTab === "1");

  return (
    <div className="flex flex-wrap bg-primary-light rounded-2xl min-h-full">
      <div className="flex-auto w-72 p-10">
        {selectedTab == "1" && (
          <MainContent
            showNewTransactionForm={showNewTransactionForm}
            setShowNewTransactionForm={setShowNewTransactionForm}
            setSelectedTabId={setSelectedTabId}
          />
        )}
        {selectedTab == "2" && (
          <MainContentReports setSelectedTabId={setSelectedTabId} />
        )}
        {selectedTab == "5" && (
          <MainContentAuth
            loggedInUserDetails={loggedInUserDetails}
            setSelectedTabId={setSelectedTabId}
          />
        )}
      </div>
      {selectedTab !== "0" && selectedTab !== "5" && (
        <div className="flex-auto w-28 bg-secondary-light p-10 rounded-r-2xl">
          <MoneyDistribution apiTrigger={showNewTransactionForm} />
        </div>
      )}
    </div>
  );
};

export default RightMainSection;
