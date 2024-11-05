import { orderService } from "@/api/order-api";
import { EPaymentMethod } from "@/enums";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const PaymentScreen = () => {
  const totalAmountParam = useLocalSearchParams().totalAmount;
  const totalAmount = Array.isArray(totalAmountParam)
    ? parseFloat(totalAmountParam[0])
    : parseFloat(totalAmountParam || "0");
  const userIdParam = useLocalSearchParams().userId;
  const userId = Array.isArray(userIdParam) ? userIdParam[0] : userIdParam;
  const [selectedMethod, setSelectedMethod] = useState<EPaymentMethod | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const methods = [
    { id: EPaymentMethod.CASH, label: "Cash" },
    { id: EPaymentMethod.BANK_TRANSFER, label: "Bank transfer" },
  ];

  const handlePayment = async () => {
    if (!selectedMethod || !userId) return;
    setLoading(true);

    try {
      await orderService.createOrder(parseInt(userId, 10), selectedMethod);
      router.push("/order/checkout");
    } catch (error) {
      console.error("Payment failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <View className="mt-16 mb-10 ml-7">
        <TouchableOpacity
          activeOpacity={0.9}
          className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
          onPress={() => router.push("/cart")}
        >
          <Ionicons name="chevron-back-outline" size={24} color="#757575" />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        <Text style={styles.title}>Choose payment method</Text>
        <Text style={styles.totalPrice}>
          Total price:{" "}
          {new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(totalAmount)}
        </Text>
        {methods.map((method) => (
          <TouchableOpacity
            activeOpacity={1}
            key={method.id}
            style={[
              styles.methodButton,
              selectedMethod === method.id && styles.selectedButton,
            ]}
            onPress={() => setSelectedMethod(method.id)}
          >
            <Text
              style={[
                styles.methodText,
                selectedMethod === method.id && styles.selectedText,
              ]}
            >
              {method.label}
            </Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity
          activeOpacity={1}
          onPress={handlePayment}
          style={styles.paymentButton}
          disabled={!selectedMethod || loading}
        >
          <Text style={styles.paymentButtonText}>
            {loading ? "Processing..." : "Billing"}
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  totalPrice: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  methodButton: {
    padding: 15,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#007AFF",
    borderColor: "#007AFF",
  },
  methodText: {
    fontSize: 16,
    color: "#333",
  },
  selectedText: {
    color: "#FFF",
  },
  paymentButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: "#007AFF",
    borderRadius: 8,
    alignItems: "center",
  },
  paymentButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
