import { useState, useEffect } from "react";

export const DEFAULT_PAYOUT_RATE = 10;

const PayoutPrice = () => {
  const [edit, setEdit] = useState(false);
  const [price, setPrice] = useState(0);

  // loading price from local storage
  useEffect(() => {
    const savedPrice = localStorage.getItem("payoutPrice");
    setPrice(savedPrice ? parseInt(savedPrice) : DEFAULT_PAYOUT_RATE);
  }, []);

  const handleEdit = () => {
    if (edit) {
      // saving price to local storage
      localStorage.setItem("payoutPrice", price);
    }
    setEdit((prev) => !prev);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseInt(e.target.value) || 0;
    setPrice(newPrice);
  };

  return (
    <div className="flex flex-row items-center gap-2 mt-4">
      <div>PayoutPrice: </div>
      {edit ? (
        <input
          type="number"
          className="w-60 rounded-md p-1 border border-1 outline-none"
          value={price}
          onChange={handlePriceChange}
          min="0"
        />
      ) : (
        <div className="text-lg font-medium">${price}</div>
      )}

      <button
        className="text-sm font-medium bg-blue-600 px-3 py-1 text-white rounded"
        onClick={handleEdit}
      >
        {edit ? "Save" : "Edit"}
      </button>
    </div>
  );
};

export default PayoutPrice;
