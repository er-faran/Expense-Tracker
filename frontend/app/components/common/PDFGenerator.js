"use client";
// components/PDFGenerator.js
import React from "react";
import jsPDF from "jspdf";
import { Button } from "@mui/material";

const PDFGenerator = ({ data = [] }) => {
  console.log("data", data);
  const generateData = (amount) => {
    var result = [];
    for (var i = 0; i < amount; i += 1) {
      result.push(Object.assign({}, data[i]));
    }
    return result;
  };

  const createHeaders = (keys) => {
    var result = [];
    for (var i = 0; i < keys.length; i += 1) {
      result.push({
        id: keys[i],
        name: keys[i],
        prompt: keys[i],
        width: 80,
        align: "center",
        padding: 0,
      });
    }
    return result;
  };

  var headers = createHeaders([
    "id",
    "expenseCategory",
    "amount",
    "date",
    "time",
    "comment",
  ]);
  const generatePDF = () => {
    var doc = new jsPDF({ putOnlyUsedFonts: true, orientation: "landscape" });
    doc.table(1, 1, generateData(data.length), headers, { autoSize: true });

    // Save or download the PDF
    doc.save("expense_report.pdf");
  };

  return (
    <div>
      <Button
        className="bg-green-600 hover:bg-green-500"
        variant="contained"
        //   onClick={onDownload}
        onClick={generatePDF}
      >
        Download
      </Button>
      {/* <button onClick={generatePDF}>Generate PDF</button> */}
    </div>
  );
};

export default PDFGenerator;
