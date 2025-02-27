import { StatusBar } from "expo-status-bar";
import { Text, View, SafeAreaView, ScrollView } from "react-native"; // Corrected import
import { useRouter } from "expo-router";
import Buttons from "../components/Buttons";

export default function App() {
  const router = useRouter();
  return (
    <>
      <SafeAreaView className="h-full">
        <ScrollView>
          <View className="w-full justify-center min-h-[83vh] px-4 my-6">
            <Buttons
              containerStyles="mt-5 h-16"
              title="Login"
              handlePress={() => {
                router.push("/sign-in");
              }}
            />
            <Buttons
              containerStyles="mt-5 h-16"
              title="Sign up"
              handlePress={() => {
                router.push("/sign-up");
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
      <StatusBar style="auto" /> {/* Add StatusBar for mobile compatibility */}
    </>
  );
}
