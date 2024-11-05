import { API_URL } from "@/constants";
import { ChangePassword } from "@/interfaces";

export const changePassword = async (
  userId: number,
  payload: ChangePassword
) => {
  try {
    const response = await fetch(`${API_URL}/users/${userId}/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (response.ok) {
      console.log(data.message);
      return data.message;
    } else {
      console.error("Failed to change password:", data);
      return data;
    }
  } catch (error) {
    throw error;
  }
};
