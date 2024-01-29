"use client";
import React, { useEffect, useState } from "react";
import ProgressIndicator from "../common/ProgressIndicator";
import { APIEndpoints } from "@/app/api/APIEndpoints";
import sidePanelMoneyImg from "../../images/money.png";
import Image from "next/image";

const MoneyDistribution = ({ apiTrigger }) => {
  const [expenseDistrubutionData, setExpenseDistrubutionData] = useState([]);
  const getExpenseByCategory = async () => {
    const url = APIEndpoints?.getExpenseByCategoryHandler();
    console.log("frontend data", url);
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
          setExpenseDistrubutionData(data);
          console.log("frontend data", data);
        } catch (error) {
          console.error("Error parsing JSON:", error);
        }
      }
    } catch (error) {
      console.log("frontend error", error);
    }
  };

  useEffect(() => {
    getExpenseByCategory();
  }, [apiTrigger]);

  return (
    <div className="relative h-full">
      <div>
        <h3 className="text-primary-background font-semibold text-xl">
          Where your money go?
        </h3>
        <div className="flex flex-col gap-2 mt-8 max-h-64 overflow-y-auto scrollbar">
          {expenseDistrubutionData?.moneyByCategory?.length > 0 ? (
            expenseDistrubutionData?.moneyByCategory?.map((item) => {
              return (
                <ProgressIndicator
                  label={item?.category?.title}
                  value={item?.percentage?.toFixed(2)}
                  className="w-full h-2 appearance-none bg-primary-progress rounded-full outline-none  active:outline-none"
                />
              );
            })
          ) : (
            <div></div>
          )}
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <div className="bg-secondary-lighter rounded-lg p-5 w-full relative">
          <Image
            className="-top-10 left-3 absolute"
            src={sidePanelMoneyImg}
            width="130"
            heigth="100"
          />
          <div className="mt-10">
            <h2 className="text-primary-background font-semibold text-lg">
              Save More Money
            </h2>
            <p className="text-sm">
              Boost savings with expert tips. Discover money saving strategies
              and achieve financial wellness.
            </p>
            <button
              className="bg-primary-background text-primary-light px-3 py-2 rounded-md text-sm w-full mt-5"
              onClick={() => {}}
            >
              VIEW TIPS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoneyDistribution;
