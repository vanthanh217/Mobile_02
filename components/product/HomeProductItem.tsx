import { IMAGE_URL } from "@/constants";
import { Brand, Category, Product } from "@/interfaces";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

interface HomeProductItemProps {
  product: Product;
}

const HomeProductItem: React.FC<HomeProductItemProps> = ({ product }) => {
  const brand = product?.brand as Brand;

  return (
    <>
      <View className="w-[48%] mb-4 overflow-hidden bg-white rounded-xl">
        <Link
          href={{
            pathname: "/products/[slug]/page",
            params: { slug: product.slug },
          }}
          className="block"
          asChild
        >
          <Pressable>
            <View className="h-[150px] mb-1">
              <Image
                source={{ uri: `${IMAGE_URL}/products/${product.images[0]}` }}
                className="w-full h-full"
              />
            </View>
          </Pressable>
        </Link>
        <View className="p-2">
          <Text className="uppercase text-slate-500">{brand.name}</Text>
          <Link
            href={{
              pathname: "/products/[slug]/page",
              params: { slug: product.slug },
            }}
            className="h-8 mb-2 font-semibold"
            numberOfLines={2}
          >
            {product.name}
          </Link>
          <View className="flex flex-row items-center">
            <Text className="text-xl font-semibold text-orange-600">
              {new Intl.NumberFormat("vi-VN", {
                style: "currency",
                currency: "VND",
              }).format(product.price)}
            </Text>
            <View className="flex items-center p-2 ml-auto bg-orange-600/20 w-11 rounded-xl">
              <Ionicons name="bag-outline" size={24} color={"#f97316"} />
            </View>
          </View>
        </View>
      </View>
    </>
  );
};

export default HomeProductItem;
