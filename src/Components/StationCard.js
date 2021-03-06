import React, { useState, useEffect, useContext } from "react";
import { getStationData } from "../Data/FetchData";
import { Card, Container, Image, Label, Icon } from "semantic-ui-react";
import { StationContext } from "../Context/StationContext";

function StationCard() {
  const {
    state: { selectedStation },
  } = useContext(StationContext);
  const [stationInfo, setStationInfo] = useState(null);

  useEffect(() => {
    setStationInfo(getStationData(selectedStation));
  }, [selectedStation]);

  return (
    <Container style={{ marginTop: "1em", marginBottom: "0.75em" }} fluid>
      {stationInfo ? (
        <Card centered raised>
          <Image src={stationInfo.image} wrapped />
          <Card.Content textAlign="center">
            <Card.Header>{stationInfo.selectedStation}</Card.Header>
            <Card.Description>
              <p>{stationInfo.address}</p>
              <Label color="blue" as="a" href={`tel:${stationInfo.phone}`}>
                <Icon name="phone" />
                {stationInfo.phone}
              </Label>
            </Card.Description>
          </Card.Content>
          <Card.Content extra textAlign="center">
            <Label as="a" href={stationInfo.moreInfo} target="_blank">
              <Icon name="info" />
              More Info
            </Label>
          </Card.Content>
        </Card>
      ) : null}
    </Container>
  );
}

export default StationCard;
