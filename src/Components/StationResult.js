import React from "react";
import { Container, Header, Divider, Segment, Label } from "semantic-ui-react";

function StationResult({ direction, results }) {
  const parseStatus = (waitingTime) => {
    if (waitingTime === "Arrived") {
      return "has arrived";
    } else if (waitingTime === "Arriving") {
      return "is arriving now";
    } else if (waitingTime === "Boarding") {
      return "is boarding";
    } else {
      return `is arriving in ${waitingTime}`;
    }
  };
  const parseColor = (color) => {
    return color === "GOLD" ? "yellow" : color.toLowerCase();
  };

  return (
    <Container fluid>
      <Header as="h3" color="blue" content={`${direction} Bound`} />
      <Divider style={{ marginBottom: "0" }} />
      {results ? (
        <Segment.Group compact stacked>
          {results.map((train, index) => (
            <Segment
              key={index}
              clearing
              color={parseColor(train.LINE)}
              attached="bottom"
            >
              <Header as="h4">
                <Label
                  circular
                  color={parseColor(train.LINE)}
                  content={direction.charAt(0)}
                  style={{ marginRight: ".5em" }}
                />
                <Header.Content>
                  Train to {train.DESTINATION} {parseStatus(train.WAITING_TIME)}
                </Header.Content>
              </Header>
            </Segment>
          ))}
        </Segment.Group>
      ) : null}
    </Container>
  );
}

export default StationResult;
