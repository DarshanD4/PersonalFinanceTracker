import React, { useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useTransactions, Transaction } from "../context/FinanceContext";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

// ✅ V2 Imports
import ReanimatedSwipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";
import Reanimated, {
  useAnimatedStyle,
  interpolate,
  SharedValue,
} from "react-native-reanimated";

export default function TransactionsScreen({ navigation }: any) {
  const { transactions, deleteTransaction, isDarkMode } = useTransactions();

  // 🎯 THE REF MAP: This is the secret to fixing the "Sticky" row problem
  const swipeableRefs = useRef<Map<string, SwipeableMethods>>(new Map());

  const handleAction = (
    id: string,
    action: "delete" | "edit",
    item?: Transaction,
  ) => {
    // Close the row immediately for a smooth native feel
    const ref = swipeableRefs.current.get(id);
    if (ref) ref.close();

    if (action === "delete") {
      deleteTransaction(id);
    } else if (action === "edit" && item) {
      navigation.navigate("AddTransaction", { editItem: item });
    }
  };

  // 🟦 EDIT ACTION (Left Swipe)
  const renderLeftActions = (
    prog: SharedValue<number>,
    _drag: SharedValue<number>,
    item: Transaction,
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [
        { scale: interpolate(prog.value, [0, 1], [0.5, 1], "clamp") },
      ],
    }));

    return (
      <Reanimated.View
        style={[
          styles.actionBtn,
          { backgroundColor: "#6366F1" },
          styleAnimation,
        ]}
      >
        <TouchableOpacity
          style={styles.actionInner}
          onPress={() => handleAction(item.id, "edit", item)}
        >
          <Ionicons name="pencil" size={22} color="white" />
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  // 🟥 DELETE ACTION (Right Swipe)
  const renderRightActions = (
    prog: SharedValue<number>,
    _drag: SharedValue<number>,
    id: string,
  ) => {
    const styleAnimation = useAnimatedStyle(() => ({
      transform: [
        { scale: interpolate(prog.value, [0, 1], [0.5, 1], "clamp") },
      ],
    }));

    return (
      <Reanimated.View
        style={[
          styles.actionBtn,
          { backgroundColor: "#EF4444" },
          styleAnimation,
        ]}
      >
        <TouchableOpacity
          style={styles.actionInner}
          onPress={() => handleAction(id, "delete")}
        >
          <Ionicons name="trash" size={22} color="white" />
        </TouchableOpacity>
      </Reanimated.View>
    );
  };

  return (
    <SafeAreaView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#0F172A" : "#F8FAFC" },
      ]}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={24}
            color={isDarkMode ? "white" : "#1E293B"}
          />
        </TouchableOpacity>
        <Text
          style={[styles.title, { color: isDarkMode ? "white" : "#1E293B" }]}
        >
          History
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ReanimatedSwipeable
            // ✅ THE FIX: Explicitly cast the ref callback to satisfy TS
            ref={
              ((ref: SwipeableMethods | null) => {
                if (ref) {
                  swipeableRefs.current.set(item.id, ref);
                } else {
                  swipeableRefs.current.delete(item.id);
                }
              }) as any
            }
            friction={2}
            enableTrackpadTwoFingerGesture
            rightThreshold={40}
            leftThreshold={40}
            renderLeftActions={(p, d) => renderLeftActions(p, d, item)}
            renderRightActions={(p, d) => renderRightActions(p, d, item.id)}
          >
            <View
              style={[
                styles.transactionItem,
                { backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF" },
              ]}
            >
              <View style={styles.leftContent}>
                <View
                  style={[
                    styles.iconBg,
                    {
                      backgroundColor:
                        item.type === "Income" ? "#10B981" : "#EF4444",
                    },
                  ]}
                >
                  <Ionicons
                    name={item.type === "Income" ? "arrow-down" : "arrow-up"}
                    size={18}
                    color="white"
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.categoryText,
                      { color: isDarkMode ? "white" : "#1E293B" },
                    ]}
                  >
                    {item.category}
                  </Text>
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
                {item.type === "Income" ? "+" : "-"} ₹
                {item.amount.toLocaleString()}
              </Text>
            </View>
          </ReanimatedSwipeable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 20,
  },
  title: { fontSize: 20, fontWeight: "bold" },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.05)",
  },
  leftContent: { flexDirection: "row", alignItems: "center" },
  iconBg: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  categoryText: { fontSize: 16, fontWeight: "600" },
  dateText: { color: "#94A3B8", fontSize: 12 },
  amountText: { fontSize: 16, fontWeight: "bold" },
  income: { color: "#10B981" },
  expense: { color: "#EF4444" },
  actionBtn: { width: 80 },
  actionInner: { flex: 1, justifyContent: "center", alignItems: "center" },
});
