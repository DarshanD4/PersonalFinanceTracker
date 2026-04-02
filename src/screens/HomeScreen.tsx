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

import { SafeAreaView } from "react-native-safe-area-context";
import { FAB } from "react-native-paper";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width;
//const CARD_WIDTH = width * 0.9;
const SNAP = CARD_WIDTH;

const DATA = [
  { title: "INCOME", amount: "₹20,000", color: "#6366F1" },
  { title: "TOTAL BALANCE", amount: "₹12,500", color: "#10B981" },
  { title: "EXPENSES", amount: "₹7,500", color: "#EF4444" },
];

const transactions = [
  { id: "1", title: "Swiggy", amount: -250 },
  { id: "2", title: "Swiggy", amount: -250 },
  { id: "3", title: "Swiggy", amount: -250 },
  { id: "4", title: "Swiggy", amount: -250 },
  { id: "5", title: "Salary", amount: +25000 },
  { id: "6", title: "Swiggy", amount: -250 },
  { id: "7", title: "Netflix", amount: -499 },
  { id: "8", title: "Amazon", amount: -1250 },
  { id: "9", title: "Freelance", amount: +5000 },
  { id: "10", title: "Salary", amount: +25000 },
];
const LOOP = [...DATA, ...DATA, ...DATA];

export default function HomeScreen({ navigation }: any) {
  const ref = useRef<ScrollView | null>(null);
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
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hello, Darshan 👋</Text>
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
          style={{ marginTop: 40 }}
          contentContainerStyle={{ paddingBottom: 20 }}
        >
          {/* this is for the looping of the card in the first part */}
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

        {/* this is the transaction card that i have kept for the recent usage */}
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.transactionCard}
          onPress={() => navigation.navigate("Transactions")}
        >
          <Text style={styles.sectionTitle}>Recent Transactions</Text>

          {transactions.slice(0, 5).map((item) => (
            <View key={item.id} style={styles.transactionItem}>
              <Text style={styles.transactionText}>{item.title}</Text>

              <Text style={item.amount > 0 ? styles.income : styles.expense}>
                {item.amount > 0 ? "+" : "-"}₹{Math.abs(item.amount)}
              </Text>
            </View>
          ))}

          <Text style={styles.viewAll}>View All →</Text>
        </TouchableOpacity>

        {/* Added some space at the bottom so the FAB doesn't block the last transaction */}
        <View style={{ height: 100 }} />
      </ScrollView>

      {/* this is the floating action button */}
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
    backgroundColor: "#0F172A",
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  title: {
    color: "#fff",
    fontSize: 32, // Adjusted from 50 to fit better on standard screens
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
    backgroundColor: "#1E293B",
    margin: 20,
    borderRadius: 20,
    padding: 20,
  },
  sectionTitle: {
    color: "#fff",
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
    color: "#CBD5F5",
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
