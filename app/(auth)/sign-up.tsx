import { Link } from "expo-router";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
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
            Hello! welcome to Gear-K
          </Text>
          <View className="px-5 mb-7">
            <TextInput
              className="px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 mb-5 focus:border-primary/60"
              placeholder="User name"
            />
            <TextInput
              className="px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 mb-5 focus:border-primary/60"
              placeholder="Email address"
            />
            <TextInput
              className="px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 focus:border-primary/60 mb-7"
              placeholder="Password"
              textContentType="password"
              secureTextEntry={true}
            />
            <Button title="Sign Up" color="#651fff" />
          </View>
          <View className="mx-auto">
            <Text>
              You have an account yet?{" "}
              <Link href="/sign-in" className="font-semibold text-primary">
                Sign in
              </Link>
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
