import { Ionicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";

interface ProfileItemProps {
  icon: keyof typeof Ionicons.glyphMap;
  text: string;
}

const ProfileItem: React.FC<ProfileItemProps> = ({ icon, text }) => {
  return (
    <>
      <View className="flex flex-row items-center justify-between w-full mb-5">
        <View>
          <View className="flex flex-row items-center gap-x-5">
            <TouchableOpacity className="flex flex-row items-center justify-center p-2 rounded-full bg-primary/10">
              <Ionicons name={icon} size={24} color={"#651fff"} />
            </TouchableOpacity>
            <Text
              className={`text-lg capitalize ${
                icon === "log-out-outline" ? "text-textRed" : ""
              }`}
            >
              {text}
            </Text>
          </View>
        </View>
        <View className="ml-10">
          <TouchableOpacity className="flex flex-row items-center justify-center p-2 rounded-full bg-slate-500/10">
            <Ionicons
              name="chevron-forward-outline"
              size={24}
              color={"#757575"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default ProfileItem;
