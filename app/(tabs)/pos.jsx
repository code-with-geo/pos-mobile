import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";

const dummyProducts = [
  { id: 1, name: "Apple", price: 2 },
  { id: 2, name: "Banana", price: 1 },
  { id: 3, name: "Orange", price: 1.5 },
  { id: 4, name: "Grapes", price: 3 },
  { id: 5, name: "Watermelon", price: 5 },
  { id: 6, name: "Mango", price: 2.5 },
  { id: 7, name: "Pineapple", price: 4 },
  { id: 8, name: "Strawberry", price: 3.5 },
  { id: 9, name: "Cherry", price: 4.5 },
  { id: 10, name: "Blueberry", price: 5 },
];

const POS = () => {
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const router = useRouter();

  // Filter products based on search input
  const filteredProducts = dummyProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  // Add item to cart
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prevCart, { ...product, qty: 1 }];
    });
  };

  // Remove item from cart
  const removeFromCart = (product) => {
    setCart((prevCart) => {
      return prevCart
        .map((item) =>
          item.id === product.id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0);
    });
  };

  // Calculate total price
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <View className="flex-1 p-4 bg-gray-100">
      {/* Search Bar */}
      <TextInput
        className="bg-white p-3 rounded-md mb-4 shadow"
        placeholder="Search product..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Product List */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="bg-white p-4 mb-2 rounded-md shadow flex-row justify-between"
            onPress={() => addToCart(item)}
          >
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-500">₱{item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Cart Section */}
      <View className="bg-white p-4 rounded-md shadow mt-4">
        <Text className="text-xl font-semibold mb-2">Cart</Text>
        {cart.length === 0 ? (
          <Text className="text-gray-500">No items in cart</Text>
        ) : (
          cart.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between py-2 border-b border-gray-200"
            >
              <Text className="text-lg">
                {item.name} x {item.qty}
              </Text>
              <View className="flex-row items-center gap-2">
                <TouchableOpacity
                  className="bg-red-500 px-2 py-1 rounded-md"
                  onPress={() => removeFromCart(item)}
                >
                  <Text className="text-white font-bold">-</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-green-500 px-2 py-1 rounded-md"
                  onPress={() => addToCart(item)}
                >
                  <Text className="text-white font-bold">+</Text>
                </TouchableOpacity>
                <Text className="text-gray-600 ml-2">
                  ${(item.price * item.qty).toFixed(2)}
                </Text>
              </View>
            </View>
          ))
        )}

        <Text className="text-lg font-semibold mt-3">
          Total: ${total.toFixed(2)}
        </Text>

        {/* Proceed to Payment Button */}
        {cart.length > 0 && (
          <TouchableOpacity
            className="bg-[#3674B5] p-3 rounded-md mt-4"
            onPress={() => {
              router.push("/payments");
            }}
          >
            <Text className="text-white text-center font-semibold">
              Proceed to Payment
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default POS;
