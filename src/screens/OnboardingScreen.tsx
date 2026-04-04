import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useTransactions } from "../context/FinanceContext";

export default function OnboardingScreen() {
  const { completeOnboarding } = useTransactions();
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [salary, setSalary] = useState("");

  const handleStart = () => {
    // Basic validation to ensure numbers are valid
    if (name && goal && salary) {
      completeOnboarding(name, Number(goal), Number(salary));
    } else {
      alert("Please fill in all fields to continue!");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>
        <Text style={styles.title}>FlowMoney ⚡</Text>
        <Text style={styles.subtitle}>Let's set up your wallet</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>FULL NAME</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Darshan"
            placeholderTextColor="#475569"
            onChangeText={setName}
            autoCapitalize="words"
          />

          <Text style={styles.label}>MONTHLY SALARY (₹)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 50000"
            placeholderTextColor="#475569"
            keyboardType="numeric"
            onChangeText={setSalary}
          />

          <Text style={styles.label}>MONTHLY SAVINGS GOAL (₹)</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 10000"
            placeholderTextColor="#475569"
            keyboardType="numeric"
            onChangeText={setGoal}
          />
        </View>

        <TouchableOpacity
          style={styles.button}
          activeOpacity={0.8}
          onPress={handleStart}
        >
          <Text style={styles.buttonText}>Start Tracking</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A", // Dark Slate
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#6366F1", // Indigo
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#94A3B8",
    textAlign: "center",
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 30,
  },
  label: {
    color: "#6366F1",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
    marginBottom: 8,
    marginTop: 20,
  },
  input: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 16,
    color: "#FFFFFF",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#334155",
  },
  button: {
    backgroundColor: "#6366F1",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    shadowColor: "#6366F1",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
