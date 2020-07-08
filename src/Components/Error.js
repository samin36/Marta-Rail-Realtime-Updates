import React from "react";
import { Modal, Icon, Header } from "semantic-ui-react";

function Error() {
  return (
    <Modal open>
      <Modal.Header>
        <Header as="h1" content="An Error Occurred" textAlign="center" />
      </Modal.Header>
      <Modal.Content>
        <Header as="p" textAlign="center" icon>
          <Icon name="info" size="massive" circular color="red" inverted />
          Something is wrong. Please check back later.
        </Header>
      </Modal.Content>
    </Modal>
  );
}

export default Error;
