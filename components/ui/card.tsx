import { LinearGradient } from "expo-linear-gradient";
import { View } from "react-native";

interface CardProps {
  children: React.ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <View className="rounded-2xl overflow-hidden border border-white/20">
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.10)", "rgba(255, 255, 255, 0.05)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{ paddingHorizontal: 20, paddingVertical: 20 }}
      >
        {children}
      </LinearGradient>
    </View>
  );
}
