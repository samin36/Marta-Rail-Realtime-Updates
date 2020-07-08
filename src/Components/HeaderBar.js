import React, { useState } from "react";
import {
  Header,
  Icon,
  Accordion,
  Container,
  Message,
  Item,
} from "semantic-ui-react";

function HeaderBar() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container textAlign="center">
      <Header as="h2" textAlign="center" color="red">
        Marta Rail Realtime Updates
      </Header>
      <Accordion style={{ marginTop: "-1em" }}>
        <Accordion.Title
          active={activeIndex === 0}
          index={0}
          onClick={handleClick}
        >
          <Icon name="dropdown" />
          <Icon name="train" circular />
        </Accordion.Title>
        <Accordion.Content active={activeIndex === 0}>
          <Message info>
            <Message.Header>Thanks for checking this out!</Message.Header>
            <p>
              If you have any suggestions, please contact me using the links
              below!
            </p>
            <Message.Content>
              <Item as="a" href="https://github.com/samin36" target="_blank">
                <Icon name="github" circular />
              </Item>
              <Item as="a" href="mailto:shreyamin75@gmail.com">
                <Icon name="mail" circular />
              </Item>
              <Item
                as="a"
                href="https://github.com/samin36/Marta-Rail-Realtime-Updates"
                target="_blank"
              >
                <Icon name="code" circular />
              </Item>
            </Message.Content>
          </Message>
        </Accordion.Content>
      </Accordion>
    </Container>
  );
}

export default HeaderBar;
