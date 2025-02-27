import React from "react";
import { Stack, SplashScreen } from "expo-router";
import "../styles/global.css";

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="payments/index" options={{ title: "Payment" }} />
      <Stack.Screen
        name="products/add-product"
        options={{ title: "Add Product" }}
      />
      {/*<Stack.Screen name="/search/[query]" options={{ headerShown: false }} />;*/}
    </Stack>
  );
};

export default RootLayout;
