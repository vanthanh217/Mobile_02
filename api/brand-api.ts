import { API_URL } from "@/constants";

export const getAllBrands = async () => {
  try {
    const response = await fetch(`${API_URL}/brands`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching brands:", error);
    throw error;
  }
};
