import React, { useContext } from "react";
import { GlobalContext } from "../context/GlobalState";

export const IncomeExpenses = () => {
  const { transactions } = useContext(GlobalContext);
  const income = transactions
    .reduce(
      (accumulator, current) =>
        accumulator + (current.amount > 0 ? current.amount : 0),
      0
    )
    .toFixed(2);
  const expense = Math.abs(
    transactions.reduce(
      (accumulator, current) =>
        accumulator + (current.amount < 0 ? current.amount : 0),
      0
    )
  ).toFixed(2);
  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p className="money plus">{income}</p>
      </div>
      <div>
        <h4>Expense</h4>
        <p className="money minus">{expense}</p>
      </div>
    </div>
  );
};
