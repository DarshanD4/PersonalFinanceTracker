import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  TouchableOpacity,
} from "react-native";
import { useTransactions } from "../context/FinanceContext";
import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons"; // ✅ Added for the Menu Icon

const { width } = Dimensions.get("window");
const CARD_WIDTH = width;
const SNAP = CARD_WIDTH;

export default function HomeScreen({ navigation }: any) {
  // ✅ Added isDarkMode to track theme changes
  const { transactions, totalBalance, isDarkMode } = useTransactions();

  const ref = useRef<ScrollView | null>(null);

  // ✅ CALCULATE INCOME AND EXPENSES FOR CARDS
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // ✅ DYNAMIC CARD DATA
  const DATA = [
    {
      title: "TOTAL BALANCE",
      amount: `₹${totalBalance.toLocaleString()}`,
      color: "#10B981",
    },
    {
      title: "INCOME",
      amount: `₹${income.toLocaleString()}`,
      color: "#6366F1",
    },
    {
      title: "EXPENSES",
      amount: `₹${expenses.toLocaleString()}`,
      color: "#EF4444",
    },
  ];

  const LOOP = [...DATA, ...DATA, ...DATA];
  const middle = SNAP * DATA.length;

  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const x = e.nativeEvent.contentOffset.x;
    const total = SNAP * DATA.length;

    if (x <= 0 || x >= total * 2) {
      ref.current?.scrollTo({ x: total, animated: false });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      ref.current?.scrollTo({ x: middle, animated: false });
    }, 10);

    return () => clearTimeout(timer);
  }, [middle]);

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC" }, // ✅ Background follows theme
      ]}
    >
      {/* 🍔 HEADER WITH MENU BUTTON */}
      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => navigation.openDrawer()} // 👈 Opens the sidebar
            style={styles.menuButton}
          >
            <Ionicons name="menu" size={32} color="#6366F1" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Ionicons
              name="person-circle"
              size={32}
              color={isDarkMode ? "#94A3B8" : "#475569"}
            />
          </TouchableOpacity>
        </View>

        <Text
          style={[styles.title, { color: isDarkMode ? "#fff" : "#0F172A" }]}
        >
          Hello, Darshan 👋
        </Text>
        <Text style={styles.subtitle}>Track your money smarter</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ScrollView
          ref={ref}
          horizontal
          pagingEnabled
          snapToInterval={SNAP}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          style={{ marginTop: 20 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {LOOP.map((item, i) => (
            <View
              key={i}
              style={[styles.card, { backgroundColor: item.color }]}
            >
              <Text style={styles.cardTitle}>{item.title}</Text>
              <View style={{ flex: 1 }} />
              <Text style={styles.amount}>{item.amount}</Text>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.transactionCard,
            { backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" }, // ✅ Card follows theme
          ]}
          onPress={() => navigation.navigate("Transactions")}
        >
          <Text
            style={[
              styles.sectionTitle,
              { color: isDarkMode ? "#fff" : "#0F172A" },
            ]}
          >
            Recent Transactions
          </Text>

          {transactions.length === 0 ? (
            <Text
              style={{
                color: "#94A3B8",
                textAlign: "center",
                marginVertical: 20,
              }}
            >
              No transactions yet. Tap + to start!
            </Text>
          ) : (
            transactions.slice(0, 5).map((item) => (
              <View key={item.id} style={styles.transactionItem}>
                <Text
                  style={[
                    styles.transactionText,
                    { color: isDarkMode ? "#CBD5F5" : "#475569" },
                  ]}
                >
                  {item.category}
                </Text>

                <Text
                  style={
                    item.type === "Income" ? styles.income : styles.expense
                  }
                >
                  {item.type === "Income" ? "+" : "-"}₹
                  {Math.abs(item.amount).toLocaleString()}
                </Text>
              </View>
            ))
          )}

          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>

        <View style={{ height: 100 }} />
      </ScrollView>

      <FAB
        icon="plus"
        style={styles.fab}
        color="#fff"
        onPress={() => navigation.navigate("AddTransaction")}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  menuButton: {
    marginLeft: -5,
    padding: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#94A3B8",
    marginTop: 5,
  },
  card: {
    width: CARD_WIDTH - 40,
    borderRadius: 24,
    padding: 30,
    marginHorizontal: 20,
    justifyContent: "space-evenly",
    height: 180,
  },
  cardTitle: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 18,
    fontWeight: "600",
  },
  amount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
  },
  fab: {
    position: "absolute",
    bottom: 30,
    borderRadius: 100,
    backgroundColor: "#6366F1",
    alignSelf: "center",
  },
  transactionCard: {
    margin: 20,
    borderRadius: 20,
    padding: 20,
    // Added shadow for light mode visibility
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  transactionText: {
    fontSize: 16,
  },
  expense: {
    color: "#EF4444",
    fontWeight: "bold",
  },
  income: {
    color: "#10B981",
    fontWeight: "bold",
  },
  viewAll: {
    marginTop: 15,
    color: "#6366F1",
    fontWeight: "600",
    textAlign: "center",
  },
});
