import React from "react";
import { Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function TransactionScreen() {
  return (
    <SafeAreaView style={styles.main}>
      <Text style={styles.text1}>This is the Transaction Screen</Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  text1: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  main: {
    backgroundColor: "#0F172A",
    flex: 1,
    padding: 20,
    alignContent: "center",
  },
});
