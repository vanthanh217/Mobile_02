import { wishlistService } from "@/api/wishlist-api";
import FarvoriteItem from "@/components/product/FarvoriteItem";
import { useCart } from "@/contexts/CartContext";
import { Product, User } from "@/interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Text, View } from "react-native";

const USER_ID = 2;

export default function WishListScreen() {
  const [user, setUser] = useState<User>();
  const [wishlists, setWishlists] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const { refreshCart, userId } = useCart();

  useEffect(() => {
    (async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Failed to load user data:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const data = await wishlistService.getAllWishlists(
          userId || user?.user_id || USER_ID
        );
        setWishlists(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [refreshCart]);

  return (
    <>
      <View>
        <View className="mt-10 mb-5">
          <Text className="text-xl font-semibold text-center">Favorite</Text>
        </View>
        <View className="flex flex-col px-3">
          {wishlists &&
            wishlists.map((item) => (
              <FarvoriteItem
                key={item.id}
                item={item}
                userId={user?.user_id || USER_ID}
                loading={loading}
                setLoading={setLoading}
              />
            ))}
        </View>
      </View>
    </>
  );
}
