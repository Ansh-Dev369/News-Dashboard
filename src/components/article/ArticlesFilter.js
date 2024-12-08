import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, X } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Separator } from "../ui/separator";

const ArticlesFilter = ({ onFilterChange, activeFilters }) => {
  const [dateFrom, setDateFrom] = useState(activeFilters?.dateFrom || null);
  const [dateTo, setDateTo] = useState(activeFilters?.dateTo || null);

  const handleDateFromChange = (date) => {
    setDateFrom(date);
    onFilterChange({
      ...activeFilters,
      dateFrom: date,
    });
  };

  const handleDateToChange = (date) => {
    setDateTo(date);
    onFilterChange({
      ...activeFilters,
      dateTo: date,
    });
  };

  const clearFilters = () => {
    setDateFrom(null);
    setDateTo(null);
    onFilterChange({
      dateFrom: null,
      dateTo: null,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-md font-medium dark:text-white">Filter by date:</p>

        {/* Date From */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 px-4 py-2 dark:text-white">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateFrom ? format(dateFrom, "PPP") : "From Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateFrom}
              onSelect={handleDateFromChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Date To */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="h-9 px-4 py-2 dark:text-white">
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateTo ? format(dateTo, "PPP") : "To Date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={dateTo}
              onSelect={handleDateToChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        {/* Clear Filters */}
        {(dateFrom || dateTo) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-9"
          >
            <X className="h-4 w-4 mr-2" />
            Clear Filters
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {(dateFrom || dateTo) && (
        <div className="flex flex-wrap gap-2">
          {dateFrom && (
            <Badge variant="secondary">From: {format(dateFrom, "PP")}</Badge>
          )}
          {dateTo && (
            <Badge variant="secondary">To: {format(dateTo, "PP")}</Badge>
          )}
        </div>
      )}
      <Separator className="my-1" />
    </div>
  );
};

export default ArticlesFilter;
