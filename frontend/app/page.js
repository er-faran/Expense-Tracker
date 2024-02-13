"use client";
import { useEffect, useState } from "react";
import LeftNavigation from "./components/left-navigation/LeftNavigation";
import RightMainSection from "./components/right-main-section/RightMainSection";

export default function Home() {
  let selctedTabLocalData = 5;
  let userLoggedInDetails = null;
  if (typeof window !== "undefined") {
    selctedTabLocalData = Number(localStorage?.getItem("selectedTab")) || 0;
    userLoggedInDetails = JSON.parse(localStorage.getItem("user"));
  }
  const [value, setValue] = useState(selctedTabLocalData);
  const [loggedInUserDetails, setLoggedInUserDetails] = useState(null);

  useEffect(() => {
    if (userLoggedInDetails?.result?._id) {
      setLoggedInUserDetails(userLoggedInDetails);
    } else {
      localStorage.setItem("selectedTab", "5");
      localStorage.setItem("user", null);
      setLoggedInUserDetails(null);
      setValue(5);
    }
  }, [value]);

  return (
    <main className="h-fit min-h-screen p-5 md:p-10 flex text-primary-text bg-primary-background">
      <div className="flex flex-col md:flex-row gap-9 min-h-full flex-1 w-full">
        <div className="md:h-full w-full md:w-1/4">
          <LeftNavigation
            value={value}
            setValue={setValue}
            loggedInUserDetails={loggedInUserDetails}
          />
        </div>
        <div className="flex-1">
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
