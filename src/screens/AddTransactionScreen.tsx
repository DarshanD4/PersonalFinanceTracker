import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTransactions } from "../context/FinanceContext";

export default function AddTransactionScreen({ navigation }: any) {
  const { addTransaction } = useTransactions();
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("Expense"); // Default to Expense

  const handleSave = () => {
    // ⚠️ VALIDATION: Don't let them save empty data
    if (!amount || !category) {
      Alert.alert("Hold on!", "Please enter both an amount and a category.");
      return;
    }

    addTransaction(Number(amount), category, type as "Income" | "Expense");
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.content}>
          <Text style={styles.header}>Add Transaction</Text>
          {/* AMOUNT INPUT */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Amount</Text>
            <View style={styles.amountWrapper}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                placeholder="0"
                placeholderTextColor="#475569"
                keyboardType="numeric"
                onChangeText={setAmount}
                value={amount}
                autoFocus={true}
              />
            </View>
          </View>
          {/* transaction type*/}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Transaction Type</Text>
            <View style={styles.toggleContainer}>
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
          {/* CATEGORY INPUT */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Category</Text>
            <TextInput
              style={styles.categoryInput}
              placeholder="e.g. Shopping, Rent, Food"
              placeholderTextColor="#475569"
              onChangeText={setCategory}
              value={category}
            />
          </View>
          {/* BUTTONS */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.mainButton, { backgroundColor: "#10B981" }]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Save Transaction</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={[styles.buttonText, { color: "#94A3B8" }]}>
                Cancel
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0F172A" },
  content: { padding: 24, flex: 1, justifyContent: "center" },
  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
  },
  inputGroup: { marginBottom: 30 },
  label: {
    color: "#94A3B8",
    fontSize: 14,
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  amountWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#6366F1",
    paddingBottom: 10,
  },
  currencySymbol: {
    color: "#6366F1",
    fontSize: 40,
    fontWeight: "bold",
    marginRight: 10,
  },
  amountInput: {
    color: "white",
    fontSize: 50,
    fontWeight: "bold",
    minWidth: 100,
  },

  toggleContainer: {
    flexDirection: "row",
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 4,
  },
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

  categoryInput: {
    backgroundColor: "#1E293B",
    color: "white",
    fontSize: 18,
    borderRadius: 12,
    padding: 16,
  },

  buttonContainer: { marginTop: 20 },
  mainButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 12,
    elevation: 4,
  },
  cancelButton: { paddingVertical: 16, alignItems: "center" },
  buttonText: { color: "white", fontSize: 18, fontWeight: "bold" },
});
