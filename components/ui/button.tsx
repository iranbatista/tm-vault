import { colors } from "@/constants/colors";
import { Ionicons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { Text, TouchableOpacity } from "react-native";

type IconName = ComponentProps<typeof Ionicons>["name"];

type Variant = "primary" | "secondary";

type VariantsObjects = Record<Variant, string>;

interface ButtonProps {
  label?: string;
  variant?: Variant;
  leftIcon?: IconName;
  rightIcon?: IconName;
  onPress?: () => void;
  className?: string;
  disabled?: boolean;
}

export function Button({
  label,
  variant = "primary",
  rightIcon,
  leftIcon,
  onPress,
  className,
  disabled = false,
}: ButtonProps) {
  const touchableDefaultStyles =
    "px-5 h-12 rounded-xl flex-row gap-1 items-center justify-center";
  const touchableVariantStyles: VariantsObjects = {
    primary: "bg-primary",
    secondary: "border border-primary",
  };

  const textBaseStyles = "font-sans-medium text-lg tracking-tight";
  const textVariantStyles: VariantsObjects = {
    primary: "text-neutral-950",
    secondary: "text-primary",
  };

  const iconColorVariants: VariantsObjects = {
    primary: colors.neutral[950],
    secondary: colors.primary,
  };

  return (
    <TouchableOpacity
      className={`${touchableDefaultStyles} ${touchableVariantStyles[variant]} ${className} ${disabled ? "opacity-50" : ""}`}
      activeOpacity={0.5}
      onPress={onPress}
      disabled={disabled}
    >
      {leftIcon && <Ionicons name={leftIcon} size={18} color={iconColorVariants[variant]} />}
      <Text className={`${textBaseStyles} ${textVariantStyles[variant]}`}>
        {label}
      </Text>
      {rightIcon && <Ionicons name={rightIcon} size={18} color={iconColorVariants[variant]} />}
    </TouchableOpacity>
  );
}
