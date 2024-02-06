"use client";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import { MenuItem, Select } from "@mui/material";
import React, { useEffect, useState } from "react";
import PDFGenerator from "../common/PDFGenerator";
import dayjs from "dayjs";
import GeneralDateTimePicker from "../common/GeneralDateTimePicker";
import { logoutHandler } from "../common/utils";

const MainContentReports = ({ setSelectedTabId }) => {
  const [rows, setRows] = useState([]);
  const [timeSpan, setTimeSpan] = useState("today");
  const [filteredData, setFilteredData] = useState(rows);
  const [dataFetching, setDataFetching] = useState(false);
  const [dateRangeForDownloadReport, setDateRangeForDownloadReport] = useState({
    startDate: dayjs().startOf("month"),
    endDate: dayjs().endOf("month"),
    dateEvent: dayjs(),
  });

  const authorization = `${JSON?.parse(localStorage?.getItem("user"))?.token}`;

  const handleTimeSpan = (data) => {
    setTimeSpan(data);
  };

  const handleFilter = (filterType) => {
    const currentDate = dayjs();
    let filteredItems;

    switch (filterType) {
      case "today":
        filteredItems = rows?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isSame(currentDate, "day")
        );
        break;

      case "week":
        const startOfWeek = currentDate.startOf("week");
        const endOfWeek = currentDate.endOf("week");
        filteredItems = rows?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isBetween(
            startOfWeek,
            endOfWeek,
            null,
            "[]"
          )
        );
        break;

      case "month":
        const startOfMonth = currentDate.startOf("month");
        const endOfMonth = currentDate.endOf("month");
        filteredItems = rows?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isBetween(
            startOfMonth,
            endOfMonth,
            null,
            "[]"
          )
        );
        break;

      case "custom":
        const startCustom = dayjs(
          dateRangeForDownloadReport?.startDate,
          "MM/DD/YYYY"
        );
        const endCustom = dayjs(
          dateRangeForDownloadReport?.endDate,
          "MM/DD/YYYY"
        );
        filteredItems = rows?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isBetween(
            startCustom,
            endCustom,
            null,
            "[]"
          )
        );
        break;

      case "all":
        filteredItems = rows;
        break;

      default:
        filteredItems = rows;
        break;
    }
    const formattedData = [
      ...filteredItems.map((item) => {
        return {
          ...item,
          expenseCategory: item?.expenseCategory?.title,
        };
      }),
    ];

    setFilteredData(formattedData);
  };

  const getExpenseData = async () => {
    setDataFetching(true);
    const url = APIEndpoints?.getAllExpenseDataHandler();
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization,
        },
      });
      if (resp.status === 200) {
        try {
          const data = await resp.json();
          setRows(data?.expenses);
          setFilteredData(rows);

          console.log("table data api ===", data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (resp.status === 401 || resp.status === 403) {
        logoutHandler(setSelectedTabId(5));
        console.log("frontend error", resp);
      }
    } catch (error) {
      console.log("frontend error", error);
    } finally {
      setDataFetching(false);
    }
  };

  useEffect(() => {
    if (rows?.length === 0) {
      getExpenseData();
    }
    setTimeout(() => {
      handleFilter(timeSpan);
    }, 800);
  }, [timeSpan, dateRangeForDownloadReport, rows]);

  return (
    <div>
      <div className="reports-container">
        <h3 className="text-4xl font-semibold text-primary-background mb-3">
          Reports
        </h3>
        <div className="mt-2">
          <p>
            Explore Expense Report Download for instant financial insights.
            Choose 'Today,' 'This Week,' 'This Month,' or 'All' for diverse
            views. Utilize 'Custom Date Range' for precise analytics.
            Effortlessly download and manage your expenses.
          </p>
        </div>
        <div className="mt-4">
          <label htmlFor="time-span-select-reports">
            Select Expense Date Range :
          </label>
          <Select
            name="time-span-select-reports"
            id="time-span-select-reports"
            className="p-0 m-0 ml-4"
            value={timeSpan}
            onChange={(e) => handleTimeSpan(e.target.value)}
            defaultValue="today"
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="today">Today</MenuItem>
            <MenuItem value="week">This Week</MenuItem>
            <MenuItem value="month">This Month</MenuItem>
            <MenuItem value="custom">Custom Date Range</MenuItem>
          </Select>
        </div>
        {timeSpan === "custom" && (
          <div className="date-range-picker-container flex flex-wrap gap-7 my-5">
            <div className="flex-1">
              <label>
                Start Date <span className="required-icon">*</span>
              </label>
              <GeneralDateTimePicker
                dateWithTime={false}
                value={dateRangeForDownloadReport?.startDate}
                onChange={(item) =>
                  setDateRangeForDownloadReport({
                    startDate: item?.startDate,
                    dateEvent: item?.dateEvent,
                  })
                }
                id="start-date"
                name="start-date"
              />
            </div>
            <div className="flex-1">
              <label>
                End Date <span className="required-icon">*</span>
              </label>
              <GeneralDateTimePicker
                dateWithTime={false}
                value={dateRangeForDownloadReport?.endDate}
                onChange={(item) =>
                  setDateRangeForDownloadReport({
                    endDate: item?.endDate,
                    dateEvent: item?.dateEvent,
                  })
                }
                id="end-date"
                name="end-date"
              />
            </div>
          </div>
        )}
      </div>
      <div>
        <PDFGenerator data={filteredData} />
      </div>
    </div>
  );
};

export default MainContentReports;
