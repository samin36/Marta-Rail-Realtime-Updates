import React, { useContext } from "react";
import { StationContext } from "../Context/StationContext";
import { Container, List, Divider, Button } from "semantic-ui-react";

function Favorites() {
  const {
    state: { favoriteStations },
    setState,
  } = useContext(StationContext);

  const handleFavoriteClick = (e, { content }) => {
    setState((prevState) => {
      return { ...prevState, selectedStation: content };
    });
  };

  return (
    <Container fluid textAlign="center">
      {favoriteStations.length > 0 && (
        <>
          <Divider style={{ marginBottom: "0.5em" }} />
          <List horizontal selection>
            {favoriteStations.map((fav) => (
              <List.Item key={fav}>
                <Button
                  positive
                  content={fav}
                  compact
                  size="mini"
                  onClick={handleFavoriteClick}
                />
              </List.Item>
            ))}
          </List>
        </>
      )}
    </Container>
  );
}

export default Favorites;
