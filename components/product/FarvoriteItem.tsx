import { IMAGE_URL } from "@/constants";
import { Brand, Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Dispatch, SetStateAction, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import ModalDialog from "../ModalDialog";
import { wishlistService } from "@/api/wishlist-api";
import Toast from "react-native-toast-message";
import { useCart } from "@/contexts/CartContext";

const FarvoriteItem = ({
  item,
  userId,
  loading,
  setLoading,
}: {
  item: Product;
  userId: number;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const brand = item.brand as Brand;
  const [isModalVisible, setModalVisible] = useState<boolean>(false);
  const { triggerRefreshCart } = useCart();

  const removeWishlistItem = async (productId: number) => {
    try {
      const response = await wishlistService.removeFromCart(userId, productId);
      console.log(response);
      triggerRefreshCart();
      Toast.show({
        type: "success",
        text1: "Remove item successfully!",
        autoHide: true,
        visibilityTime: 500,
      });
      setLoading(!loading);
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

  return (
    <>
      <View className="p-2 mb-2 overflow-hidden bg-white rounded-xl">
        <View className="flex flex-row items-center">
          <View className="w-[100px] h-[100px] rounded-lg overflow-hidden mr-3">
            <Image
              source={{ uri: `${IMAGE_URL}/products/${item.images[0]}` }}
              className="object-cover w-full h-full"
            />
          </View>
          <View className="flex flex-row items-center flex-1">
            <View className="flex-1">
              <Text className="text-lg font-semibold uppercase text-slate-500">
                {brand.name}
              </Text>
              <Text className="font-medium" numberOfLines={1}>
                {item.name}
              </Text>
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
            <TouchableOpacity
              activeOpacity={1}
              className="p-2 ml-5 rounded-lg bg-textRed/10"
              onPress={onRemovePress}
            >
              <Ionicons name="trash-outline" size={22} color={"#f61a3d"} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalDialog
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        onConfirm={() => removeWishlistItem(item.id)}
        title="Confirmation of deletion"
        message="Are you sure you want to remove this product from your wishlist?"
      />
    </>
  );
};

export default FarvoriteItem;
