import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const Payment = () => {
  const router = useRouter();
  const [receivedAmount, setReceivedAmount] = useState("");
  const totalAmount = 100; // Example total, replace with actual total

  // Calculate change
  const change = receivedAmount ? parseFloat(receivedAmount) - totalAmount : 0;

  // Print receipt function
  const printReceipt = () => {
    Alert.alert(
      "Receipt",
      `🧾 Payment Receipt 🧾\n\nTotal: ₱${totalAmount.toFixed(
        2
      )}\nReceived: ₱${parseFloat(receivedAmount).toFixed(
        2
      )}\nChange: ₱${change.toFixed(2)}`,
      [{ text: "OK", onPress: () => router.push("/pos") }]
    );
  };

  const handleFinishTransaction = () => {
    if (change < 0) {
      alert("Insufficient amount received!");
      return;
    }
    printReceipt(); // Show receipt before navigating
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-xl font-semibold mb-4">Cash Payment</Text>

      <Text className="text-lg font-semibold">
        Total: ₱{totalAmount.toFixed(2)}
      </Text>

      <TextInput
        className="bg-white p-3 rounded-md mt-3 shadow"
        placeholder="Enter received amount"
        keyboardType="numeric"
        value={receivedAmount}
        onChangeText={setReceivedAmount}
      />

      <Text className="text-lg font-semibold mt-3">
        Change: ₱{change > 0 ? change.toFixed(2) : "0.00"}
      </Text>

      <TouchableOpacity
        className="bg-[#3674B5] p-3 rounded-md mt-4"
        onPress={handleFinishTransaction}
      >
        <Text className="text-white text-center font-semibold">
          Finish Transaction
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Payment;
