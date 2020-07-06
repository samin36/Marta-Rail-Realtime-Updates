import React, { useState, useEffect } from "react";
import { getStationData } from "../Data/FetchData";
import { Card, Container, Image, Label, Icon } from "semantic-ui-react";

function StationCard({ selectedStation }) {
  const [stationInfo, setStationInfo] = useState(null);

  useEffect(() => {
    setStationInfo(getStationData(selectedStation));
  }, [selectedStation]);

  return (
    <Container style={{ marginTop: "1em" }}>
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
            <Label as="a" href={stationInfo.moreInfo}>
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
