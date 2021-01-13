import React, { useContext } from "react";
import { TransactionItem } from "../interfaces/Data";
import { GlobalContext } from "../context/GlobalState";
import { numberWithCommas } from "../utils/format";

export const Transaction = ({
  transaction,
}: {
  transaction: TransactionItem;
}) => {
  const { deleteTransaction } = useContext(GlobalContext);
  let sign = transaction.amount < 0 ? "-" : "+";
  if (transaction.amount === 0) sign = "";
  return (
    <li className={transaction.amount < 0 ? "minus" : "plus"}>
      {transaction.text}
      <span>
        {sign} ${numberWithCommas(Math.abs(transaction.amount))}
      </span>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(transaction._id)}
      >
        x
      </button>
    </li>
  );
};
