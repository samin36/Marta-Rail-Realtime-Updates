import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import SearchBar from "./SearchBar";
import StationData from "./StationData";
import { getAllStations } from "../Data/FetchData";

function App() {
  const [state, setState] = useState({
    stationsList: [],
    selectedStation: "",
  });

  const fetchStationsList = async () => {
    const stationsList = await getAllStations();
    setState((prevState) => {
      return { ...prevState, stationsList };
    });
  };

  useEffect(() => {
    fetchStationsList();
  }, []);

  const setSelectedStation = (e, { value }) => {
    setState((prevState) => {
      return { ...prevState, selectedStation: value };
    });
  };

  return (
    <Container fluid>
      <HeaderBar />
      <SearchBar
        stationsList={state.stationsList}
        selectedStation={state.selectedStation}
        setSelectedStation={setSelectedStation}
      />
      <StationData selectedStation={state.selectedStation} />
    </Container>
  );
}

export default App;
