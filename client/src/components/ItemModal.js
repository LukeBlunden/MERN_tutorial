import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../actions/itemActions";

const ItemModal = (props) => {
  const [modal, setModal] = useState(false);
  const [name, setName] = useState("");
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    // Add item via addItem action
    dispatch(addItem({ name }));
    setModal(false);
  };

  return (
    <div>
      <Button
        color="dark"
        style={{ marginBottom: "2rem" }}
        onClick={() => setModal(!modal)}
      >
        Add item
      </Button>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Add to shopping list
        </ModalHeader>
        <ModalBody>
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="item">Item</Label>
              <Input
                type="text"
                name="name"
                id="item"
                placeholder="Add shopping item"
                onChange={(e) => setName(e.target.value)}
              />
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Add item
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default ItemModal;
