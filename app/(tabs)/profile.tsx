import ProfileItem from "@/components/profile/ProfileItem";
import { IMAGE_URL } from "@/constants";
import { User } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const ProfileScreen = () => {
  const [user, setUser] = useState<User | null>(null);

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

  return (
    <>
      <View>
        <View className="mt-10 mb-5">
          <Text className="text-lg font-semibold text-center">Profile</Text>
        </View>
        <View>
          <View className="mx-auto mb-10">
            <View className="w-[150px] h-[150px] rounded-full overflow-hidden mb-2">
              <Image
                source={
                  user?.avatar
                    ? { uri: `${IMAGE_URL}/users/${user.avatar}` }
                    : require("@/assets/images/default_avt.jpg")
                }
                className="object-cover w-full h-full"
              />
            </View>
            <View className="mb-3">
              <Text className="text-xl font-medium text-center">
                {user?.full_name || "Guest User"}
              </Text>
              <Text className="text-base text-slate-600">
                {user?.email || "No email available"}
              </Text>
            </View>
            <View>
              <TouchableOpacity
                activeOpacity={0.9}
                className="flex flex-row items-center justify-center h-10 rounded-full bg-sky-400/20 border-silver"
                onPress={() => alert("Router to edit!")}
              >
                <Text className="text-base font-medium text-sky-400">
                  Edit profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View className="w-4/5 mx-auto">
            <ProfileItem icon="settings-outline" text="Settings" />
            <ProfileItem icon="card-outline" text="Billing Details" />
            <ProfileItem icon="person-circle-outline" text="User managerment" />
            <View className="w-full h-[1px] my-7 bg-slate-700"></View>
            <ProfileItem icon="log-out-outline" text="Logout" />
          </View>
        </View>
      </View>
    </>
  );
};

export default ProfileScreen;
