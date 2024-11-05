import { cartService } from "@/api/cart-api";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

interface QuantityInputProps {
  userId: number;
  productId: number;
  initialQuantity: number;
  onQuantityChange?: (quantity: number) => void;
}

const QuantityInput: React.FC<QuantityInputProps> = ({
  userId,
  productId,
  initialQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState<number>(initialQuantity);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleIncrement = async () => {
    setIsLoading(true);
    try {
      await cartService.updateQuantity(userId, {
        productId,
        quantity: quantity + 1,
      });
      setQuantity(quantity + 1);
      onQuantityChange?.(quantity + 1);
      Toast.show({ type: "success", text1: "Quantity updated successfully" });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to update quantity",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDecrement = async () => {
    if (quantity <= 1) return;
    setIsLoading(true);
    try {
      await cartService.updateQuantity(userId, {
        productId,
        quantity: quantity - 1,
      });
      setQuantity(quantity - 1);
      onQuantityChange?.(quantity - 1);
      Toast.show({ type: "success", text1: "Quantity updated successfully" });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Failed to update quantity",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <View className="flex flex-row items-center bg-[#F5F5F5] border border-silver rounded-lg max-w-[160px] h-10">
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={isLoading}
          className="flex flex-row items-center justify-center w-[35%]"
          onPress={handleIncrement}
        >
          <Ionicons name="add-sharp" size={22} color="#757575" />
        </TouchableOpacity>
        <TextInput
          value={quantity.toString()}
          className="flex-1 w-10 text-lg font-semibold text-center"
        />
        <TouchableOpacity
          activeOpacity={0.9}
          disabled={isLoading}
          className="flex flex-row items-center justify-center w-[35%]"
          onPress={handleDecrement}
        >
          <Ionicons name="remove-sharp" size={22} color="#757575" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default QuantityInput;
