import React, { useState } from "react";
import {
  Header,
  Icon,
  Divider,
  Accordion,
  Container,
  Message,
} from "semantic-ui-react";

function HeaderBar() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;
    setActiveIndex(newIndex);
  };

  return (
    <Container textAlign="center" text>
      <Header as="h1" textAlign="center" color="red">
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
              If you have any suggestions, please email me at:
              shreyamin75@gmail.com
            </p>
          </Message>
        </Accordion.Content>
      </Accordion>
      <Divider />
    </Container>
  );
}

export default HeaderBar;
