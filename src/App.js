import "./App.css";
import { useState, useEffect } from "react";
import { Loader } from "./components/loader/loader";
// import { useFetchBikes } from "./hooks/useFetchBikes";
import { BikesList } from "./components/bikesList/bikesList";
import {
  getAllBikes,
  deleteBike,
  changeBike,
  addBike,
} from "./service/bikeServiceAPI";
import { FormAddBike } from "./components/formAddBike/formAddBike";

function App() {
  // const { bikesList, isLoading, error, deleteBikes } = useFetchBikes();

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

  const deleteBikes = async (id) => {
    const controller = new AbortController();
    try {
      const deletedBike = await deleteBike(controller, id);
      console.log("delete bike", deletedBike);
    } catch (error) {
      setError(error.message);
    } finally {
      setBikesList((prev) => prev.filter((e) => e._id !== id));
      controller.abort();
    }
  };
  const updateBike = async (_id, newStatusBike) => {
    const controller = new AbortController();
    try {
      const updatedBike = await changeBike(controller, _id, newStatusBike);
      if (updatedBike) {
        setBikesList((prev) =>
          prev.map((bike) =>
            bike._id === _id ? { ...bike, status: newStatusBike.status } : bike
          )
        );
      }
    } catch (error) {
      setError(error.message);
    } finally {
      controller.abort();
    }
  };
  const newBike = async (newBike) => {
    console.log(newBike);
    const controller = new AbortController();
    try {
      const addedNewBike = await addBike(controller, newBike);
      if (addedNewBike) {
        setBikesList((prevBikesList) => [...prevBikesList, addedNewBike]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      controller.abort();
    }
  };

  return (
    <div className="App">
      <header className="App-header">Admin. Bicycle booking service</header>
      <main>
        <section className="section-main">
          <div className="bike-list-div">
            {isLoading && <Loader />}
            {error && <h2>{error}</h2>}
            {bikesList.length && (
              <BikesList
                bikes={bikesList}
                deleteBikes={deleteBikes}
                updateBike={updateBike}
              />
            )}
          </div>
          <div>
            <FormAddBike newBike={newBike} />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
