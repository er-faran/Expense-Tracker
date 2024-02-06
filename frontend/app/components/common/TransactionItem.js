import React from "react";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { Avatar } from "@mui/material";
import Image from "next/image";
import { getCategoryIcon } from "./utils";

const TransactionItem = ({ data }) => {
  return (
    <div className="flex gap-5 border-b-2 mb-5 pb-3">
      <Avatar
        sx={{ width: 56, height: 56 }}
        className={`p-2 ${data?.expenseCategory?.title
          ?.replace(/ /g, "")
          .toLowerCase()}`}
      >
        <Image
          src={getCategoryIcon(data?.expenseCategory?.title)}
          alt={data?.expenseCategory?.title}
          width={50}
          height={50}
        />
      </Avatar>
      <div className="flex-1 text-sm">
        <div className="text-primary-background">{data?.notes}</div>
        <div>
          {data?.date} - {data?.time}
        </div>
      </div>
      <div className="text-end">
        <div className="text-primary-background font-medium flex flex-wrap justify-end items-center gap-2">
          <span
            className={
              "expense-category-label " +
              data?.expenseCategory?.title?.replace(/ /g, "").toLowerCase()
            }
          >
            {data?.expenseCategory?.title}
          </span>
        </div>
        <div className="text-primary-background font-semibold text-xl">
          {data?.amount}
        </div>
      </div>
    </div>
  );
};

export default TransactionItem;
