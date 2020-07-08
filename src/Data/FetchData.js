import stationInfo from "./StationInfo";
const apiUrl = "https://martarail-api.vercel.app/";

const timeoutPromise = (milliseconds, promise) => {
  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      reject(new Error("TIMEOUT"));
    }, milliseconds);
    promise
      .then((res) => {
        clearTimeout(timeoutID);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timeoutID);
        reject(err);
      });
  });
};

const fetchData = async () => {
  try {
    const resp = await timeoutPromise(10 * 1000, fetch(apiUrl));
    const data = await resp.json();
    return data;
  } catch (error) {
    return error;
  }
};

const formatStationName = (stationName) => {
  return stationName.replace("STATION", "").trim();
};

export const getAllStations = async () => {
  try {
    const data = await fetchData();
    const list = data
      .filter((record) => record.STATION !== "")
      .map((record) => formatStationName(record.STATION))
      .sort();
    return [...new Set(list)];
  } catch (error) {
    return null;
  }
};

export const getArrivalsByStations = async (stationName) => {
  try {
    let data = await fetchData();
    data = data.filter(
      (record) =>
        formatStationName(record.STATION) === stationName.toUpperCase()
    );
    return {
      north: data.filter((record) => record.DIRECTION === "N"),
      south: data.filter((record) => record.DIRECTION === "S"),
      east: data.filter((record) => record.DIRECTION === "E"),
      west: data.filter((record) => record.DIRECTION === "W"),
    };
  } catch (error) {
    return "ERROR";
  }
};

export const getStationData = (stationName) => {
  return stationInfo.find((station) => station.stationName === stationName);
};
