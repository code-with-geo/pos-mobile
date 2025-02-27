import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Switch,
} from "react-native";
import React, { useState } from "react";

const initialProducts = [
  {
    id: "1",
    productName: "Apple",
    productDescription: "Fresh Red Apple",
    productPrice: 2,
    isEnable: true,
  },
  {
    id: "2",
    productName: "Banana",
    productDescription: "Organic Bananas",
    productPrice: 1,
    isEnable: true,
  },
  {
    id: "3",
    productName: "Orange",
    productDescription: "Juicy Oranges",
    productPrice: 1.5,
    isEnable: true,
  },
  {
    id: "4",
    productName: "Grapes",
    productDescription: "Sweet Purple Grapes",
    productPrice: 3,
    isEnable: true,
  },
  {
    id: "5",
    productName: "Watermelon",
    productDescription: "Large Watermelon",
    productPrice: 5,
    isEnable: false,
  },
];

const Products = () => {
  const [products, setProducts] = useState(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    productName: "",
    productDescription: "",
    productPrice: "",
    isEnable: true,
  });

  const handleAddProduct = () => {
    if (
      !newProduct.productName ||
      !newProduct.productDescription ||
      !newProduct.productPrice
    ) {
      alert("Please fill in all fields");
      return;
    }

    const newItem = {
      id: (products.length + 1).toString(),
      productName: newProduct.productName,
      productDescription: newProduct.productDescription,
      productPrice: parseFloat(newProduct.productPrice),
      isEnable: newProduct.isEnable,
    };

    setProducts([...products, newItem]);
    setIsModalVisible(false);
    setNewProduct({
      productName: "",
      productDescription: "",
      productPrice: "",
      isEnable: true,
    });
  };

  const handleRemoveProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <View className="flex-1 p-4 bg-gray-100">
      <Text className="text-2xl font-bold mb-4">Products</Text>

      <TextInput
        className="bg-white p-3 rounded-md mb-3 shadow"
        placeholder="Search Products..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        data={products.filter((product) =>
          product.productName.toLowerCase().includes(searchQuery.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View className="bg-white p-4 rounded-md shadow-md mb-3">
            <Text className="text-xl font-bold">{item.productName}</Text>
            <Text className="text-gray-500">{item.productDescription}</Text>
            <Text className="text-lg font-semibold mt-1 text-green-600">
              ₱{item.productPrice.toFixed(2)}
            </Text>
            <Text className="text-sm mt-1">
              Status:{" "}
              <Text
                className={item.isEnable ? "text-green-600" : "text-red-600"}
              >
                {item.isEnable ? "Enable" : "Disable"}
              </Text>
            </Text>
            <TouchableOpacity
              className="bg-red-500 p-2 rounded-md mt-2"
              onPress={() => handleRemoveProduct(item.id)}
            >
              <Text className="text-white text-center">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />

      <View className="absolute bottom-4 left-4 right-4">
        <TouchableOpacity
          className="bg-blue-500 p-4 rounded-md"
          onPress={() => setIsModalVisible(true)}
        >
          <Text className="text-white text-center font-semibold text-lg">
            Add Product
          </Text>
        </TouchableOpacity>
      </View>

      <Modal transparent={true} visible={isModalVisible} animationType="slide">
        <View className="flex-1 bg-gray-100 p-6 justify-center">
          <Text className="text-2xl font-bold mb-4">Add Product</Text>

          <TextInput
            className="bg-white p-4 rounded-md mb-3 w-full"
            placeholder="Product Name"
            value={newProduct.productName}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, productName: text })
            }
          />

          <TextInput
            className="bg-white p-4 rounded-md mb-3 w-full"
            placeholder="Product Description"
            value={newProduct.productDescription}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, productDescription: text })
            }
          />

          <TextInput
            className="bg-white p-4 rounded-md mb-3 w-full"
            placeholder="Product Price"
            keyboardType="numeric"
            value={newProduct.productPrice}
            onChangeText={(text) =>
              setNewProduct({ ...newProduct, productPrice: text })
            }
          />

          <View className="flex-row items-center mb-4">
            <Text className="text-lg">Available:</Text>
            <Switch
              value={newProduct.isEnable}
              onValueChange={(value) =>
                setNewProduct({ ...newProduct, isEnable: value })
              }
              className="ml-3"
            />
          </View>

          <View className="flex-row justify-between mt-4">
            <TouchableOpacity
              className="bg-gray-500 p-3 rounded-md w-1/3"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-white text-center text-lg">Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              className="bg-blue-500 p-3 rounded-md w-1/3"
              onPress={handleAddProduct}
            >
              <Text className="text-white text-center text-lg">Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Products;
