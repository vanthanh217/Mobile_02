import { getAllBanners } from "@/api/banner-api";
import { IMAGE_URL } from "@/constants";
import { Banner } from "@/interfaces";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Image, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

const BannerCarousel = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getAllBanners();
        setBanners(data);
      } catch (err) {
        console.error("Error fetching banners:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <>
      <Carousel
        loop
        width={Math.round(width) - 43}
        height={200}
        autoPlay={true}
        data={banners}
        scrollAnimationDuration={2000}
        onSnapToItem={(index) => setActiveIndex(index)}
        renderItem={({ item }) => (
          <Image
            source={{ uri: `${IMAGE_URL}/banners/${item.thumbnail}` }}
            className="object-cover w-full h-full"
          />
        )}
      />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 10,
          bottom: 10,
        }}
      >
        {banners.map((_, index) => (
          <View
            key={index}
            style={{
              width: 10,
              height: 10,
              borderRadius: 4,
              marginHorizontal: 4,
              backgroundColor: activeIndex === index ? "#651fff" : "#ccc",
            }}
          />
        ))}
      </View>
    </>
  );
};

export default BannerCarousel;
