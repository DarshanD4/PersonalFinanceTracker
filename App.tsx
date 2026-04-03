import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// ✅ INTERNAL IMPORTS
import HomeScreen from "./src/screens/HomeScreen";
import TransactionScreen from "./src/screens/TransactionScreen";
import InsightsScreen from "./src/screens/InsightsScreen";
import AddTransactionScreen from "./src/screens/AddTransactionScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import CustomDrawer from "./src/components/CustomDrawer";
import {
  TransactionProvider,
  useTransactions,
} from "./src/context/FinanceContext";
import { RootTabParamList } from "./src/types/navigation";

// ✅ NAVIGATORS INITIALIZATION
const Tab = createBottomTabNavigator<RootTabParamList>();
const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

// BOTTOM TABS
function TabNavigator() {
  const { isDarkMode } = useTransactions();

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#1E293B" : "#FFFFFF",
          borderTopColor: isDarkMode ? "#334155" : "#E2E8F0",
        },
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: "#94A3B8",
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Insights"
        component={InsightsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="chart-bar"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//  MAIN DRAWER
function MainDrawer() {
  const { isDarkMode } = useTransactions();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: isDarkMode ? "#1E293B" : "#F8FAFC",
          width: 320,
        },
      }}
    >
      {/* ✅ We pass the FUNCTION TabNavigator here */}
      <Drawer.Screen
        name="MainTabs"
        component={TabNavigator}
        options={{ drawerLabel: "Dashboard" }}
      />
    </Drawer.Navigator>
  );
}

//  ROOT STACK
function RootStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="DrawerRoot" component={MainDrawer} />
      <Stack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ animation: "slide_from_bottom" }}
      />
      <Stack.Screen name="Transactions" component={TransactionScreen} />
    </Stack.Navigator>
  );
}

// 🚀 FINAL EXPORT
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <PaperProvider>
          <TransactionProvider>
            <NavigationContainer>
              <RootStack />
            </NavigationContainer>
          </TransactionProvider>
        </PaperProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
