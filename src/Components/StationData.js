import React, { useState, useContext } from "react";
import { Container, Header, Accordion, Icon, Rating } from "semantic-ui-react";
import StationCard from "./StationCard";
import StationResults from "./StationResults";
import { StationContext } from "../Context/StationContext";

function StationData() {
  const {
    state: { selectedStation, favoriteStations },
    setState,
  } = useContext(StationContext);
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, { index }) => {
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  const handleFavorites = (e, { rating }) => {
    if (rating === 1) {
      setState((prevState) => {
        const newFavorites = prevState.favoriteStations.slice();
        newFavorites.push(selectedStation);
        return { ...prevState, favoriteStations: newFavorites };
      });
    } else if (rating === 0) {
      setState((prevState) => {
        const newFavorites = prevState.favoriteStations.filter(
          (station) => station !== selectedStation
        );
        return { ...prevState, favoriteStations: newFavorites };
      });
    }
  };

  return (
    <Container textAlign="center">
      {selectedStation && (
        <React.Fragment>
          <Accordion fluid>
            <Accordion.Title
              active={activeIndex === 0}
              index={0}
              onClick={handleClick}
              style={{ display: "inline-block" }}
            >
              <Accordion.Content style={{ marginTop: "-1.25em" }}>
                <Icon name="dropdown" color="red" circular />
                <Header as="p" style={{ display: "inline-block" }}>
                  {selectedStation}
                </Header>
              </Accordion.Content>
            </Accordion.Title>
            <Rating
              icon="star"
              size="huge"
              onRate={handleFavorites}
              rating={
                favoriteStations.find((station) => station === selectedStation)
                  ? 1
                  : 0
              }
            />
            <Accordion.Content active={activeIndex === 0}>
              <StationCard />
            </Accordion.Content>
          </Accordion>
          <StationResults />
        </React.Fragment>
      )}
    </Container>
  );
}

export default StationData;
