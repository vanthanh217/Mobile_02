import { EditUserRequest, User } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";

const EditUser = () => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [payload, setPayload] = useState<EditUserRequest>({
    full_name: "",
    username: "",
    phone_number: "",
    avatar: "",
  });

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
    (name: keyof EditUserRequest) =>
    (text: string): void => {
      setPayload((prev) => ({
        ...prev,
        [name]: text,
      }));
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
            Edit profile
          </Text>
          <View className="flex flex-col mb-4">
            <View>
              <Text className="mb-2 text-base">Full name</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="Enter your full name"
                secureTextEntry={true}
                value={payload.full_name}
                onChangeText={handleInputChange("full_name")}
              />
            </View>
            <View>
              <Text className="mb-2 text-base">User name</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="Enter your username"
                secureTextEntry={true}
                value={payload.username}
                onChangeText={handleInputChange("username")}
              />
            </View>
            <View>
              <Text className="mb-2 text-base">Phone number</Text>
              <TextInput
                className="px-4 py-1 border rounded-lg border-borderColor text-slate-800 focus:border-primary/60 mb-7"
                placeholder="Enter your phone number"
                secureTextEntry={true}
                value={payload.phone_number}
                onChangeText={handleInputChange("phone_number")}
              />
            </View>
          </View>
          <Button title="Edit" />
        </View>
      </View>
    </>
  );
};

export default EditUser;
