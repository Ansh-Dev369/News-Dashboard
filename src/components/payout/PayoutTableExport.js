import React from "react";
import { Button } from "@/components/ui/button";
import Papa from "papaparse";

const PayoutTableExport = ({ authorRows, totalPayout }) => {
  const exportToCSV = () => {
    // data for CSV
    const data = [
      // Headers
      ["Author", "Articles", "Rate/Article", "Total Payout"],
      // Data rows
      ...authorRows.map((row) => [
        row.author,
        row.articleCount,
        `$${row.payoutRate}`,
        `$${row.totalPay.toFixed(2)}`,
      ]),
      // Total row
      ["", "", "Total", `$${totalPayout.toFixed(2)}`],
    ];

    // Converting to CSV using PapaParse
    const csv = Papa.unparse(data);

    // Creating and download file
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.href = url;
    link.download = "payout_report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToPDF = () => {
    import("jspdf").then(({ default: jsPDF }) => {
      import("jspdf-autotable").then(() => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Payout Report", 14, 15);

        doc.autoTable({
          head: [["Author", "Articles", "Rate/Article", "Total Payout"]],
          body: [
            ...authorRows.map((row) => [
              row.author,
              row.articleCount,
              `$${row.payoutRate}`,
              `$${row.totalPay.toFixed(2)}`,
            ]),
            ["", "", "Total", `$${totalPayout.toFixed(2)}`],
          ],
          startY: 25,
          theme: "grid",
          styles: { fontSize: 8 },
          headStyles: { fillColor: [71, 85, 105] },
        });

        doc.save("payout_report.pdf");
      });
    });
  };

  return (
    <div className="flex justify-end w-full mb-4">
      <div className="flex gap-2 items-center">
        <p>Export: </p>
        <Button variant="outline" size="sm" onClick={exportToCSV}>
          CSV
        </Button>
        <Button variant="outline" size="sm" onClick={exportToPDF}>
          PDF
        </Button>
      </div>
    </div>
  );
};

export default PayoutTableExport;
