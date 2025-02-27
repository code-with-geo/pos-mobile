import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

const initialProducts = [
  {
    id: "1",
    productName: "Apple",
    productDescription: "Fresh Red Apple",
    productPrice: 2,
    isEnable: true,
    quantity: 10,
  },
  {
    id: "2",
    productName: "Banana",
    productDescription: "Organic Bananas",
    productPrice: 1,
    isEnable: true,
    quantity: 15,
  },
  {
    id: "3",
    productName: "Orange",
    productDescription: "Juicy Oranges",
    productPrice: 1.5,
    isEnable: true,
    quantity: 8,
  },
  {
    id: "4",
    productName: "Grapes",
    productDescription: "Sweet Purple Grapes",
    productPrice: 3,
    isEnable: true,
    quantity: 20,
  },
  {
    id: "5",
    productName: "Watermelon",
    productDescription: "Large Watermelon",
    productPrice: 5,
    isEnable: false,
    quantity: 5,
  },
];

const Inventory = () => {
  const [products, setProducts] = useState(initialProducts);

  const updateQuantity = (id, change) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: Math.max(0, product.quantity + change) }
          : product
      )
    );
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Inventory</Text>

      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-md shadow-md mb-3">
            <Text className="text-xl font-bold">{item.productName}</Text>
            <Text className="text-gray-500">{item.productDescription}</Text>
            <Text className="text-lg font-semibold mt-1 text-green-600">
              ₱{item.productPrice.toFixed(2)}
            </Text>
            <Text className="text-sm mt-1">
              Quantity: <Text className="font-bold">{item.quantity}</Text>
            </Text>
            <View className="mt-2">
              <TouchableOpacity
                className="bg-blue-500 p-3 rounded-md w-full mb-2"
                onPress={() => updateQuantity(item.id, 1)}
              >
                <Text className="text-white text-center">+ Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-red-500 p-3 rounded-md w-full"
                onPress={() => updateQuantity(item.id, -1)}
              >
                <Text className="text-white text-center">- Remove</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Inventory;
