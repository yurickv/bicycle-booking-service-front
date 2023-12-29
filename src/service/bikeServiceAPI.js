import axios from "axios";

axios.defaults.baseURL =
  "https://bicycle-booking-services-back-end.onrender.com/admin";

export const getAllBikes = async (controller) => {
  try {
    const { data } = await axios.get(`/`, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    console.error("Помилка при отриманні даних:", error);
  }
};
