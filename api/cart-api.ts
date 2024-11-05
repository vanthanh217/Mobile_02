import { API_URL } from "@/constants";
import { Cart, CartRequest } from "@/interfaces";

const handleResponse = async <T>(response: any): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const cartService = {
  getCartItems: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/carts/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      return handleResponse<Cart>(response);
    } catch (error: any) {
      throw new Error("Failed to fetch cart items: " + error.message);
    }
  },

  addToCart: async (userId: number, request: CartRequest) => {
    try {
      const response = await fetch(
        `${API_URL}/carts/user/${userId}/add-to-cart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error("Failed to add item to cart: " + error.message);
    }
  },

  updateQuantity: async (userId: number, request: CartRequest) => {
    try {
      const response = await fetch(
        `${API_URL}/carts/user/${userId}/update-quantity`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      );
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error("Failed to update item quantity: " + error.message);
    }
  },

  removeFromCart: async (userId: number, productId: number) => {
    try {
      const response = await fetch(
        `${API_URL}/carts/user/${userId}/remove?productId=${productId}`,
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

  clearCart: async (userId: number) => {
    try {
      const response = await fetch(`${API_URL}/carts/user/${userId}/clear`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await handleResponse(response);
    } catch (error: any) {
      throw new Error("Failed to clear the cart: " + error.message);
    }
  },
};

export { cartService };
