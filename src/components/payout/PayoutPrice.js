import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Edit2, Save, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

export const DEFAULT_PAYOUT_RATE = 10;

const PayoutPrice = () => {
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState(0);
  const [prevPrice, setPrevPrice] = useState(0);

  // loading price from local storage
  useEffect(() => {
    const savedPrice = localStorage.getItem("payoutPrice");
    const initialPrice = savedPrice
      ? parseInt(savedPrice)
      : DEFAULT_PAYOUT_RATE;
    setPrice(initialPrice);
    setPrevPrice(initialPrice);
  }, []);

  const handleEdit = () => {
    if (edit) {
      // saving price to local storage
      localStorage.setItem("payoutPrice", price);
      setPrevPrice(price);
    }
    setEdit((prev) => !prev);
  };

  const handleCancel = () => {
    setPrice(prevPrice);
    setEdit(false);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value) || 0;
    setPrice(newPrice);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium">Payout Rate</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1 relative w-full max-w-[200px]">
            {edit ? (
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
                <Input
                  type="number"
                  value={price}
                  onChange={handlePriceChange}
                  min="0"
                  className="pl-9 pr-4"
                  placeholder="Enter amount"
                />
              </div>
            ) : (
              <div className="flex items-center gap-1 text-2xl font-semibold">
                <DollarSign className="h-5 w-5" />
                <span
                  className={cn(
                    "transition-colors",
                    price > prevPrice
                      ? "text-green-600"
                      : price < prevPrice
                      ? "text-red-600"
                      : ""
                  )}
                >
                  {price}
                </span>
                <span className="text-sm text-muted-foreground ml-1">
                  per article
                </span>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {edit ? (
              <>
                <Button variant="outline" size="sm" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button size="sm" onClick={handleEdit} className="gap-2">
                  <Save className="h-4 w-4" />
                  Save
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
                className="gap-2"
              >
                <Edit2 className="h-4 w-4" />
                Edit Rate
              </Button>
            )}
          </div>
        </div>

        {edit && (
          <p className="text-sm text-muted-foreground mt-2">
            Set the amount you want to pay per article.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default PayoutPrice;
