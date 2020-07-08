import React from "react";
import { Container, Header, Segment, Label } from "semantic-ui-react";

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
      {results.length > 0 ? (
        <Segment.Group compact raised>
          <Header
            as="h3"
            color="blue"
            content={`${direction} Bound`}
            style={{ padding: "0.3em", margin: "0em" }}
          />
          {results.map((train, index) => (
            <Segment
              key={index}
              clearing
              color={parseColor(train.LINE)}
              style={{ padding: "0.75em", margin: "0em" }}
            >
              <Header
                as="h4"
                style={{
                  padding: "0em",
                  margin: "0em",
                  display: "inline-block",
                }}
              >
                <Label
                  circular
                  color={parseColor(train.LINE)}
                  content={direction.charAt(0)}
                  style={{ marginRight: ".5em", display: "inline-block" }}
                />
                <Header.Content style={{ display: "inline-block" }}>
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
