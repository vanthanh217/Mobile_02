import { cartService } from "@/api/cart-api";
import { IMAGE_URL } from "@/constants";
import { Brand, Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";
import ModalDialog from "../ModalDialog";
import QuantityInput from "./QuantityInput";
import { wishlistService } from "@/api/wishlist-api";
import { useCart } from "@/contexts/CartContext";

interface CartItemProps {
  item: Product;
  userId: number;

  qty: number;
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  userId,

  qty,
}) => {
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const brand = item.brand as Brand;
  const [quantity, setQuantity] = useState(qty);
  const { triggerRefreshCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
    cartService.updateQuantity(userId, {
      productId: item.id,
      quantity: newQuantity,
    });
  };

  const handleRemoveItem = async (productId: number) => {
    try {
      const response = await cartService.removeFromCart(userId, productId);
      console.log(response);
      Toast.show({
        type: "success",
        text1: "Remove item successfully!",
        autoHide: true,
        visibilityTime: 500,
      });
      triggerRefreshCart();
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Error when remove item!",
      });
    } finally {
      setModalVisible(false);
    }
  };

  const onRemovePress = () => {
    if (!userId) {
      Toast.show({
        type: "info",
        text1: "Please log in to perform this function!",
      });

      return;
    }
    setModalVisible(true);
  };

  const addToWishlist = async () => {
    try {
      triggerRefreshCart();
      await wishlistService.addToWishlist(userId, item.id);
      Toast.show({
        type: "success",
        text1: "Add to cart successfully!",
        autoHide: true,
        visibilityTime: 500,
      });
    } catch (error: any) {
      Toast.show({
        type: "error",
        text1: error.message || "Error when add to cart",
      });
    } finally {
      triggerRefreshCart();
    }
  };

  return (
    <>
      <View className="flex flex-row items-center px-1 py-2 mb-1 border rounded-lg gap-x-3 border-slate-400">
        <View className="w-[100px] h-[100px] rounded-lg overflow-hidden">
          <Image
            source={{ uri: `${IMAGE_URL}/products/${item.images[0]}` }}
            className="object-cover w-full h-full"
          />
        </View>
        <View className="flex-1">
          {/* Top */}
          <View className="mb-2">
            <Text className="text-base font-semibold uppercase text-slate-400">
              {brand.name}
            </Text>
            <Text className="mb-2 font-medium" numberOfLines={1}>
              {item.name}
            </Text>
            {/* Price */}
            <View className="flex flex-row items-center gap-x-2">
              {/* Current price */}
              <Text className="text-lg font-semibold text-textRed">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(item.price)}
              </Text>
            </View>
          </View>
          {/* Bottom */}
          <View className="flex flex-row items-center gap-x-3">
            <QuantityInput
              userId={userId}
              productId={item.id}
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
            <TouchableOpacity
              activeOpacity={0.9}
              className="flex flex-row items-center justify-center bg-[#F5F5F5] border border-silver rounded-lg w-10 h-10"
              onPress={addToWishlist}
            >
              <Ionicons name="heart-outline" size={22} color="#757575" />
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={1}
              className="flex flex-row items-center justify-center w-10 h-10 border rounded-lg bg-textRed/20 border-textRed"
              onPress={onRemovePress}
            >
              <Ionicons name="trash-outline" size={22} color="#f61a3d" />
            </TouchableOpacity>
          </View>
        </View>
        <ModalDialog
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={() => handleRemoveItem(item.id)}
          title="Confirmation of deletion"
          message="Are you sure you want to remove this product from your cart?"
        />
      </View>
    </>
  );
};
export default CartItem;
