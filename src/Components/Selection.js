import React, { useContext } from "react";
import { Container, Dropdown, Divider } from "semantic-ui-react";
import { StationContext } from "../Context/StationContext";

function Selection() {
  const {
    state: { stationsList, selectedStation },
    setState,
  } = useContext(StationContext);

  const options = stationsList.map((station, index) => {
    return {
      key: index,
      text: station,
      value: station,
    };
  });

  const setSelectedStation = (e, { value }) => {
    setState((prevState) => {
      return { ...prevState, selectedStation: value };
    });
  };

  return (
    <Container text textAlign="center">
      <Divider style={{ margin: "0.5em auto" }} />
      <Dropdown
        loading={stationsList.length === 0 ? true : false}
        onChange={setSelectedStation}
        options={options}
        placeholder="Select a station"
        fluid
        selection
        value={selectedStation}
      />
    </Container>
  );
}

export default Selection;
