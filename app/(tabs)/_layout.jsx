import { View, Text, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="items-center justify-center px-2 py-1 w-20">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`text-xs mt-1 text-center ${
          focused ? "font-psemibold" : "font-pregular"
        }`}
        style={{ color: color }}
        numberOfLines={1} // Ensure the text doesn't wrap
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Ensure the label is visible
        tabBarActiveTintColor: "09122C",
        tabBarInactiveTintColor: "#FFF",
        tabBarStyle: {
          backgroundColor: "#3674B5",
          borderTopColor: "#3674B5",
          tabBarStyle: { display: "none" },
          flexDirection: "row", // Arrange tabs horizontally
          paddingTop: 16, // Add padding to the top of the tab bar
          paddingBottom: 8, // Add padding to the bottom of the tab bar
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Home" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="pos"
        options={{
          title: "POS",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="POS" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Products" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="inventory"
        options={{
          title: "Inventory",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Inventory" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          icon: require("../../assets/icons/users.png"),
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} name="Users" focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
