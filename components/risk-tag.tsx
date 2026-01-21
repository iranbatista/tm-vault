import { Text, View } from "react-native";

export type VaultRisk = "low" | "medium" | "high";

type RisksVariants = Record<VaultRisk, string>;

interface RiskTagInterface {
  risk: VaultRisk;
}

export function RiskTag({ risk }: RiskTagInterface) {
  const tagBaseStyles =
    "items-center justify-center rounded-full px-2 py-0.5 border";
  const tagVariantsStyles: RisksVariants = {
    high: "bg-red-500/20 border-red-500",
    medium: "bg-yellow-500/20 border-yellow-500",
    low: "bg-green-500/20 border-green-500",
  };

  const textBaseStyles = "text-sm";
  const textVariantsStyles: RisksVariants = {
    high: "text-red-500",
    medium: "text-yellow-500",
    low: "text-green-500",
  };

  const labelVariants: RisksVariants = {
    high: "HIGH RISK",
    medium: "MEDIUM RISK",
    low: "LOW RISK",
  };

  return (
    <View className={`${tagBaseStyles} ${tagVariantsStyles[risk]}`}>
      <Text className={`${textBaseStyles} ${textVariantsStyles[risk]}`}>
        {labelVariants[risk]}
      </Text>
    </View>
  );
}
