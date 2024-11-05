import { changePassword } from "@/api/user-api";
import { ChangePassword, User } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const [user, setUser] = useState<User | null>(null);
  const [payload, setPayload] = useState<ChangePassword>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleInputChange =
    (name: keyof ChangePassword) =>
    (text: string): void => {
      setPayload((prev) => ({
        ...prev,
        [name]: text,
      }));
    };

  const handleChangePassword = async () => {
    if (payload.newPassword !== payload.confirmPassword) {
      Toast.show({
        type: "error",
        text1: "New password and confirm password do not match.",
      });
      return;
    }

    try {
      const response = await changePassword(user?.user_id || 1, payload);
      console.log(response);
      if (response) {
        Toast.show({
          type: "success",
          text1: response || "Change password successfully!",
          autoHide: true,
          visibilityTime: 500,
        });
        router.push("/profile");
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: error instanceof Error ? error.message : "Something went wrong",
      });
    }
  };

  return (
    <>
      <View className="px-7 mt-14">
        {/* Header */}
        <View>
          <TouchableOpacity
            activeOpacity={0.9}
            className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10 mb-16"
            onPress={() => router.push("/profile")}
          >
            <Ionicons name="chevron-back-outline" size={24} color="#757575" />
          </TouchableOpacity>
        </View>
        <View className="flex flex-col w-4/5 mx-auto">
          <Text className="mb-4 text-2xl font-semibold capitalize">
            Change password
          </Text>
          <View className="flex flex-col mb-4">
            <View>
              <Text className="mb-2 text-base">Current password</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="*******"
                textContentType="password"
                secureTextEntry={true}
                value={payload.currentPassword}
                onChangeText={handleInputChange("currentPassword")}
              />
            </View>
            <View>
              <Text className="mb-2 text-base">New password</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="*******"
                textContentType="password"
                secureTextEntry={true}
                value={payload.newPassword}
                onChangeText={handleInputChange("newPassword")}
              />
            </View>
            <View>
              <Text className="mb-2 text-base">Confirm new password</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="*******"
                textContentType="password"
                secureTextEntry={true}
                value={payload.confirmPassword}
                onChangeText={handleInputChange("confirmPassword")}
              />
            </View>
          </View>
          <Button title="Change" onPress={handleChangePassword} />
        </View>
      </View>
    </>
  );
};

export default ChangePasswordScreen;
