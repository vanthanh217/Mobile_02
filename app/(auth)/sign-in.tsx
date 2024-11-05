import { login } from "@/api/auth-api";
import { useAuth } from "@/contexts/AuthContext";
import { Login } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const SignIn = () => {
  const router = useRouter();
  const { updateAuthState } = useAuth();
  const [payload, setPayload] = useState<Login>({
    usernameOrEmail: "",
    password: "",
  });

  const handleInputChange =
    (name: keyof Login) =>
    (text: string): void => {
      setPayload((prev) => ({
        ...prev,
        [name]: text,
      }));
    };

  const handleLogin = async () => {
    try {
      const response = await login(payload);
      console.log(response);
      if (response.user) {
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
        await updateAuthState();
        Toast.show({
          type: "success",
          text1: response.message || "Login successfully!",
        });
        router.push("/");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <SafeAreaView className="w-full h-full bg-slate-100">
      <View className="flex items-center justify-center h-full">
        <View className="bg-white rounded-lg shadow-md p-7">
          <View className="mb-3">
            <Image
              source={require("@/assets/images/Logo.png")}
              className="w-[250px] h-12"
            />
          </View>
          <Text className="mb-4 text-xl font-medium text-center text-dark">
            Welcome back!
          </Text>
          <View className="px-5 mb-7">
            <TextInput
              className="px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 mb-5 focus:border-primary/60"
              placeholder="User name or email"
              value={payload.usernameOrEmail}
              onChangeText={handleInputChange("usernameOrEmail")}
            />
            <TextInput
              className="px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 focus:border-primary/60 mb-7"
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
              value={payload.password}
              onChangeText={handleInputChange("password")}
            />
            <Button title="Sign In" color="#651fff" onPress={handleLogin} />
          </View>
          <View className="mx-auto">
            <Text>
              Don't have an account yet?{" "}
              <Link href="/sign-up" className="font-semibold text-primary">
                Sign up
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
