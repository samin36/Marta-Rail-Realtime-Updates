import stationInfo from "./StationInfo";
const apiUrl = "https://martarail-api.vercel.app/";

export const fetchData = async () => {
  const resp = await fetch(apiUrl);
  const data = await resp.json();
  return data;
};

export const getAllStations = async () => {
  const data = await fetchData();
  const list = data
    .filter((record) => record.STATION !== "")
    .map((record) => record.STATION)
    .sort();
  return [...new Set(list)];
};

export const getArrivalsByStations = async (stationName) => {
  let data = await fetchData();
  data = data.filter((record) => record.STATION === stationName.toUpperCase());
  return {
    north: data.filter((record) => record.DIRECTION === "N"),
    south: data.filter((record) => record.DIRECTION === "S"),
    east: data.filter((record) => record.DIRECTION === "E"),
    west: data.filter((record) => record.DIRECTION === "W"),
  };
};

export const getStationData = (stationName) => {
  return stationInfo.find((station) => station.stationName === stationName);
};
