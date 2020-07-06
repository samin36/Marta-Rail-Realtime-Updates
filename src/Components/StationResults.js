import React, { useState, useEffect } from "react";
import { Container } from "semantic-ui-react";
import { getArrivalsByStations } from "../Data/FetchData";
import StationResult from "./StationResult";

function StationResults({ selectedStation }) {
  const [state, setState] = useState({
    results: {
      north: [],
      south: [],
      east: [],
      west: [],
    },
    timerID: null,
  });

  const fetchResults = async () => {
    const results = await getArrivalsByStations(selectedStation);
    setState((prevState) => {
      return { ...prevState, results };
    });
  };

  useEffect(() => {
    if (selectedStation) {
      clearInterval(state.timerID);
      const timerID = setInterval(fetchResults, 1000);
      setState((prevState) => {
        return { ...prevState, timerID };
      });
    }
  }, [selectedStation]);

  return (
    <Container>
      <StationResult direction="North" results={state.results.north} />
      <StationResult direction="South" results={state.results.south} />
      <StationResult direction="East" results={state.results.east} />
      <StationResult direction="West" results={state.results.west} />
    </Container>
  );
}

export default StationResults;
