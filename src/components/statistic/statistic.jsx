import "./statistic.css";

export const Statistic = ({ statistic }) => {
  console.log(statistic);

  return (
    <div style={{ textAlign: "start" }}>
      <h2 className="title-stat">STATISTICS</h2>
      <ul>
        <li className="stat-item">
          Total bikes: <span className="stat-value">0{}</span>
        </li>
        <li className="stat-item">
          Available Bikes: <span className="stat-value">0{}</span>
        </li>
        <li className="stat-item">
          Booked Bikes: <span className="stat-value">0{}</span>
        </li>
        <li className="stat-item">
          Average bike cost: <span className="stat-value">0{}</span>UAH/hr.
        </li>
      </ul>
    </div>
  );
};
