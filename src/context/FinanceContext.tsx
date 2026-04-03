import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Transaction = {
  id: string;
  amount: number;
  category: string;
  type: "Income" | "Expense";
  date: string;
};

interface TransactionContextType {
  transactions: Transaction[];
  addTransaction: (
    amount: number,
    category: string,
    type: "Income" | "Expense",
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  clearAllData: () => Promise<void>; // 👈 ADD THIS LINE
  totalBalance: number;
  monthlyGoal: number;
  setMonthlyGoal: (goal: number) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

export const TransactionContext = createContext<
  TransactionContextType | undefined
>(undefined);

export const useTransactions = () => {
  const context = useContext(TransactionContext);
  if (!context)
    throw new Error("useTransactions must be used inside TransactionProvider");
  return context;
};

export const TransactionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [monthlyGoal, setGoal] = useState<number>(5000);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const saved = await AsyncStorage.getItem("@flow_money_data");
      const savedGoal = await AsyncStorage.getItem("@flow_money_goal");
      if (saved) setTransactions(JSON.parse(saved));
      if (savedGoal) setGoal(Number(savedGoal));
    };
    loadData();
  }, []);

  //  Wipes everything from the phone's memory
  const clearAllData = async () => {
    setTransactions([]);
    setGoal(50000);
    await AsyncStorage.clear();
  };
  const addTransaction = async (
    amount: number,
    category: string,
    type: "Income" | "Expense",
  ) => {
    const newEntry: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount,
      category,
      type,
    };
    const updated = [newEntry, ...transactions];
    setTransactions(updated);
    await AsyncStorage.setItem("@flow_money_data", JSON.stringify(updated));
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem("@flow_money_data", JSON.stringify(updated));
  };

  const setMonthlyGoal = async (goal: number) => {
    setGoal(goal);
    await AsyncStorage.setItem("@flow_money_goal", goal.toString());
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const totalBalance = transactions.reduce(
    (acc, t) => (t.type === "Income" ? acc + t.amount : acc - t.amount),
    0,
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        addTransaction,
        deleteTransaction,
        clearAllData, // 👈 ADD THIS LINE
        totalBalance,
        monthlyGoal,
        setMonthlyGoal,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
