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

export const changeBike = async (controller, _id, updateBike) => {
  try {
    const { data } = await axios.put(`/${_id}`, updateBike, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    console.error("Помилка при спробі зміні даних:", error);
  }
};
export const addBike = async (controller, newBike) => {
  try {
    const { data } = await axios.post(`/`, newBike, {
      signal: controller.signal,
    });
    return data;
  } catch (error) {
    console.error("Помилка при спробі додавання даних:", error);
  }
};
