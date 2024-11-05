import { API_URL } from "@/constants";
import { Product } from "@/interfaces";

const handleResponse = async <T>(response: any): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const wishlistService = {
  getAllWishlists: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/wishlists/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return handleResponse<Product[]>(response);
    } catch (error: any) {
      throw new Error("Failed to fetch cart items: " + error.message);
    }
  },

  addToWishlist: async (userId: number, productId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/wishlists/user/${userId}/product/${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error("Failed to add item to cart: " + error.message);
    }
  },

  removeFromCart: async (userId: number, productId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/wishlists/user/${userId}/product/${productId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error("Failed to remove item from cart: " + error.message);
    }
  },
};

export { wishlistService };
