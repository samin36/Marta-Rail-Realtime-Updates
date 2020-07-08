import React from "react";
import { Container, Dropdown } from "semantic-ui-react";

function Selection({ stationsList, selectedStation, setSelectedStation }) {
  const options = stationsList.map((station, index) => {
    return {
      key: index,
      text: station,
      value: station,
    };
  });

  return (
    <Container text textAlign="center">
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
