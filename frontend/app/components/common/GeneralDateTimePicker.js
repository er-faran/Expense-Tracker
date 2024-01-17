"use client";
import * as React from "react";
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

// const lastMonday = dayjs().startOf("week");
// const nextSunday = dayjs().endOf("week").startOf("day");

const isWeekend = (date) => {
  const day = date.day();

  return day === 0 || day === 6;
};

export default function GeneralDateTimePicker({
  onChange = () => {},
  id = "date-time",
  name = "date-time",
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className="m-0 p-0">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem>
          <DateTimePicker
            id={id}
            name={name}
            onChange={(e) =>
              onChange({
                date: dayjs(e.$d).format("MM/DD/YYYY"),
                time: dayjs(e.$d).format("HH:mm"),
              })
            }
            // defaultValue={nextSunday}
            // shouldDisableDate={isWeekend}
            views={["year", "month", "day", "hours", "minutes"]}
            className="m-0 p-0"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
