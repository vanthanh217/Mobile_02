import { getAllCategories } from "@/api/category-api";
import { Category } from "@/interfaces";
import { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

const CategoryWrap = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (err) {
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <View className="flex flex-row gap-x-4">
        <View className="rounded-lg flex flex-row items-center bg-[#651fff33] group px-4 py-2">
          <Text className="font-semibold text-primary">All</Text>
        </View>
        {categories &&
          categories.map((item) => (
            <View
              key={item.id}
              className="rounded-lg flex flex-row items-center bg-[#651fff33] group px-4 py-2"
            >
              <Text className="font-semibold text-primary">{item.name}</Text>
            </View>
          ))}
      </View>
    </>
  );
};

export default CategoryWrap;
