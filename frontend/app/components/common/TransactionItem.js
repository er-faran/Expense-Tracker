import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Avatar } from "@mui/material";

const TransactionItem = ({ data }) => {
  console.log("data", data?.expenseCategory);
  const SHOW_MINIMUM_CATEGORY = 2;
  const expenseCategoryToShow = [...data?.expenseCategory];
  expenseCategoryToShow.length = SHOW_MINIMUM_CATEGORY;

  return (
    <div className="flex gap-5 border-b-2 mb-5 pb-3">
      <Avatar>
        <AcUnitIcon />
      </Avatar>
      <div className="flex-1 text-sm">
        <div className="text-primary-background">{data?.notes}</div>
        <div>
          {data?.date} - {data?.time}
        </div>
      </div>
      <div className="text-end">
        <div className="text-primary-background font-medium flex flex-wrap justify-end items-center gap-2">
          {expenseCategoryToShow?.map((item) => (
            <span
              className={
                "expense-category-label " +
                item?.title?.replace(/ /g, "").toLowerCase()
              }
            >
              {item?.title}
            </span>
          ))}
          {data?.expenseCategory?.length - 2 > 0 && (
            <span
              className="cursor-pointer"
              title={data?.expenseCategory
                ?.map((item) => item?.title)
                ?.splice(2)
                ?.join(", ")}
            >{`+${data?.expenseCategory?.length - 2}`}</span>
          )}
        </div>
        <div className="text-primary-background font-semibold text-xl">
          {data?.amount}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
