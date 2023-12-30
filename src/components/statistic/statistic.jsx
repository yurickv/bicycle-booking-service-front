import "./statistic.css";

export const Statistic = ({ statistic }) => {
  return (
    <div style={{ textAlign: "start" }}>
      <h2 className="title-stat">STATISTICS</h2>
      <ul>
        <li className="stat-item">
          Total Bikes:{" "}
          <span className="stat-value">{statistic.totalObjects}</span>
        </li>
        <li className="stat-item">
          Available Bikes:{" "}
          <span className="stat-value">{statistic.availableCount}</span>
        </li>
        <li className="stat-item">
          Booked Bikes:{" "}
          <span className="stat-value">{statistic.busyCount}</span>
        </li>
        <li className="stat-item">
          Average bike cost:{" "}
          <span className="stat-value">{statistic.averagePrice}</span>
          UAH/hr.
        </li>
      </ul>
    </div>
  );
};
