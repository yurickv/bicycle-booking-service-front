const sortBikes = (bikes) => {
  const statusOrder = { Available: 1, Busy: 2, Unavailable: 3 };

  return bikes.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);
};

export default sortBikes;
