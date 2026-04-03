import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Switch } from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Calendar } from "react-native-calendars";
import { useTransactions } from "../context/FinanceContext";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const { monthlyGoal, setMonthlyGoal, isDarkMode, toggleTheme, totalBalance } =
    useTransactions();

  // ✅ LOGIC: Start calendar from today (Install Date)
  const [installDate] = useState(new Date().toISOString().split("T")[0]);

  // ✅ LOGIC: Safe Goal Percentage
  const goalPercent =
    monthlyGoal > 0 ? Math.min((totalBalance / monthlyGoal) * 100, 100) : 0;

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: isDarkMode ? "#1E293B" : "#F8FAFC" }}
      contentContainerStyle={{ paddingBottom: 30 }}
    >
      <View style={styles.drawerHeader}>
        <Text
          style={[styles.brand, { color: isDarkMode ? "#6366F1" : "#4F46E5" }]}
        >
          FlowMoney ⚡
        </Text>
        <Text style={styles.user}>Darshan's Wallet</Text>
      </View>

      {/* 🗓️ SPENDING CALENDAR (SINGLE MONTH STRATEGY) */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Calendar</Text>
        <Calendar
          hideExtraDays={true}
          enableSwipeMonths={true}
          showSixWeeks={true}
          firstDay={1}
          theme={{
            calendarBackground: "transparent",

            // ✅ THE HEADER (MONTH/YEAR) - MUST BE DARK IN LIGHT MODE
            monthTextColor: isDarkMode ? "#FFFFFF" : "#1E293B",
            textMonthFontSize: 18,
            textMonthFontWeight: "bold",

            // ✅ THE WEEKDAYS (Mon, Tue, Wed...)
            textSectionTitleColor: "#6366F1", // Keep this purple/indigo for flair

            // ✅ THE DAYS (1, 2, 3...)
            dayTextColor: isDarkMode ? "#FFFFFF" : "#1E293B", // Deep navy for light mode

            // ✅ TODAY'S DATE
            todayTextColor: "#10B981",
            todayButtonFontWeight: "bold",

            // ✅ DISABLED DAYS (Before install date)
            textDisabledColor: isDarkMode ? "#475569" : "#CBD5E1",

            // ✅ ARROWS
            arrowColor: "#6366F1",
          }}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === "left" ? "chevron-back" : "chevron-forward"}
              size={24}
              color="#6366F1"
            />
          )}
          minDate={installDate}
          onDayPress={(day: any) => console.log("Selected:", day.dateString)}
        />
      </View>

      {/* 🎯 GOAL SETTING & PROGRESS */}
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Savings Goal</Text>
          <TextInput
            style={[
              styles.goalInput,
              { color: isDarkMode ? "#fff" : "#0F172A" },
            ]}
            value={monthlyGoal.toString()}
            keyboardType="numeric"
            onChangeText={(text) => setMonthlyGoal(Number(text) || 0)}
          />
        </View>

        <View style={styles.progressBg}>
          <View style={[styles.progressFill, { width: `${goalPercent}%` }]} />
        </View>
        <Text style={styles.progressLabel}>
          {goalPercent.toFixed(0)}% of goal reached
        </Text>
      </View>

      {/* 🌗 THEME TOGGLE */}
      <View
        style={[
          styles.section,
          styles.row,
          {
            borderTopWidth: 1,
            borderColor: isDarkMode ? "#334155" : "#E2E8F0",
            marginTop: 10,
          },
        ]}
      >
        <View style={styles.row}>
          <Ionicons
            name={isDarkMode ? "moon" : "sunny"}
            size={20}
            color="#6366F1"
          />
          <Text
            style={[
              styles.modeText,
              { color: isDarkMode ? "#fff" : "#0F172A" },
            ]}
          >
            Dark Mode
          </Text>
        </View>
        <Switch
          value={isDarkMode}
          onValueChange={toggleTheme}
          trackColor={{ false: "#94A3B8", true: "#6366F1" }}
        />
      </View>

      {/* 🔗 NAVIGATION LINKS */}
      <View style={{ marginTop: 15 }}>
        <DrawerItemList
          {...props}
          activeTintColor="#6366F1"
          inactiveTintColor={isDarkMode ? "#94A3B8" : "#475569"}
        />
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { padding: 20, marginBottom: 10 },
  brand: { fontSize: 24, fontWeight: "bold" },
  user: { color: "#94A3B8", fontSize: 14, marginTop: 4 },
  section: { padding: 20 },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  goalInput: {
    fontSize: 18,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#6366F1",
    padding: 4,
    minWidth: 80,
    textAlign: "right",
  },
  progressBg: {
    height: 8,
    backgroundColor: "#334155",
    borderRadius: 4,
    marginTop: 15,
    overflow: "hidden",
  },
  progressFill: { height: "100%", backgroundColor: "#10B981" },
  progressLabel: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 6,
    textAlign: "right",
  },
  modeText: { marginLeft: 10, fontSize: 16, fontWeight: "500" },
});
