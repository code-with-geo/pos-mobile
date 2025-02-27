import { View, Text, FlatList } from "react-native";
import React, { useState } from "react";

const initialProducts = [
  {
    id: "1",
    productName: "Apple",
    productDescription: "Fresh Red Apple",
    productPrice: 2,
    quantitySold: 15,
  },
  {
    id: "2",
    productName: "Banana",
    productDescription: "Organic Bananas",
    productPrice: 1,
    quantitySold: 25,
  },
  {
    id: "3",
    productName: "Orange",
    productDescription: "Juicy Oranges",
    productPrice: 1.5,
    quantitySold: 20,
  },
  {
    id: "4",
    productName: "Grapes",
    productDescription: "Sweet Purple Grapes",
    productPrice: 3,
    quantitySold: 10,
  },
  {
    id: "5",
    productName: "Watermelon",
    productDescription: "Large Watermelon",
    productPrice: 5,
    quantitySold: 5,
  },
];

const Home = () => {
  const totalSales = initialProducts.reduce(
    (sum, product) => sum + product.productPrice * product.quantitySold,
    0
  );
  const totalTransactions = initialProducts.reduce(
    (sum, product) => sum + product.quantitySold,
    0
  );
  const mostBoughtProduct = initialProducts.reduce((prev, current) =>
    prev.quantitySold > current.quantitySold ? prev : current
  );

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Dashboard</Text>

      {/* Sales Widget */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-semibold">Total Sales</Text>
        <Text className="text-2xl font-bold text-green-600">
          ₱{totalSales.toFixed(2)}
        </Text>
      </View>

      {/* Transactions Widget */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-semibold">Total Transactions</Text>
        <Text className="text-2xl font-bold text-blue-600">
          {totalTransactions}
        </Text>
      </View>

      {/* Most Bought Product Widget */}
      <View className="bg-white p-6 rounded-lg shadow-md mb-4">
        <Text className="text-lg font-semibold">Most Bought Product</Text>
        <Text className="text-xl font-bold text-purple-600">
          {mostBoughtProduct.productName} ({mostBoughtProduct.quantitySold}{" "}
          sold)
        </Text>
      </View>

      {/* Product Sales List */}
      <Text className="text-lg font-semibold mb-2">Product Sales</Text>
      <FlatList
        data={initialProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-md shadow-md mb-3">
            <Text className="text-xl font-bold">{item.productName}</Text>
            <Text className="text-gray-500">{item.productDescription}</Text>
            <Text className="text-lg font-semibold mt-1 text-green-600">
              ₱{item.productPrice.toFixed(2)}
            </Text>
            <Text className="text-sm mt-1">
              Quantity Sold: {item.quantitySold}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Home;
