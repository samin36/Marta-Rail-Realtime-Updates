import React, { useState, useEffect } from "react";
import { Grid } from "semantic-ui-react";
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
      const timerID = setInterval(fetchResults, 500);
      setState((prevState) => {
        return { ...prevState, timerID };
      });
    }
  }, [selectedStation]);

  return (
    <React.Fragment>
      <Grid celled stackable>
        <Grid.Row columns={2}>
          <Grid.Column>
            <StationResult direction="North" results={state.results.north} />
          </Grid.Column>
          <Grid.Column>
            <StationResult direction="South" results={state.results.south} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={2}>
          <Grid.Column>
            <StationResult direction="East" results={state.results.east} />
          </Grid.Column>
          <Grid.Column>
            <StationResult direction="West" results={state.results.west} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </React.Fragment>
  );
}

export default StationResults;
