import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "", name: "" });

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        Alert.alert("Error", "No authentication token found.");
        return;
      }
      try {
        const response = await fetch(
          "https://pos-api-4l2n.onrender.com/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        if (response.ok) {
          setUsers(data.user);
        } else {
          Alert.alert("Error", data.message || "Failed to fetch users");
        }
      } catch (error) {
        Alert.alert("Error", "An error occurred while fetching users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch("https://pos-api-4l2n.onrender.com/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        setUsers(data.user); // ✅ Ensure the latest data is set
      } else {
        Alert.alert("Error", data.message || "Failed to fetch users");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching users");
    }
  };

  const handleCreateUser = async () => {
    const token = await AsyncStorage.getItem("userToken");

    try {
      const response = await fetch(
        "https://pos-api-4l2n.onrender.com/users/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();
      console.log("API Response:", data); // Debugging

      if (response.ok && data.users) {
        Alert.alert("Success", "User added successfully");

        setForm({ username: "", password: "", name: "" });
        closeModal(); // Close modal

        fetchUsers(); // ✅ Fetch latest user list
      } else {
        Alert.alert("Error", data.message || "Failed to create user");
      }
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert("Error", "An error occurred while creating user");
    }
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleUpdateUser = async () => {
    const token = await AsyncStorage.getItem("userToken");

    // Prepare the updated data
    const updatedData = {
      userID: selectedUser._id,
      username: form.username,
      name: form.name,
    };

    // Only include the password if the user enters one
    if (form.password.trim() !== "") {
      updatedData.password = form.password;
    }

    try {
      const response = await fetch(
        "https://pos-api-4l2n.onrender.com/users/update",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user._id === selectedUser._id
              ? { ...user, username: form.username, name: form.name }
              : user
          )
        );
        Alert.alert("Success", "User updated successfully");
        setModalVisible(false);
      } else {
        Alert.alert("Error", data.message || "Failed to update user");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while updating user");
    }
  };

  const handleDelete = async (userId) => {
    const token = await AsyncStorage.getItem("userToken");
    try {
      const response = await fetch(
        "https://pos-api-4l2n.onrender.com/users/remove",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ userID: userId }),
        }
      );
      if (response.ok) {
        setUsers(users.filter((user) => user._id !== userId));
        Alert.alert("Success", "User deleted successfully");
      } else {
        const data = await response.json();
        Alert.alert("Error", data.message || "Failed to delete user");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while deleting user");
    }
  };

  const handleEdit = (user) => {
    setIsEditing(true);
    setSelectedUser(user);
    setForm({
      username: user.username,
      password: "",
      name: user.name,
    });
    setModalVisible(true);
  };

  const handleAddUser = () => {
    setIsEditing(false);
    setForm({ username: "", password: "", name: "" });
    setModalVisible(true);
  };

  return (
    <View className="p-4 bg-white h-full">
      <Text className="text-lg font-semibold mb-4">Users List</Text>
      <View className="border-b border-gray-300 p-2 flex-row bg-gray-100">
        <Text className="flex-1 font-semibold">Username</Text>
        <Text className="flex-1 font-semibold">Name</Text>
        <Text className="flex-1 font-semibold">Permission</Text>
        <Text className="w-24 font-semibold text-center">Actions</Text>
      </View>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          data={users}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row items-center p-3 border-b border-gray-300">
              <Text className="flex-1">{item.username}</Text>
              <Text className="flex-1">{item.name}</Text>
              <Text className="flex-1">{item.isAdmin ? "Admin" : "User"}</Text>
              <View className="w-24 flex-row gap-2">
                <TouchableOpacity
                  className="bg-blue-500 px-3 py-2 rounded"
                  onPress={() => handleEdit(item)}
                >
                  <Text className="text-white text-center">Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-500 px-3 py-2 rounded"
                  onPress={() => handleDelete(item._id)}
                >
                  <Text className="text-white text-center">Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      <TouchableOpacity
        className="bg-green-500 px-4 py-3 rounded mt-4 absolute bottom-4 left-4 right-4"
        onPress={handleAddUser}
      >
        <Text className="text-white text-center">Add User</Text>
      </TouchableOpacity>

      {/* Modal for Adding/Editing Users */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View className="flex-1 bg-black bg-opacity-50 justify-end">
          <View className="bg-white h-full w-full p-6">
            <Text className="text-lg font-semibold mb-4">
              {isEditing ? "Edit User" : "Add User"}
            </Text>

            <TextInput
              className="border p-2 mb-2"
              placeholder="Username"
              value={form.username}
              onChangeText={(text) => setForm({ ...form, username: text })}
            />

            <TextInput
              className="border p-2 mb-2"
              placeholder="Password"
              secureTextEntry
              value={form.password} // Keep value stateful
              onChangeText={(text) => setForm({ ...form, password: text })}
            />

            <TextInput
              className="border p-2 mb-4"
              placeholder="Name"
              value={form.name}
              onChangeText={(text) => setForm({ ...form, name: text })}
            />

            {/* Cancel & Action Buttons */}
            <View className="absolute bottom-4 left-4 right-4">
              <TouchableOpacity
                className="bg-gray-500 px-4 py-3 rounded mb-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white text-center">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-blue-500 px-4 py-3 rounded"
                onPress={isEditing ? handleUpdateUser : handleCreateUser}
              >
                <Text className="text-white text-center">
                  {isEditing ? "Update" : "Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Users;
