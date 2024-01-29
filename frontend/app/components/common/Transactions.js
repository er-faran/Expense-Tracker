"use client";
import React, { useEffect, useState } from "react";
import TransactionItem from "./TransactionItem";
import { MenuItem, Select } from "@mui/material";

const Transactions = ({
  dataToShow = [],
  timeSpan = "today",
  handleTimeSpan = () => {},
  handleItemClick = () => {},
}) => {
  const DATA_SHOW_ON_SHORT_VIEW = 3;
  const [shortView, setShortView] = useState(true);
  const transactions = shortView
    ? dataToShow.slice(0, DATA_SHOW_ON_SHORT_VIEW)
    : dataToShow;

  const onViewAllClick = () => {
    setShortView(!shortView);
  };

  useEffect(() => {
    setShortView(true);
  }, [timeSpan]);

  return (
    <div>
      <div className="flex justify-between p-2">
        <Select
          id="time-span-select"
          className="p-0 m-0 border-none"
          value={timeSpan}
          onChange={(e) => handleTimeSpan(e.target.value)}
          defaultValue="today"
          inputProps={{ "aria-label": "Without label" }}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="today">Today</MenuItem>
          <MenuItem value="week">This Week</MenuItem>
          <MenuItem value="month">This Month</MenuItem>
        </Select>
        {DATA_SHOW_ON_SHORT_VIEW < dataToShow?.length && (
          <button onClick={() => onViewAllClick()}>
            {shortView ? "View All" : "View Less"}
          </button>
        )}
      </div>
      <hr />
      <div
        className={`mt-5 md:max-h-96 overflow-auto scrollbar ${
          DATA_SHOW_ON_SHORT_VIEW < dataToShow?.length && !shortView && "pr-3"
        }`}
      >
        {transactions?.map((item) => {
          return (
            <div
              className="hover:cursor-pointer"
              onClick={() => handleItemClick(item)}
            >
              <TransactionItem data={item} key={item?.id} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Transactions;
