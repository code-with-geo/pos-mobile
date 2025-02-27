import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const Buttons = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      disabled={isLoading}
      className={`bg-[#3674B5] p-3 items-center justify-center rounded-xl hover:bg-[#578FCA]  ${containerStyles} ${
        isLoading ? "opacity-50" : ""
      }`}
    >
      <Text className={`text-base color-white`}>{title}</Text>{" "}
      {/* Apply custom text styles */}
    </TouchableOpacity>
  );
};

export default Buttons;
