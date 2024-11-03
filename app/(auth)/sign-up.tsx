import { register } from "@/api/auth-api";
import { FormErrors, Register } from "@/interfaces";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Button, Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";

const SignUp = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<Register>({
    full_name: "",
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState<boolean>(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.full_name.trim()) {
      newErrors.full_name = "Full name is required!";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username is required!";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters!";
    }

    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email is required!";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Invalid email format!";
    }

    if (!formData.password) {
      newErrors.password = "Password is required!";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters!";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUp = async (): Promise<void> => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const response = await register(formData);
      console.log(response);

      Toast.show({
        type: "success",
        text1: response.message || "Registered successfully!",
      });
      router.push("/sign-in");
    } catch (error) {
      console.log(error);
      Toast.show({
        type: "error",
        text1: error instanceof Error ? error.message : "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange =
    (name: keyof Register) =>
    (text: string): void => {
      setFormData((prev) => ({
        ...prev,
        [name]: text,
      }));
    };

  const getInputStyle = (fieldName: keyof Register): string => {
    return `px-4 border rounded-lg py-[6px] border-borderColor text-slate-800 mb-5 focus:border-primary/60 ${
      errors[fieldName] ? "border-red-500" : ""
    }`;
  };

  return (
    <>
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
                className={getInputStyle("full_name")}
                placeholder="Full name"
                value={formData.full_name}
                onChangeText={handleInputChange("full_name")}
              />
              {errors.full_name && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.full_name}
                </Text>
              )}
              <TextInput
                className={getInputStyle("username")}
                placeholder="User name"
                value={formData.username}
                onChangeText={handleInputChange("username")}
                autoCapitalize="none"
              />
              {errors.username && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.username}
                </Text>
              )}
              <TextInput
                className={getInputStyle("email")}
                placeholder="Email address"
                value={formData.email}
                onChangeText={handleInputChange("email")}
                keyboardType="email-address"
                autoCapitalize="none"
              />
              {errors.email && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.email}
                </Text>
              )}
              <TextInput
                className={getInputStyle("password")}
                placeholder="Password"
                value={formData.password}
                onChangeText={handleInputChange("password")}
                textContentType="password"
                secureTextEntry={true}
              />
              {errors.password && (
                <Text className="mb-2 text-sm text-red-500">
                  {errors.password}
                </Text>
              )}
              <Button
                title={loading ? "Signing up..." : "Sign Up"}
                color="#651fff"
                onPress={handleSignUp}
                disabled={loading}
              />
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
    </>
  );
};

export default SignUp;
