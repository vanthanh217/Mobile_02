import { useRouter } from "expo-router";
import LottieView from "lottie-react-native";
import { useEffect, useRef } from "react";
import { StyleSheet, Text, View } from "react-native";

const Checkout = () => {
  const animation = useRef(null);
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 3000);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <LottieView
          ref={animation}
          source={require("@/assets/success.json")}
          autoPlay
          loop={false}
          style={styles.animation}
        />
        <Text style={styles.successText}>Thanh toán thành công!</Text>
      </View>
    </>
  );
};

export default Checkout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  animation: {
    width: 200,
    height: 200,
  },
  successText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
    color: "#4CAF50",
  },
});
