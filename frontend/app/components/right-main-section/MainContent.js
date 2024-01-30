"use client";
import React, { useEffect, useState } from "react";
import Transactions from "../common/Transactions";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import dayjs from "dayjs";
import TransactionList from "../skeleton/TransactionList";
import NewRecord from "../popup/NewRecord";
import { toast } from "react-toastify";
import { logoutHandler } from "../common/utils";

const MainContent = ({
  showNewTransactionForm,
  setShowNewTransactionForm,
  setSelectedTabId,
}) => {
  const [rows, setRows] = useState([]);

  const [filteredData, setFilteredData] = useState(rows);
  const [timeSpan, setTimeSpan] = useState("today");
  const [tableDataFetching, setTableDataFetching] = useState(false);

  const userID = JSON.parse(localStorage.getItem("user"))?.result?._id;

  // const [showNewTransactionForm, setShowNewTransactionForm] = useState(false);
  const defaultNewRecordData = {
    id: null,
    amount: null,
    expenseCategory: null,
    notes: null,
    date: null,
    time: null,
    dateEvent: null,
  };
  const [newRecordData, setNewRecordData] = useState(defaultNewRecordData);

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

      case "all":
        filteredItems = rows;
        break;

      default:
        filteredItems = rows;
        break;
    }

    setFilteredData(filteredItems);
  };

  const getExpenseTableData = async () => {
    setTableDataFetching(true);
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
      setTableDataFetching(false);
      setViewTransactionItem(null);
    }
  };

  const handleSubmit = async (popupState = "new") => {
    try {
      if (!userID) {
        toast.error("User Not Found");
        return 0;
      }
      const url =
        popupState === "update"
          ? APIEndpoints?.updateExpenseHandler()
          : popupState === "view"
          ? APIEndpoints?.deleteExpenseHandler(
              newRecordData?.id || viewTransactionItem?.id || ""
            )
          : APIEndpoints?.createExpenseHandler();
      const resp = await fetch(url, {
        method:
          popupState === "update"
            ? "PUT"
            : popupState === "view"
            ? "DELETE"
            : "POST",
        headers: {
          "Content-Type": "application/json",
          authorization,
        },
        body:
          popupState === "view"
            ? null
            : JSON.stringify({ ...newRecordData, userID }),
      });
      if (resp.status === 201 || resp.status === 200) {
        try {
          const data = await resp.json();
          console.log("Ab Final", popupState, data);
          toast(data?.message);
          getExpenseTableData();
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      } else if (resp.status === 401 || resp.status === 403) {
        logoutHandler(setSelectedTabId(5));
        console.log("frontend error", resp);
      }
    } catch (err) {
      console.log("frontend err", err);
    } finally {
      setShowNewTransactionForm(false);
    }
  };

  const [viewTransactionItem, setViewTransactionItem] = useState(null);

  const handleItemClick = (item) => {
    if (item?.id) {
      setShowNewTransactionForm(true);
      setViewTransactionItem(item);
      setNewRecordData(item);
    }
  };

  useEffect(() => {
    handleFilter(timeSpan);
  }, [rows]);

  useEffect(() => {
    setTableDataFetching(true);
    setTimeout(() => {
      getExpenseTableData();
      if (!viewTransactionItem && !showNewTransactionForm)
        setNewRecordData(defaultNewRecordData);
    }, 1000);
  }, [timeSpan, viewTransactionItem, showNewTransactionForm]);

  return (
    <div>
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-semibold text-primary-background mb-3">
          Expenses
        </h3>
        <button
          className="bg-primary-background text-primary-light px-3 py-2 rounded-md text-xs"
          onClick={() => setShowNewTransactionForm(!showNewTransactionForm)}
        >
          {showNewTransactionForm ? "SHOW DATA" : "NEW TRANSACTION"}
        </button>
      </div>
      {showNewTransactionForm || viewTransactionItem ? (
        <NewRecord
          openPopup={showNewTransactionForm}
          data={newRecordData}
          setData={setNewRecordData}
          handleSubmit={handleSubmit}
          setOpenPopup={setShowNewTransactionForm}
          viewTransactionItem={viewTransactionItem}
        />
      ) : (
        <div>
          {tableDataFetching ? (
            [1, 2, 3].map((item) => (
              <div className="mb-5" key={item}>
                <TransactionList />
              </div>
            ))
          ) : (
            <Transactions
              dataToShow={filteredData}
              timeSpan={timeSpan}
              handleTimeSpan={handleTimeSpan}
              handleItemClick={handleItemClick}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MainContent;
