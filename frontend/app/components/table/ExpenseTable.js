"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import NewRecord from "../popup/NewRecord";
import { Chip } from "@mui/material";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import { ToastContainer, toast } from "react-toastify";

const ExpenseTable = () => {
  const [newRecordData, setNewRecordData] = useState({
    id: null,
    amount: null,
    expenseCategory: null,
    notes: null,
    date: null,
    time: null,
  });
  const [filterBy, setFilterBy] = useState("today");

  const columns = [
    { field: "id", headerName: "ID", width: 150 },
    { field: "amount", headerName: "Amount", type: "number", width: 70 },
    { field: "notes", headerName: "Notes", width: 200 },
    {
      field: "expenseCategory",
      headerName: "Expense Category",
      width: 150,
      valueGetter: (values) => {
        console.log("values", values);
        const dataToShow =
          values?.value?.length > 0
            ? values?.value?.map((item) => item?.title)?.join(", ")
            : "";
        return dataToShow;
      },
    },
    {
      field: "date",
      headerName: "Date",
      width: 130,
      // type: "date",
    },
    {
      field: "time",
      headerName: "Time",
      width: 130,
    },
  ];

  const [rows, setRows] = useState([]);

  const [filteredData, setFilteredData] = useState(rows);

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
    const url = APIEndpoints?.getAllExpenseDataHandler();
    try {
      const resp = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (resp.status === 200) {
        try {
          const data = await resp.json();
          setRows(data?.expenses);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    } catch (error) {
      console.log("frontend error", error);
    }
  };

  const handleSubmit = async () => {
    const url = APIEndpoints?.createExpenseHandler();
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRecordData),
    });
    if (resp.status === 201) {
      try {
        const data = await resp.json();
        console.log("Ab Final", data);
        toast(data?.message);
        getExpenseTableData();
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    }
    console.log("frontend resp", resp);
  };

  useEffect(() => {
    handleFilter(filterBy);
  }, [rows]);

  useEffect(() => {
    getExpenseTableData();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
          <Chip
            label="All"
            variant={filterBy === "all" ? "filled" : "outlined"}
            onClick={() => {
              setFilterBy("all");
              handleFilter("all");
            }}
          />
          <Chip
            label="Today"
            variant={filterBy === "today" ? "filled" : "outlined"}
            onClick={() => {
              setFilterBy("today");
              handleFilter("today");
            }}
          />
          <Chip
            label="This Week"
            variant={filterBy === "week" ? "filled" : "outlined"}
            onClick={() => {
              setFilterBy("week");
              handleFilter("week");
            }}
          />
          <Chip
            label="This Month"
            variant={filterBy === "month" ? "filled" : "outlined"}
            onClick={() => {
              setFilterBy("month");
              handleFilter("month");
            }}
          />
        </div>
        <NewRecord
          data={newRecordData}
          setData={setNewRecordData}
          handleSubmit={handleSubmit}
        />
      </div>
      <DataGrid
        id="expense-table"
        rows={filteredData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
      />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default ExpenseTable;
