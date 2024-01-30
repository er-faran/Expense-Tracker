"use client";
import React, { useEffect, useState } from "react";
import VerticalTabs from "../common/VerticalTabs";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import { logoutHandler } from "../common/utils";

const ExpenseReport = () => {
  const [rows, setRows] = useState([]);
  const authorization = `${JSON?.parse(localStorage?.getItem("user"))?.token}`;

  const getExpenseTableData = async () => {
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
          const formattedData = data?.expenses?.map((item) => {
            return {
              ...item,
              expenseCategory: item?.expenseCategory
                ?.map((item) => item?.title)
                ?.join(", "),
            };
          });
          setRows(formattedData);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (resp.status === 401 || resp.status === 403) {
        logoutHandler();
        console.log("frontend error", resp);
      }
    } catch (error) {
      console.log("frontend error", error?.message);
    }
  };
  useEffect(() => {
    getExpenseTableData();
  }, []);
  return (
    <div>
      <VerticalTabs data={rows} />
    </div>
  );
};

export default ExpenseReport;
