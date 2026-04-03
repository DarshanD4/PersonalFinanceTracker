import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useTransactions } from "../context/FinanceContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Swipeable from "react-native-gesture-handler/Swipeable";

export default function TransactionsScreen({ navigation }: any) {
  const { transactions, deleteTransaction } = useTransactions();

  const renderRightActions = (id: string) => (
    <TouchableOpacity
      style={styles.deleteAction}
      onPress={() => deleteTransaction(id)}
    >
      <Ionicons name="trash" size={24} color="white" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>History</Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <View style={styles.transactionItem}>
              <View style={styles.leftContent}>
                <View
                  style={[
                    styles.iconBg,
                    {
                      backgroundColor:
                        item.type === "Income" ? "#065F46" : "#7F1D1D",
                    },
                  ]}
                >
                  <Ionicons
                    name={item.type === "Income" ? "arrow-down" : "arrow-up"}
                    size={20}
                    color="white"
                  />
                </View>
                <View>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <Text style={styles.dateText}>
                    {new Date(item.date).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <Text
                style={[
                  styles.amountText,
                  item.type === "Income" ? styles.income : styles.expense,
                ]}
              >
                {item.type === "Income" ? "+" : "-"}₹
                {Math.abs(item.amount).toLocaleString()}
              </Text>
            </View>
          </Swipeable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: { color: "white", fontSize: 20, fontWeight: "bold" },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1E293B",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#0F172A",
  },
  leftContent: { flexDirection: "row", alignItems: "center" },
  iconBg: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryText: { color: "white", fontSize: 16, fontWeight: "600" },
  dateText: { color: "#94A3B8", fontSize: 12 },
  amountText: { fontSize: 16, fontWeight: "bold" },
  income: { color: "#10B981" },
  expense: { color: "#EF4444" },
  deleteAction: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
  },
});
