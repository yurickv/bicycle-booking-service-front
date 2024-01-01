import "./App.css";
import { useState, useEffect } from "react";
import { Loader } from "./components/loader/loader";
// import { useFetchBikes } from "./hooks/useFetchBikes";
import { BikesList } from "./components/bikesList/bikesList";
import { FormAddBike } from "./components/formAddBike/formAddBike";
import { Statistic } from "./components/statistic/statistic";
import {
  getAllBikes,
  deleteBike,
  changeBike,
  addBike,
} from "./service/bikeServiceAPI";
import sortBikes from "./helpers/sortBikesList";

function App() {
  // const { bikesList, isLoading, error, deleteBikes } = useFetchBikes();

  const [bikesList, setBikesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [statistic, setStatistic] = useState({});

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const fetchedBikes = await getAllBikes(controller);
        setStatistic(fetchedBikes.statistic);
        setBikesList(sortBikes(fetchedBikes.data));
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
        controller.abort();
      }
    };
    fetchData();
  }, []);

  const deleteBikes = async (id) => {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this bike?"
    );

    if (!shouldDelete) {
      return;
    }
    const controller = new AbortController();
    try {
      const deletedBike = await deleteBike(controller, id);
      if (deletedBike) {
        setError(null);
        setIsLoading(true);

        const fetchedBikes = await getAllBikes(controller);
        setStatistic(fetchedBikes.statistic);
        setBikesList(sortBikes(fetchedBikes.data));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      controller.abort();
    }
  };
  const updateBike = async (_id, newStatusBike) => {
    const controller = new AbortController();
    try {
      const updatedBike = await changeBike(controller, _id, newStatusBike);
      if (updatedBike) {
        // setBikesList((prev) =>
        //   prev.map((bike) =>
        //     bike._id === _id ? { ...bike, status: newStatusBike.status } : bike
        //   )
        // );
        setError(null);
        setIsLoading(true);

        const fetchedBikes = await getAllBikes(controller);
        setStatistic(fetchedBikes.statistic);
        setBikesList(sortBikes(fetchedBikes.data));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      controller.abort();
    }
  };
  const newBike = async (newBike) => {
    const existingBike = bikesList.find(
      (bike) => bike.number === newBike.number
    );
    if (existingBike) {
      alert(`Bike with ID ${newBike.number} already exists.`);
      return;
    }

    const controller = new AbortController();
    try {
      const addedNewBike = await addBike(controller, newBike);
      if (addedNewBike) {
        // setBikesList((prevBikesList) => [...prevBikesList, addedNewBike]);
        setError(null);
        setIsLoading(true);
        const fetchedBikes = await getAllBikes(controller);
        setStatistic(fetchedBikes.statistic);
        setBikesList(sortBikes(fetchedBikes.data));
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
      controller.abort();
    }
  };

  return (
    <>
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
          <div className="bike-service-div">
            <FormAddBike newBike={newBike} />
            <Statistic statistic={statistic} />
          </div>
        </section>
      </main>
      <footer className="App-footer">
        <p>&copy; 2023 Bicycle Booking Service</p>
        <h3 className="author">
          Developer: <span className="author-name">Teslyuk Yuriy</span>
        </h3>
      </footer>
    </>
  );
}

export default App;
