import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.neutral[500],
        tabBarStyle: {
          backgroundColor: colors.neutral[900],
          borderTopWidth: 0,
          paddingTop: 8,
          height: 80,
        },
        tabBarLabelStyle: {
          fontFamily: "Inter-Medium",
          fontSize: 12,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Vaults",
          tabBarIcon: ({ color }) => <Ionicons name="grid-outline" size={20} color={color} />,
        }}
      />
      <Tabs.Screen
        name="portfolio"
        options={{
          title: "Portfolio",
          tabBarIcon: ({ color }) => (
            <Ionicons name="wallet-outline" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
