import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import HeaderBar from "./HeaderBar";
import Selection from "./Selection";
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
    <Container
      style={{
        padding: "1em",
      }}
      fluid
    >
      <HeaderBar />
      <Selection
        stationsList={state.stationsList}
        selectedStation={state.selectedStation}
        setSelectedStation={setSelectedStation}
      />
      <StationData selectedStation={state.selectedStation} />
    </Container>
  );
}

export default App;
