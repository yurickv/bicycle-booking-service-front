import "./App.css";
import { Loader } from "./components/loader/loader";
import { useFetchBikes } from "./hooks/useFetchBikes";
import { BikesList } from "./components/bikesList/bikesList";

function App() {
  const { bikesList, isLoading, error, deleteBikes } = useFetchBikes();

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
