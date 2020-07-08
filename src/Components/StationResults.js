import React, { useState, useEffect, useContext } from "react";
import { Container, Divider, Dimmer, Loader } from "semantic-ui-react";
import { getArrivalsByStations } from "../Data/FetchData";
import StationResult from "./StationResult";
import { StationContext } from "../Context/StationContext";

function StationResults() {
  const {
    state: { selectedStation, hasErrorOccurred },
    setState,
  } = useContext(StationContext);
  const [resultState, setResultState] = useState({
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
    if (results === "ERROR") {
      setState((prevState) => {
        return { ...prevState, hasErrorOccurred: true };
      });
    } else {
      setResultState((prevState) => {
        return { ...prevState, results, isLoading: false };
      });
    }
  };

  useEffect(() => {
    if (selectedStation) {
      setResultState((prevState) => {
        return { ...prevState, isLoading: true };
      });
      clearInterval(resultState.timerID);
      const timerID = setInterval(fetchResults, 1000);
      setResultState((prevState) => {
        return { ...prevState, timerID };
      });
    }
  }, [selectedStation]);

  useEffect(() => {
    if (hasErrorOccurred) {
      clearInterval(resultState.timerID);
      setResultState((prevState) => {
        return { ...prevState, timerID: null, isLoading: false };
      });
    }
  }, [hasErrorOccurred]);

  return (
    <Container fluid>
      <StationResult direction="North" results={resultState.results.north} />
      {resultState.results.south.length > 0 &&
      resultState.results.north.length > 0 ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="South" results={resultState.results.south} />
      {resultState.results.east.length > 0 &&
      (resultState.results.south.length > 0 ||
        resultState.results.north.length > 0) ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="East" results={resultState.results.east} />
      {resultState.results.west.length > 0 &&
      (resultState.results.east.length > 0 ||
        resultState.results.south.length > 0 ||
        resultState.results.north.length > 0) ? (
        <Divider style={{ width: "50%", margin: "0.75em auto" }} />
      ) : null}
      <StationResult direction="West" results={resultState.results.west} />
      <Dimmer active={resultState.isLoading} inverted>
        <Loader inverted>Loading</Loader>
      </Dimmer>
    </Container>
  );
}

export default StationResults;
