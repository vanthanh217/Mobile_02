import { Stack } from "expo-router";

const PageLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen
          name="product-detail"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default PageLayout;
