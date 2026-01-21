import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { BaseToastProps } from "react-native-toast-message";

export const toastConfig = {
  success: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-neutral-800 px-5 py-4 rounded-xl mx-4 flex-row items-center gap-3">
      <Ionicons name="checkmark-circle" size={24} color={colors.green[500]} />
      <View className="flex-1">
        <Text className="text-white font-sans-medium text-lg">{text1}</Text>
        {text2 && <Text className="text-neutral-400">{text2}</Text>}
      </View>
    </View>
  ),
  error: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-neutral-800 px-5 py-4 rounded-xl mx-4 flex-row items-center gap-3">
      <Ionicons name="close-circle" size={24} color={colors.red[500]} />
      <View className="flex-1">
        <Text className="text-white font-sans-medium text-lg">{text1}</Text>
        {text2 && <Text className="text-neutral-400">{text2}</Text>}
      </View>
    </View>
  ),
  info: ({ text1, text2 }: BaseToastProps) => (
    <View className="bg-neutral-800 px-5 py-4 rounded-xl mx-4 flex-row items-center gap-3">
      <Ionicons name="alert-circle" size={24} color={colors.primary} />
      <View className="flex-1">
        <Text className="text-white font-sans-medium text-lg">{text1}</Text>
        {text2 && <Text className="text-neutral-400">{text2}</Text>}
      </View>
    </View>
  ),
};
