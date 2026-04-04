import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../context/FinanceContext";

export default function AddTransactionScreen({ route, navigation }: any) {
  const { addTransaction, updateTransaction, isDarkMode } = useTransactions();

  // ✅ Check if we are editing an existing item
  const editItem = route.params?.editItem;

  const [amount, setAmount] = useState(
    editItem ? editItem.amount.toString() : "",
  );
  const [category, setCategory] = useState(editItem ? editItem.category : "");
  const [type, setType] = useState(editItem ? editItem.type : "Expense");

  const handleSave = () => {
    if (!amount || !category) {
      Alert.alert("Hold on!", "Please enter both an amount and a category.");
      return;
    }

    if (editItem) {
      updateTransaction(editItem.id, {
        amount: Number(amount),
        category,
        type: type as any,
      });
    } else {
      addTransaction(Number(amount), category, type as any);
    }
    navigation.goBack();
  };

  const bgColor = isDarkMode ? "#0F172A" : "#F8FAFC";
  const inputBg = isDarkMode ? "#1E293B" : "#FFFFFF";
  const textColor = isDarkMode ? "#FFFFFF" : "#0F172A";

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={[styles.header, { color: textColor }]}>
          {editItem ? "Edit Transaction" : "Add Transaction"}
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Amount</Text>
          <View
            style={[
              styles.amountWrapper,
              { borderBottomColor: isDarkMode ? "#6366F1" : "#4F46E5" },
            ]}
          >
            <Text style={styles.currencySymbol}>₹</Text>
            <TextInput
              style={[styles.amountInput, { color: textColor }]}
              placeholder="0"
              placeholderTextColor="#475569"
              keyboardType="numeric"
              onChangeText={setAmount}
              value={amount}
              autoFocus={!editItem}
            />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Transaction Type</Text>
          <View style={[styles.toggleContainer, { backgroundColor: inputBg }]}>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                type === "Income" && styles.incomeActive,
              ]}
              onPress={() => setType("Income")}
            >
              <Text
                style={[
                  styles.toggleText,
                  type === "Income" && styles.activeText,
                ]}
              >
                Income
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleBtn,
                type === "Expense" && styles.expenseActive,
              ]}
              onPress={() => setType("Expense")}
            >
              <Text
                style={[
                  styles.toggleText,
                  type === "Expense" && styles.activeText,
                ]}
              >
                Expense
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Category</Text>
          <TextInput
            style={[
              styles.categoryInput,
              { backgroundColor: inputBg, color: textColor },
            ]}
            placeholder="e.g. Rent, Food"
            placeholderTextColor="#475569"
            onChangeText={setCategory}
            value={category}
          />
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.mainButton} onPress={handleSave}>
            <Text style={styles.buttonText}>
              {editItem ? "Update" : "Save"} Transaction
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.cancelButton}
          >
            <Text style={{ color: "#94A3B8", fontWeight: "bold" }}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 24, justifyContent: "center" },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 30 },
  label: {
    color: "#94A3B8",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 10,
  },
  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    paddingBottom: 10,
  },
  currencySymbol: {
    color: "#6366F1",
    fontSize: 40,
    fontWeight: "bold",
    marginRight: 10,
  },
  amountInput: { fontSize: 50, fontWeight: "bold", minWidth: 100 },
  toggleContainer: { flexDirection: "row", borderRadius: 12, padding: 4 },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderRadius: 10,
  },
  incomeActive: { backgroundColor: "#10B981" },
  expenseActive: { backgroundColor: "#EF4444" },
  toggleText: { color: "#94A3B8", fontWeight: "600" },
  activeText: { color: "white" },
  categoryInput: { fontSize: 18, borderRadius: 12, padding: 16 },
  buttonContainer: { marginTop: 20 },
  mainButton: {
    backgroundColor: "#6366F1",
    paddingVertical: 18,
    borderRadius: 16,
    alignItems: "center",
    elevation: 4,
  },
  cancelButton: { marginTop: 20, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
