"use client";
import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Button } from "@mui/material";
import PDFGenerator from "./PDFGenerator";

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

const DownloadReportSection = ({ children, onDownload, onSendEmail }) => {
  return (
    <>
      <div className="text-black text-xl mb-5">{children}</div>
      <div className="flex gap-7">
        <Button
          className="bg-green-600 hover:bg-green-500"
          variant="contained"
          onClick={onDownload}
        >
          Download
        </Button>
        <Button variant="outlined" onClick={onSendEmail}>
          Send Email
        </Button>
      </div>
    </>
  );
};

export default function VerticalTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        <PDFGenerator
          data={[
            {
              id: String(13),
              expenseCategory: "Hobbies",
              amount: String(30),
              date: "01/30/2024",
              time: "13:45",
              comment: "Art Supplies",
              isDeleted: false,
            },
            {
              id: String(14),
              expenseCategory: "Insurance",
              amount: String(80),
              date: "01/31/2024",
              time: "14:30",
              comment: "Car Insurance",
              isDeleted: false,
            },
          ]}
        />
        <DownloadReportSection>
          Get Today's Expense Report
        </DownloadReportSection>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DownloadReportSection>
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
