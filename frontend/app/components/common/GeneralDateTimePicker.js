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
  value = "",
  disabled = false,
  dateWithTime = true,
}) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} className="m-0 p-0">
      <DemoContainer components={["DateTimePicker"]}>
        <DemoItem>
          <DateTimePicker
            disabled={disabled}
            defaultValue={dayjs(value)}
            id={id}
            name={name}
            onChange={(e) => {
              const selectedDate = e.$d instanceof Date ? e.$d : new Date(e.$d);
              if (dayjs(selectedDate).isValid()) {
                onChange({
                  date: dayjs(selectedDate).format("MM/DD/YYYY"),
                  time: dayjs(selectedDate).format("HH:mm"),
                  dateEvent: e,
                });
              } else {
                console.error("Invalid date:", selectedDate);
              }
            }}
            views={
              dateWithTime
                ? ["year", "month", "day", "hours", "minutes"]
                : ["year", "month", "day"]
            }
            className="m-0 p-0"
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}

// Import necessary libraries and components

// export default function GeneralDateTimePicker({
//   onChange = () => {},
//   id = "date-time",
//   name = "date-time",
//   value = "",
//   disabled = false,
//   startDate = null, // New prop for the start date
//   endDate = null, // New prop for the end date
// }) {
//   return (
//     <LocalizationProvider dateAdapter={AdapterDayjs} className="m-0 p-0">
//       <DemoContainer components={["DateTimePicker"]}>
//         <DemoItem>
//           <DateTimePicker
//             disabled={disabled}
//             defaultValue={dayjs(value)}
//             id={id}
//             name={name}
//             onChange={(e) => {
//               const selectedDate = e.$d instanceof Date ? e.$d : new Date(e.$d);
//               if (dayjs(selectedDate).isValid()) {
//                 // If both start and end dates are set, treat it as a range
//                 if (startDate && endDate) {
//                   onChange({
//                     startDate: dayjs(startDate).format("MM/DD/YYYY"),
//                     endDate: dayjs(selectedDate).format("MM/DD/YYYY"),
//                     dateEvent: e,
//                   });
//                 } else {
//                   onChange({
//                     date: dayjs(selectedDate).format("MM/DD/YYYY"),
//                     time: dayjs(selectedDate).format("HH:mm"),
//                     dateEvent: e,
//                   });
//                 }
//               } else {
//                 console.error("Invalid date:", selectedDate);
//               }
//             }}
//             views={["year", "month", "day", "hours", "minutes", "date-range"]} // Added "date-range" view
//             className="m-0 p-0"
//           />
//         </DemoItem>
//       </DemoContainer>
//     </LocalizationProvider>
//   );
// }
