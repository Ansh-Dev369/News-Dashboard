"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Edit2, Check } from "lucide-react";

import { DEFAULT_PAYOUT_RATE } from "./PayoutPrice";
import PayoutTableExport from "./PayoutTableExport";

export function PayoutTable() {
  const { articles } = useSelector((state) => state.news);
  const [authorRates, setAuthorRates] = useState({});
  const [defaultRate, setDefaultRate] = useState(DEFAULT_PAYOUT_RATE);
  const [editingAuthor, setEditingAuthor] = useState(null);
  const [editRate, setEditRate] = useState(0);

  useEffect(() => {
    const savedRates = localStorage.getItem("authorRates");
    if (savedRates) {
      setAuthorRates(JSON.parse(savedRates));
    }

    // Loading default payout rate
    const savedPayoutPrice = localStorage.getItem("payoutPrice");
    if (savedPayoutPrice) {
      setDefaultRate(parseInt(savedPayoutPrice));
    }
  }, []);

  // Calculating author statistics with custom rates
  const authorStats = articles.reduce((acc, article) => {
    const author = article.author || "Unknown Author";

    if (!acc[author]) {
      // Using author-specific rate if exists, otherwise using default rate
      const authorRate = authorRates[author] || defaultRate;

      acc[author] = {
        articleCount: 0,
        payoutRate: authorRate,
        totalPay: 0,
      };
    }

    acc[author].articleCount += 1;
    acc[author].totalPay = acc[author].articleCount * acc[author].payoutRate;

    return acc;
  }, {});

  const authorRows = Object.entries(authorStats)
    .map(([author, stats]) => ({
      author,
      ...stats,
    }))
    .sort((a, b) => b.totalPay - a.totalPay);

  const totalPayout = authorRows.reduce((sum, row) => sum + row.totalPay, 0);

  const handleEditRate = (author, currentRate) => {
    setEditingAuthor(author);
    setEditRate(currentRate);
  };

  const handleSaveRate = (author) => {
    const newRates = {
      ...authorRates,
      [author]: editRate,
    };

    // Saving to localStorage
    localStorage.setItem("authorRates", JSON.stringify(newRates));
    setAuthorRates(newRates);
    setEditingAuthor(null);
  };

  return (
    <div className="relative max-w-full mt-4 dark:text-white">
      <PayoutTableExport authorRows={authorRows} totalPayout={totalPayout} />
      <div className="overflow-x-auto border rounded-lg">
        <div className="min-w-[600px]">
          <Table>
            <TableCaption>Author payouts based on article count.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[30%]">Author</TableHead>
                <TableHead className="text-center w-[20%]">Articles</TableHead>
                <TableHead className="text-center w-[30%]">
                  Rate/Article
                </TableHead>
                <TableHead className="text-right w-[20%]">
                  Total Payout
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {authorRows.map((row) => (
                <TableRow key={row.author}>
                  <TableCell className="font-medium max-w-[200px] truncate">
                    {row.author}
                  </TableCell>
                  <TableCell className="text-center">
                    {row.articleCount}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      {editingAuthor === row.author ? (
                        <>
                          <input
                            type="number"
                            value={editRate}
                            onChange={(e) =>
                              setEditRate(Number(e.target.value))
                            }
                            className="w-20 px-2 py-1 border rounded "
                            min="0"
                          />
                          <button
                            onClick={() => handleSaveRate(row.author)}
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        </>
                      ) : (
                        <>
                          ${row.payoutRate}
                          <button
                            onClick={() =>
                              handleEditRate(row.author, row.payoutRate)
                            }
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        </>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    ${row.totalPay.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total Payout</TableCell>
                <TableCell className="text-right">
                  ${totalPayout.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </div>
    </div>
  );
}
