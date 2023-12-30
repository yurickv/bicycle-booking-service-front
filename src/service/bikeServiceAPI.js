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

export const deleteBike = async (controller, id) => {
  try {
    const { data } = await axios.delete(`/${id}`, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    console.error("Помилка при видаленні даних:", error);
  }
};
