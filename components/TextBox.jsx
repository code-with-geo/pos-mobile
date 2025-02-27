import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";

const TextBox = ({
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <View
        className={`border-2 w-full h-16 px-4 rounded-xl items-center flex-row ${
          isFocused ? "border-[#578FCA]" : "border-[#818C78]"
        }`}
      >
        <TextInput
          className="flex-1 text-black text-base"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === "Password" && !showPassword}
          onFocus={() => setIsFocused(true)} // Activate focus state
          onBlur={() => setIsFocused(false)} // Deactivate focus state
        />
        {title === "Password" && (
          <TouchableOpacity
            onPress={() => {
              setShowPassword(!showPassword);
            }}
          >
            <Image
              source={
                !showPassword
                  ? require("../assets/icons/eye.png")
                  : require("../assets/icons/eye-hide.png")
              }
              className="w-6 h-6"
              resizeMode="contain"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextBox;
