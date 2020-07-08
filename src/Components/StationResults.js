import React, { useState, useEffect } from "react";
import { Container, Divider, Dimmer, Loader } from "semantic-ui-react";
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
    isLoading: false,
  });

  const fetchResults = async () => {
    const results = await getArrivalsByStations(selectedStation);
    setState((prevState) => {
      return { ...prevState, results, isLoading: false };
    });
  };

  useEffect(() => {
    if (selectedStation) {
      setState((prevState) => {
        return { ...prevState, isLoading: true };
      });
      clearInterval(state.timerID);
      const timerID = setInterval(fetchResults, 1000);
      setState((prevState) => {
        return { ...prevState, timerID };
      });
    }
  }, [selectedStation]);

  return (
    <Container fluid>
      <StationResult direction="North" results={state.results.north} />
      {state.results.south.length > 0 && state.results.north.length > 0 ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="South" results={state.results.south} />
      {state.results.east.length > 0 &&
      (state.results.south.length > 0 || state.results.north.length > 0) ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="East" results={state.results.east} />
      {state.results.west.length > 0 &&
      (state.results.east.length > 0 ||
        state.results.south.length > 0 ||
        state.results.north.length > 0) ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="West" results={state.results.west} />
      <Dimmer active={state.isLoading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Container>
  );
}

export default StationResults;
