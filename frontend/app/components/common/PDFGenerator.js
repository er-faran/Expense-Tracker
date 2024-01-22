"use client";
// components/PDFGenerator.js
import React from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Button } from "@mui/material";

const PDFGenerator = ({ data = [] }) => {
  const formatDataForAutoTable = (originalData, headers) => {
    const formattedData = [];

    // Loop through each item in the original data
    originalData.forEach((item) => {
      const rowData = [];

      // Loop through each header to extract the corresponding value from the item
      headers.forEach((header) => {
        rowData.push(item[header] || ""); // Use empty string if the property is not found
      });

      // Add the row data to the formattedData
      formattedData.push(rowData);
    });
    console.log("final Data", formattedData);
    return formattedData;
  };

  const generatePDF = () => {
    const doc = new jsPDF({
      putOnlyUsedFonts: true,
      orientation: "landscape",
      unit: "px",
    });

    // Add "Expense Report" header
    doc.setFontSize(18);
    doc.text("Expense Report", doc.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add separator
    doc.setLineWidth(0.5);
    doc.line(20, 30, doc.internal.pageSize.getWidth() - 20, 30);

    // Add date
    const currentDate = new Date().toLocaleDateString();
    doc.setFontSize(12);
    doc.text(
      `Printed on: ${currentDate}`,
      doc.internal.pageSize.getWidth() - 50,
      40,
      { align: "right" }
    );

    // Set position for the table (adjust the values as needed)
    const tableX = 20;
    const tableY = 50;

    // Specify the widths for each column
    const headers = [
      "id",
      "expenseCategory",
      "amount",
      "date",
      "time",
      "notes",
    ];

    // Add the table with some margin on the X-axis
    doc.autoTable({
      head: [headers],
      body: formatDataForAutoTable(data, headers),
      margin: { top: tableY, left: tableX },
      styles: { overflow: "linebreak" },
      theme: "grid",
      columnStyles: {
        notes: { cellWidth: "auto" }, // Adjust the column width if necessary
      },
      didDrawCell: function (cell) {
        // Wrap text if it exceeds the cell height
        if (cell.row.raw.notes && cell.column.dataKey === "notes") {
          const cellHeight = cell.row.styles.rowHeight;
          const text = cell.text;
          const textLines = doc.splitTextToSize(text, cell.width);
          const cellLines = Math.ceil(
            doc.getTextDimensions(text).h / cellHeight
          );
          if (cellLines > 1) {
            // Adjust row height if text wraps to multiple lines
            cell.row.styles.rowHeight = cellHeight * cellLines;
          }
          doc.text(textLines, cell.x + 2, cell.y + 2);
        }
      },
    });

    // Save or download the PDF
    doc.save("expense_report.pdf");
  };

  return (
    <div>
      <Button
        className="bg-green-600 hover:bg-green-500"
        variant="contained"
        disabled={!data?.length}
        onClick={() => generatePDF()}
      >
        Download
      </Button>
    </div>
  );
};

export default PDFGenerator;
