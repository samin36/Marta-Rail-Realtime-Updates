import React, { useState } from "react";
import { Container, Header, Accordion, Icon } from "semantic-ui-react";
import StationCard from "./StationCard";
import StationResults from "./StationResults";

function StationData({ selectedStation }) {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container textAlign="center">
      {selectedStation ? (
        <React.Fragment>
          <Accordion>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
            >
              <Accordion.Content
                style={{ marginTop: "-1.25em", marginBottom: "-1em" }}
              >
                <Icon name="dropdown" color="red" circular />
                <Header
                  as="p"
                  content={selectedStation}
                  style={{ display: "inline-block" }}
                />
              </Accordion.Content>
            </Accordion.Title>
            <Accordion.Content active={activeIndex === 0}>
              <StationCard selectedStation={selectedStation} />
            </Accordion.Content>
          </Accordion>
          <StationResults selectedStation={selectedStation} />
        </React.Fragment>
      ) : null}
    </Container>
  );
}

export default StationData;
