import "./bikeList.css";
// import { IoCloseSharp } from "react-icons/io5";
import { getBgColor } from "../../helpers/changeColor";

export const BikesList = ({ bikes, deleteBikes, updateBike }) => {
  return (
    <ul className="bike-list">
      {bikes.map(({ name, number, type, color, _id, price, status, wheel }) => (
        <li
          key={_id}
          className="bike-item"
          style={{ borderColor: getBgColor(status) }}
          disabled={status === "Unavailable"}
        >
          <div className="info-block">
            <div className="bike-name">
              <h3 className="bike-title">{name}</h3>{" "}
              <p className="bike-type">
                &nbsp;- {type}&nbsp; &#40;{color}&#41;
              </p>
            </div>
            <p className="bike-id">ID:{number}</p>
            <label className="bike-status">
              STATUS:{" "}
              <select
                className="select-status"
                name="status"
                value={status}
                onChange={(e) =>
                  updateBike(_id, {
                    name: name,
                    number: number,
                    type: type,
                    color: color,
                    price: price,
                    wheel: wheel,
                    status: e.target.value,
                  })
                }
              >
                <option value="Available">Available</option>
                <option value="Busy">Busy</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </label>
          </div>
          <div className="price-block">
            <button
              type="button"
              onClick={() => deleteBikes(_id)}
              className="button-delete"
            >
              X{/* <IoCloseSharp /> */}
            </button>
            <p className="price">{price}.00 UAH/hr</p>
          </div>
        </li>
      ))}
    </ul>
  );
};
