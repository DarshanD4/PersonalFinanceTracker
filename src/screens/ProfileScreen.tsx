import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../context/FinanceContext";
import { Ionicons } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }: any) {
  const { transactions, totalBalance, monthlyGoal, clearAllData, isDarkMode } =
    useTransactions();

  const handleReset = () => {
    Alert.alert(
      "Reset App?",
      "This will permanently delete all your transactions. This cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset Everything",
          style: "destructive",
          onPress: clearAllData,
        },
      ],
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC" },
      ]}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {/* 👱 USER HEADER */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person-circle" size={100} color="#6366F1" />
          </View>
          <Text
            style={[
              styles.userName,
              { color: isDarkMode ? "#fff" : "#0F172A" },
            ]}
          >
            Darshan
          </Text>
          <Text style={styles.userEmail}>darshan@flowmoney.app</Text>
        </View>

        {/* 📊 STATS OVERVIEW */}
        <View style={styles.statsRow}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>{transactions.length}</Text>
            <Text style={styles.statLabel}>Entries</Text>
          </View>
          <View
            style={[
              styles.statBox,
              {
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderColor: "#334155",
              },
            ]}
          >
            <Text style={styles.statValue}>
              ₹{(totalBalance / 1000).toFixed(1)}k
            </Text>
            <Text style={styles.statLabel}>Net Worth</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>
              ₹{(monthlyGoal / 1000).toFixed(0)}k
            </Text>
            <Text style={styles.statLabel}>Goal</Text>
          </View>
        </View>

        {/* ⚙️ SETTINGS LIST */}
        <View style={styles.settingsSection}>
          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="notifications-outline"
                size={22}
                color="#94A3B8"
              />
              <Text
                style={[
                  styles.settingText,
                  { color: isDarkMode ? "#fff" : "#0F172A" },
                ]}
              >
                Reminders
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <View style={styles.settingLeft}>
              <Ionicons
                name="shield-checkmark-outline"
                size={22}
                color="#94A3B8"
              />
              <Text
                style={[
                  styles.settingText,
                  { color: isDarkMode ? "#fff" : "#0F172A" },
                ]}
              >
                Privacy Security
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.settingItem}
            onPress={() => navigation.navigate("Insights")}
          >
            <View style={styles.settingLeft}>
              <Ionicons name="download-outline" size={22} color="#94A3B8" />
              <Text
                style={[
                  styles.settingText,
                  { color: isDarkMode ? "#fff" : "#0F172A" },
                ]}
              >
                Export CSV Data
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#475569" />
          </TouchableOpacity>

          {/* 🧨 DANGER ZONE */}
          <TouchableOpacity
            style={[styles.settingItem, { marginTop: 40 }]}
            onPress={handleReset}
          >
            <View style={styles.settingLeft}>
              <Ionicons
                name="refresh-circle-outline"
                size={22}
                color="#EF4444"
              />
              <Text style={[styles.settingText, { color: "#EF4444" }]}>
                Reset All Data
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { paddingBottom: 40 },
  profileHeader: { alignItems: "center", marginTop: 40, marginBottom: 30 },
  avatarContainer: { marginBottom: 15 },
  userName: { fontSize: 24, fontWeight: "bold" },
  userEmail: { color: "#94A3B8", fontSize: 14, marginTop: 4 },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
    paddingHorizontal: 20,
  },
  statBox: { flex: 1, alignItems: "center" },
  statValue: { color: "#6366F1", fontSize: 18, fontWeight: "bold" },
  statLabel: {
    color: "#94A3B8",
    fontSize: 12,
    marginTop: 4,
    textTransform: "uppercase",
  },

  settingsSection: { marginTop: 20, paddingHorizontal: 20 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(148, 163, 184, 0.1)",
  },
  settingLeft: { flexDirection: "row", alignItems: "center" },
  settingText: { marginLeft: 15, fontSize: 16, fontWeight: "500" },
});
