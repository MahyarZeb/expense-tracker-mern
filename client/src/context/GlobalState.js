import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer';
import axios from 'axios';

// Initial state
const initialState = {
  transactions: [],  // always an array
  error: null,
  loading: true
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Actions
  async function getTransactions() {
    try {
      const res = await axios.get('/api/v1/transactions');

      dispatch({
        type: 'GET_TRANSACTIONS',
        payload: Array.isArray(res.data?.data) ? res.data.data : []  // safe fallback
      });
    } catch (err) {
      console.error(err); // log for debugging
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function deleteTransaction(id) {
    try {
      await axios.delete(`/api/v1/transactions/${id}`);

      dispatch({
        type: 'DELETE_TRANSACTION',
        payload: id
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  async function addTransaction(transaction) {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    }

    try {
      const res = await axios.post('/api/v1/transactions', transaction, config);

      dispatch({
        type: 'ADD_TRANSACTION',
        payload: res.data?.data || {}  // fallback to empty object
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'TRANSACTION_ERROR',
        payload: err.response?.data?.error || 'Server Error'
      });
    }
  }

  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      error: state.error,
      loading: state.loading,
      getTransactions,
      deleteTransaction,
      addTransaction
    }}>
      {children}
    </GlobalContext.Provider>
  );
}
