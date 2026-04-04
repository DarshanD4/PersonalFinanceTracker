import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Calendar } from "react-native-calendars";
import { useTransactions } from "../context/FinanceContext";
import { Ionicons } from "@expo/vector-icons";

export default function CustomDrawer(props: any) {
  const {
    monthlyGoal,
    setMonthlyGoal,
    isDarkMode,
    toggleTheme,
    transactions,
    clearAllData,
    userName,
  } = useTransactions();

  const [installDate] = useState(new Date().toISOString().split("T")[0]);

  const income = transactions
    .filter((t) => t.type === "Income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expense = transactions
    .filter((t) => t.type === "Expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const currentSavings = income - expense;
  const goalPercent =
    monthlyGoal > 0 ? Math.max((currentSavings / monthlyGoal) * 100, 0) : 0;

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
          FlowMoney
        </Text>
        <Text style={styles.user}>{userName}'s Wallet</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Activity Calendar</Text>
        <Calendar
          key={isDarkMode ? "dark-cal" : "light-cal"}
          hideExtraDays={true}
          theme={{
            calendarBackground: "transparent",
            monthTextColor: isDarkMode ? "#FFFFFF" : "#1E293B",
            textMonthFontSize: 18,
            textMonthFontWeight: "bold",
            dayTextColor: isDarkMode ? "#FFFFFF" : "#1E293B",
            todayTextColor: "#10B981",
            arrowColor: "#6366F1",
          }}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === "left" ? "chevron-back" : "chevron-forward"}
              size={24}
              color="#6366F1"
            />
          )}
        />
      </View>

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
          <View
            style={[
              styles.progressFill,
              {
                width: `${Math.min(goalPercent, 100)}%`,
                backgroundColor: goalPercent < 20 ? "#EF4444" : "#10B981",
              },
            ]}
          />
        </View>
        <Text style={styles.progressLabel}>
          {goalPercent.toFixed(0)}% of goal reached
        </Text>
      </View>

      <View
        style={[
          styles.section,
          styles.row,
          {
            borderTopWidth: 1,
            borderColor: isDarkMode ? "#334155" : "#E2E8F0",
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

      <DrawerItemList {...props} activeTintColor="#6366F1" />

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => {
          Alert.alert("Reset Session", "This will clear all data. Proceed?", [
            { text: "Cancel", style: "cancel" },
            {
              text: "Reset",
              style: "destructive",
              onPress: () => clearAllData(),
            },
          ]);
        }}
      >
        <Ionicons name="log-out-outline" size={20} color="#EF4444" />
        <Text style={styles.logoutText}>Reset & Switch Account</Text>
      </TouchableOpacity>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerHeader: { padding: 20 },
  brand: { fontSize: 24, fontWeight: "bold" },
  user: { color: "#94A3B8", fontSize: 14 },
  section: { padding: 20 },
  sectionTitle: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "bold",
    textTransform: "uppercase",
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
  progressFill: { height: "100%" },
  progressLabel: {
    color: "#94A3B8",
    fontSize: 11,
    marginTop: 6,
    textAlign: "right",
  },
  modeText: { marginLeft: 10, fontSize: 16, fontWeight: "500" },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 20,
    borderTopWidth: 1,
    borderColor: "#334155",
  },
  logoutText: {
    color: "#EF4444",
    marginLeft: 15,
    fontSize: 16,
    fontWeight: "600",
  },
});
