import { useState, useEffect } from "react";
import { getAllBikes } from "../service/bikeServiceAPI";

export const useFetchBikes = () => {
  const [bikesList, setBikesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchedBikes = await getAllBikes(controller);
        setBikesList(fetchedBikes);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        controller.abort();
      }
    };
    fetchData();
    // return () => {
    //     controller.abort();
    // };
  }, []);

  const deleteBikes = (id) => {
    setBikesList((prev) => prev.filter((e) => e.number !== id));
    //  bikesList.filter((e) => e.number !== id);
    console.log("delete");
  };

  return { bikesList, isLoading, error, deleteBikes };
};
