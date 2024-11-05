import { getAllCategories } from "@/api/category-api";
import { Category } from "@/interfaces";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

interface CategoryWrapProps {
  category?: string;
  setCategory: Dispatch<SetStateAction<string>>;
}

const CategoryWrap: React.FC<CategoryWrapProps> = ({
  category,
  setCategory,
}) => {
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
        <TouchableOpacity
          activeOpacity={0.8}
          className="rounded-lg flex flex-row items-center bg-[#651fff33] group px-4 py-2"
          onPress={() => setCategory("")}
        >
          <Text className="font-semibold text-primary">All</Text>
        </TouchableOpacity>
        {categories &&
          categories.map((item) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setCategory(item.slug)}
              className="rounded-lg flex flex-row items-center bg-[#651fff33] group px-4 py-2"
            >
              <Text className="font-semibold text-primary">{item.name}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </>
  );
};

export default CategoryWrap;
