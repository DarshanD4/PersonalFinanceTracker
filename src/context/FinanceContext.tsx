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
  userName: string;
  hasCompletedOnboarding: boolean;
  addTransaction: (
    amount: number,
    category: string,
    type: "Income" | "Expense",
  ) => Promise<void>;
  updateTransaction: (
    id: string,
    updatedData: Partial<Transaction>,
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  clearAllData: () => Promise<void>;
  completeOnboarding: (
    name: string,
    goal: number,
    salary: number,
  ) => Promise<void>;
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
  const [userName, setUserName] = useState("User");
  const [hasCompletedOnboarding, setOnboarding] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const savedData = await AsyncStorage.getItem("@flow_money_data");
      const savedGoal = await AsyncStorage.getItem("@flow_money_goal");
      const savedName = await AsyncStorage.getItem("@user_name");
      const savedOnboarding = await AsyncStorage.getItem(
        "@onboarding_complete",
      );
      const savedTheme = await AsyncStorage.getItem("@is_dark_mode");

      if (savedData) setTransactions(JSON.parse(savedData));
      if (savedGoal) setGoal(Number(savedGoal));
      if (savedName) setUserName(savedName);
      if (savedOnboarding === "true") setOnboarding(true);
      if (savedTheme !== null) setIsDarkMode(savedTheme === "true");
    };
    loadData();
  }, []);

  const completeOnboarding = async (
    name: string,
    goal: number,
    salary: number,
  ) => {
    const initialEntry: Transaction = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      amount: salary,
      category: "Initial Salary",
      type: "Income",
    };
    setTransactions([initialEntry]);
    setUserName(name);
    setGoal(goal);
    setOnboarding(true);
    await AsyncStorage.setItem(
      "@flow_money_data",
      JSON.stringify([initialEntry]),
    );
    await AsyncStorage.setItem("@user_name", name);
    await AsyncStorage.setItem("@flow_money_goal", goal.toString());
    await AsyncStorage.setItem("@onboarding_complete", "true");
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

  const updateTransaction = async (
    id: string,
    updatedData: Partial<Transaction>,
  ) => {
    const updated = transactions.map((t) =>
      t.id === id ? { ...t, ...updatedData } : t,
    );
    setTransactions(updated);
    await AsyncStorage.setItem("@flow_money_data", JSON.stringify(updated));
  };

  const deleteTransaction = async (id: string) => {
    const updated = transactions.filter((t) => t.id !== id);
    setTransactions(updated);
    await AsyncStorage.setItem("@flow_money_data", JSON.stringify(updated));
  };

  const toggleTheme = async () => {
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem("@is_dark_mode", (!isDarkMode).toString());
  };

  const clearAllData = async () => {
    setTransactions([]);
    setOnboarding(false);
    await AsyncStorage.clear();
  };

  const totalBalance = transactions.reduce(
    (acc, t) => (t.type === "Income" ? acc + t.amount : acc - t.amount),
    0,
  );

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        userName,
        hasCompletedOnboarding,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        clearAllData,
        completeOnboarding,
        totalBalance,
        monthlyGoal,
        setMonthlyGoal: setGoal,
        isDarkMode,
        toggleTheme,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};
