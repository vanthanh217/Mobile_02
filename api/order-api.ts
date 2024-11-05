import { API_URL } from "@/constants";
import { EPaymentMethod } from "@/enums";
import { OrderResponse } from "@/interfaces";

const handleResponse = async <T>(response: Response): Promise<T> => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Something went wrong");
  }
  return response.json();
};

const orderService = {
  createOrder: async (
    userId: number,
    paymentMethod: EPaymentMethod
  ): Promise<OrderResponse> => {
    try {
      const response = await fetch(
        `${API_URL}/orders/user/${userId}?paymentMethod=${paymentMethod}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await handleResponse<OrderResponse>(response);
    } catch (error: any) {
      throw new Error("Failed to create order: " + error.message);
    }
  },
};

export { orderService };
