import React from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../context/FinanceContext";
import { BarChart, PieChart } from "react-native-gifted-charts";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function InsightsScreen() {
  const { transactions, isDarkMode } = useTransactions();

  // 1. Filter only expenses and group them
  const groupedData = transactions
    .filter((t) => t.type === "Expense")
    .reduce((acc: any, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});

  // 📈 2. Y-AXIS NORMALIZATION (FIXES THE 3.75k ISSUE)
  const maxGroupedValue = Math.max(
    ...(Object.values(groupedData) as number[]),
    1000,
  );
  const chartMaxValue = Math.ceil(maxGroupedValue / 5000) * 5000;

  // 3. Format for Bar Chart
  const barData = Object.keys(groupedData).map((key) => ({
    value: groupedData[key],
    label: key.length > 5 ? key.substring(0, 4) + "." : key,
    frontColor: "#6366F1",
    topLabelComponent: () => (
      <Text
        style={{
          color: isDarkMode ? "white" : "#0F172A",
          fontSize: 10,
          marginBottom: 4,
          fontWeight: "bold",
        }}
      >
        ₹{groupedData[key]}
      </Text>
    ),
  }));

  // 4. Format for Pie Chart
  const pieData = Object.keys(groupedData).map((key, index) => ({
    value: groupedData[key],
    text: key,
    color: ["#6366F1", "#10B981", "#F59E0B", "#EF4444", "#8B5CF6"][index % 5],
  }));

  const topCategory =
    Object.keys(groupedData).length > 0
      ? Object.keys(groupedData).reduce((a, b) =>
          groupedData[a] > groupedData[b] ? a : b,
        )
      : "No Data";

  const textColor = isDarkMode ? "#FFFFFF" : "#0F172A";
  const cardBg = isDarkMode ? "#1E293B" : "#FFFFFF";

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC" },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      >
        <Text style={[styles.title, { color: textColor }]}>Insights</Text>

        <View
          style={[
            styles.smartCard,
            {
              backgroundColor: isDarkMode
                ? "rgba(99, 102, 241, 0.1)"
                : "#E0E7FF",
            },
          ]}
        >
          <Ionicons name="trending-down" size={24} color="#6366F1" />
          <View style={{ marginLeft: 12, flex: 1 }}>
            <Text style={[styles.smartTitle, { color: textColor }]}>
              Top Spending
            </Text>
            <Text style={{ color: isDarkMode ? "#94A3B8" : "#475569" }}>
              Biggest expense:{" "}
              <Text style={{ fontWeight: "bold", color: "#6366F1" }}>
                {topCategory}
              </Text>
            </Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Category Totals
        </Text>
        <View style={[styles.chartContainer, { backgroundColor: cardBg }]}>
          {barData.length > 0 ? (
            <BarChart
              data={barData}
              barWidth={45}
              maxValue={chartMaxValue}
              noOfSections={3}
              stepValue={chartMaxValue / 3}
              barBorderRadius={8}
              frontColor="#6366F1"
              yAxisThickness={0}
              xAxisThickness={0}
              hideRules={false}
              rulesColor={
                isDarkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"
              }
              yAxisTextStyle={{ color: "#94A3B8", fontSize: 10 }}
              formatYLabel={(label) => `₹${Number(label) / 1000}k`}
              width={width - 110}
            />
          ) : (
            <Text style={{ color: "#94A3B8" }}>No expenses to analyze.</Text>
          )}
        </View>

        <Text style={[styles.sectionTitle, { color: textColor }]}>
          Breakdown (%)
        </Text>
        <View style={[styles.chartContainer, { backgroundColor: cardBg }]}>
          {pieData.length > 0 ? (
            <View style={styles.pieRow}>
              <PieChart
                data={pieData}
                donut
                radius={70}
                innerRadius={55}
                innerCircleColor={cardBg}
                centerLabelComponent={() => (
                  <Text style={{ color: textColor, fontWeight: "bold" }}>
                    {pieData.length} Cats
                  </Text>
                )}
              />
              <View style={styles.legend}>
                {pieData.map((item, i) => (
                  <View key={i} style={styles.legendItem}>
                    <View
                      style={[styles.dot, { backgroundColor: item.color }]}
                    />
                    <Text
                      style={[
                        styles.legendText,
                        { color: isDarkMode ? "#CBD5F5" : "#475569" },
                      ]}
                    >
                      {item.text}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          ) : (
            <Text style={{ color: "#94A3B8" }}>No data yet.</Text>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: "bold", marginVertical: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    marginBottom: 15,
  },
  smartCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    marginBottom: 10,
  },
  smartTitle: { fontSize: 16, fontWeight: "bold" },
  chartContainer: {
    padding: 20,
    borderRadius: 24,
    alignItems: "center",
    elevation: 2,
  },
  pieRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  legend: { marginLeft: 15 },
  legendItem: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  dot: { width: 12, height: 12, borderRadius: 6, marginRight: 10 },
  legendText: { fontSize: 13, fontWeight: "500" },
});
