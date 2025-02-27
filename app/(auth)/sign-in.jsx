import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Signin = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://pos-api-4l2n.onrender.com/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      if (response.ok) {
        await AsyncStorage.setItem("userToken", data.token);
        await AsyncStorage.setItem("userID", data.userID.toString());
        router.push("/home");
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      alert("An error occurred. Please try again." + error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[83vh] px-4 my-6">
          <Text className="text-lg font-semibold">Username</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mt-2"
            placeholder="Enter your username"
            value={form.username}
            onChangeText={(text) => setForm({ ...form, username: text })}
          />

          <Text className="text-lg font-semibold mt-4">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-md p-3 mt-2"
            placeholder="Enter your password"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => setForm({ ...form, password: text })}
          />

          <TouchableOpacity
            className="bg-[#3674B5] p-3 rounded-md mt-4"
            onPress={handleLogin}
            disabled={isSubmitting}
          >
            <Text className="text-white text-center font-semibold">
              {isSubmitting ? "Logging in..." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signin;
