"use client";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { DataGrid, GridValueGetterParams } from "@mui/x-data-grid";
import NewRecord from "../popup/NewRecord";
import { Chip } from "@mui/material";

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
    { field: "id", headerName: "ID", width: 120 },
    { field: "amount", headerName: "Amount", type: "number", width: 70 },
    { field: "notes", headerName: "Notes", width: 150 },
    {
      field: "expenseCategory",
      headerName: "Expense Category",
      width: 130,
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

  const [rows, setRows] = useState([
    {
      id: 0,
      expenseCategory: [{ title: "Learning", id: 0 }],
      amount: 100,
      date: "01/18/2024",
      time: "14:00",
      notes: "Buy Udemy Course",
      isDeleted: false,
    },
  ]);

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

      default:
        filteredItems = rows;
        break;
    }

    setFilteredData(filteredItems);
  };

  const handleSubmit = () => {
    if (newRecordData?.id && newRecordData?.amount && newRecordData?.date) {
      setRows([...rows, newRecordData]);
    }
  };

  useEffect(() => {
    console.log("rows", rows, filteredData);
    handleFilter(filterBy);
  }, [rows]);

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-3">
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
    </div>
  );
};

export default ExpenseTable;
