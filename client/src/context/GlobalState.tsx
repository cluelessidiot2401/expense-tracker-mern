import React, { createContext, useReducer } from "react";
import { AppReducer } from "./AppReducer";
import { State, TransactionItem } from "../interfaces/Data";
import { GetTransactions } from "../interfaces/ApiResponse";
import axios from "axios";

// Initial State
const initialState: State = {
  transactions: [],
  error: null,
  loading: false,
  deleteTransaction: () => {},
  addTransaction: () => {},
  getTransactions: () => {},
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component to wrap stuff inside
export const GlobalProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res: { data: GetTransactions } = await axios.get(
        "/api/v1/transactions"
      );
      dispatch({
        type: "GET_TRANSACTIONS",
        payload: res.data.data,
      });
    } catch (error: any) {
      processError(error);
    }
  }

  async function deleteTransaction(id: number) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);
      dispatch({
        type: "DELETE_TRANSACTION",
        payload: id,
      });
    } catch (error: any) {
      processError(error);
    }
  }

  async function addTransaction(item: TransactionItem) {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response: { data: { data: TransactionItem } } = await axios.post(
        `/api/v1/transactions`,
        item,
        config
      );
      dispatch({
        type: "ADD_TRANSACTION",
        payload: response.data.data,
      });
    } catch (error) {
      processError(error);
    }
  }

  function processError(error: any) {
    console.log(error);
    if (error) {
      dispatch({
        type: "TRANSACTION_ERROR",
        payload: error,
      });
    }
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        error: state.error,
        loading: state.loading,
        getTransactions,
        deleteTransaction,
        addTransaction,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
