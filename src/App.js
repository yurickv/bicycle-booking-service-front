import "./App.css";
import { useState, useEffect } from "react";
import { Loader } from "./components/loader/loader";
// import { useFetchBikes } from "./hooks/useFetchBikes";
import { BikesList } from "./components/bikesList/bikesList";
import { getAllBikes, deleteBike } from "./service/bikeServiceAPI";

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
    console.log(id);
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

  return (
    <div className="App">
      <header className="App-header">Admin</header>
      <main>
        <section className="section-main">
          {" "}
          <h1>Bicycle booking service</h1>
          {isLoading && <Loader />}
          {error && <h2>{error}</h2>}
          {bikesList.length && (
            <BikesList bikes={bikesList} deleteBikes={deleteBikes} />
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
