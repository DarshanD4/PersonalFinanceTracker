import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../context/FinanceContext";
import { LineChart, PieChart } from "react-native-gifted-charts"; // 📈 High-end charts

const { width } = Dimensions.get("window");

export default function InsightsScreen() {
  const { transactions } = useTransactions();

  // 💰 BASIC MATH
  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const savings = income - expense;

  // 🧠 STEP 2 — SAVINGS RATE (Safely handling 0 income)
  const savingsRate = income > 0 ? ((savings / income) * 100).toFixed(1) : "0";

  // 📝 EXPENSE GROUPING (For Pie Chart)
  // We reduce the transactions into an object { Food: 500, Rent: 1000 }
  const categoryData = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  const pieData = Object.keys(categoryData).map((key, index) => ({
    value: categoryData[key],
    text: key,
    color: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5],
  }));

  // 📈 LINE CHART DATA
  const lineData = transactions
    .slice(0, 6)
    .reverse()
    .map((t) => ({ value: t.amount, label: t.category.substring(0, 3) }));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={styles.title}>Insights</Text>

        {/* 🏆 SAVINGS RATE CARD */}
        <View style={styles.mainCard}>
          <Text style={styles.mainLabel}>Savings Rate</Text>
          <Text
            style={[
              styles.mainValue,
              { color: Number(savingsRate) > 20 ? "#10B981" : "#F59E0B" },
            ]}
          >
            {savingsRate}%
          </Text>
          <Text style={styles.hintText}>
            {Number(savingsRate) > 0
              ? `You've kept ${savingsRate}% of what you earned! `
              : "Start tracking to see your growth."}
          </Text>
        </View>

        {/* 📈 SPENDING TREND (Line Chart) */}
        <Text style={styles.sectionTitle}>Spending Trend</Text>
        <View style={styles.chartContainer}>
          {lineData.length > 1 ? (
            <LineChart
              data={lineData}
              color="#6366F1"
              thickness={3}
              dataPointsColor="#6366F1"
              areaChart
              startFillColor="rgba(99, 102, 241, 0.3)"
              endFillColor="rgba(99, 102, 241, 0.01)"
              initialSpacing={20}
              noOfSections={3}
              yAxisTextStyle={{ color: "#94A3B8" }}
              xAxisLabelTextStyle={{ color: "#94A3B8" }}
              hideRules
              width={width - 80}
            />
          ) : (
            <Text style={styles.noData}>
              Add more transactions to see trends.
            </Text>
          )}
        </View>

        {/* 🥧 EXPENSE BREAKDOWN (Pie Chart) */}
        <Text style={styles.sectionTitle}>Expense Breakdown</Text>
        <View style={styles.chartContainer}>
          {pieData.length > 0 ? (
            <View style={styles.pieRow}>
              <PieChart
                data={pieData}
                donut
                sectionAutoFocus
                radius={80}
                innerRadius={60}
                innerCircleColor={"#1E293B"}
              />
              <View style={styles.legend}>
                {pieData.map((item, i) => (
                  <View key={i} style={styles.legendItem}>
                    <View
                      style={[styles.dot, { backgroundColor: item.color }]}
                    />
                    <Text style={styles.legendText}>{item.text}</Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={styles.noData}>No expenses categorized yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A", paddingHorizontal: 20 },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 20,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },

  mainCard: {
    backgroundColor: "#1E293B",
    padding: 25,
    borderRadius: 24,
    alignItems: "center",
    elevation: 5,
  },
  mainLabel: { color: "#94A3B8", fontSize: 16, fontWeight: "600" },
  mainValue: { fontSize: 48, fontWeight: "bold", marginVertical: 10 },
  hintText: {
    color: "#CBD5F5",
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
  },

  chartContainer: {
    backgroundColor: "#1E293B",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
  },
  noData: { color: "#475569", marginVertical: 20 },

  pieRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  legend: { marginLeft: 10 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  dot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  legendText: { color: "#CBD5F5", fontSize: 12 },
});
