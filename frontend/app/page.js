"use client";
import { useEffect, useState } from "react";
import Header from "./components/header/Header";
import ExpenseTable from "./components/table/ExpenseTable";
import ExpenseReport from "./components/expense-report/ExpenseReport";
import LeftNavigation from "./components/left-navigation/LeftNavigation";
import RightMainSection from "./components/right-main-section/RightMainSection";

export default function Home() {
  const userLoggedInDetails = JSON.parse(localStorage.getItem("user"));
  const selctedTabLocalData = Number(localStorage?.getItem("selectedTab")) || 0;
  const [value, setValue] = useState(selctedTabLocalData);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);

  useEffect(() => {
    if (userLoggedInDetails?.result?._id) {
      setLoggedInUserDetails(userLoggedInDetails);
    } else {
      localStorage?.setItem("selectedTab", "5");
      setValue(5);
      setLoggedInUserDetails(null);
    }
  }, []);

  return (
    <main className="min-h-screen p-10 flex text-primary-text bg-primary-background">
      <div className="flex flex-wrap gap-9 min-h-full flex-1">
        <div className="h-full">
          <LeftNavigation
            value={value}
            setValue={setValue}
            loggedInUserDetails={loggedInUserDetails}
          />
        </div>
        <div className="h-full flex-1">
          <RightMainSection
            setSelectedTabId={setValue}
            selectedTabId={value}
            loggedInUserDetails={loggedInUserDetails}
          />
        </div>
      </div>
    </main>
  );
}
