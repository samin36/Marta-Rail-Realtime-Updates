import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import Selection from "./Selection";
import StationData from "./StationData";
import { getAllStations } from "../Data/FetchData";
import { StationContext } from "../Context/StationContext";
import Favorites from "./Favorites";
import Error from "./Error";

function App() {
  const [state, setState] = useState({
    stationsList: [],
    selectedStation: "",
    favoriteStations: [],
    hasErrorOccurred: false,
  });

  const fetchStationsList = async () => {
    const stationsList = await getAllStations();
    if (stationsList) {
      setState((prevState) => {
        return { ...prevState, stationsList };
      });
    } else {
      setState((prevState) => {
        return { ...prevState, hasErrorOccurred: true };
      });
    }
  };

  useEffect(() => {
    const data = localStorage.getItem("favoriteStations");
    if (data) {
      setState((prevState) => {
        return { ...prevState, favoriteStations: JSON.parse(data) };
      });
    }
    fetchStationsList();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "favoriteStations",
      JSON.stringify(state.favoriteStations)
    );
  });

  return (
    <Container style={{ padding: "1em" }} fluid>
      {state.hasErrorOccurred && <Error />}
      <HeaderBar />
      <StationContext.Provider
        value={{
          state,
          setState,
        }}
      >
        <Favorites />
        <Selection />
        <StationData />
      </StationContext.Provider>
    </Container>
  );
}

export default App;
