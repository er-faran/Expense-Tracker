import { Skeleton } from "@mui/material";
import React from "react";

const TransactionList = () => {
  return (
    <div className="flex gap-3 items-center">
      <Skeleton variant="circular" width={50} height={50} />
      <div className="flex-1">
        <Skeleton variant="rectangular" height={20} />
        <Skeleton
          className="mt-1"
          variant="rectangular"
          width="full"
          height={20}
        />
      </div>
      <Skeleton variant="rectangular" width={50} height={50} />
    </div>
  );
};

export default TransactionList;
