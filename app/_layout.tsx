import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, useRouter, useSegments } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

SplashScreen.preventAutoHideAsync();

function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (!segments.length) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (!isAuthenticated && !inAuthGroup) {
      setTimeout(() => {
        router.replace("/sign-in");
      }, 0);
    } else if (isAuthenticated && inAuthGroup) {
      setTimeout(() => {
        router.replace("/");
      }, 0);
    }
  }, [isAuthenticated, segments]);

  return null;
}

function RootLayoutWrap() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });
  const { isLoading } = useAuth();

  useEffect(() => {
    if (loaded && !isLoading) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isLoading]);

  if (!loaded || isLoading) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <ProtectedRoute />
      <View style={{ position: "absolute", zIndex: 9999, width: "100%" }}>
        <Toast topOffset={50} />
      </View>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen
          name="products/[slug]/page"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="users/change-password/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="users/edit-user/index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="order/payment-method"
          options={{ headerShown: false }}
        />
        <Stack.Screen name="order/checkout" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutWrap />
    </AuthProvider>
  );
}
