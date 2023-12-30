import "./bikeList.css";
import { IoCloseSharp } from "react-icons/io5";

export const BikesList = ({ bikes, deleteBikes }) => {
  return (
    <ul className="bike-list">
      {bikes.map(({ name, number, type, color, _id, price, status }) => (
        <li key={_id} className="bike-item">
          <div className="info-block">
            <div className="bike-name">
              <h3 className="bike-title">{name}</h3>{" "}
              <p className="bike-type">
                &nbsp;- {type}&nbsp; &#40;{color}&#41;
              </p>
            </div>
            <p className="bike-id">ID:{number}</p>
            <p className="bike-status">STATUS: {status}</p>
          </div>
          <div className="price-block">
            <button
              type="button"
              onClick={() => deleteBikes(_id)}
              className="button-delete"
            >
              <IoCloseSharp />
            </button>
            <p className="price">{price}.00 UAH/hr</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
