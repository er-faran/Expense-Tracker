"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import PDFGenerator from "./PDFGenerator";
import dayjs from "dayjs";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const DownloadReportSection = ({
  children,
  onDownload,
  onSendEmail,
  timeSpan = "all",
  data,
}) => {
  return (
    <>
      <div className="text-black text-xl mb-5">{children}</div>
      <div className="flex gap-7">
        {/* <Button
          className="bg-green-600 hover:bg-green-500"
          variant="contained"
          onClick={onDownload}
        >
          Download
        </Button> */}
        <PDFGenerator data={data} />
        <Button variant="outlined" onClick={onSendEmail}>
          Send Email
        </Button>
      </div>
    </>
  );
};

export default function VerticalTabs({ data = [] }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleFilter = (filterType) => {
    const currentDate = dayjs();
    let filteredItems;

    switch (filterType) {
      case "today":
        filteredItems = data?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isSame(currentDate, "day")
        );
        break;

      case "week":
        const startOfWeek = currentDate.startOf("week");
        const endOfWeek = currentDate.endOf("week");
        filteredItems = data?.filter((item) =>
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
        filteredItems = data?.filter((item) =>
          dayjs(item.date, "MM/DD/YYYY").isBetween(
            startOfMonth,
            endOfMonth,
            null,
            "[]"
          )
        );
        break;

      case "all":
        filteredItems = data;
        break;

      default:
        filteredItems = data;
        break;
    }
    console.log("filteredItems", filterType, filteredItems);
    return filteredItems;
  };

  return (
    <Box
      sx={{
        flexGrow: 1,
        bgcolor: "background.paper",
        display: "flex",
        height: 224,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: "divider" }}
        className="h-full"
      >
        <Tab label="Today's Report" {...a11yProps(0)} />
        <Tab label="This Week's Report" {...a11yProps(1)} />
        <Tab disabled={true} label="This Year's Report" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DownloadReportSection timeSpan="today" data={handleFilter("today")}>
          Get Today's Expense Report
        </DownloadReportSection>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DownloadReportSection timeSpan="week" data={handleFilter("week")}>
          Get This Week's Expense Report
        </DownloadReportSection>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div></div>
        {/* <DownloadReportSection>
          Get This Month's Expense Report
        </DownloadReportSection> */}
      </TabPanel>
    </Box>
  );
}
