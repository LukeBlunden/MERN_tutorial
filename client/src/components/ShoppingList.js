import React, { useEffect } from "react";
import { Container, ListGroup, ListGroupItem, Button } from "reactstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useSelector, useDispatch } from "react-redux";
import { deleteItem, getItems } from "../actions/itemActions";

const ShoppingList = (props) => {
  const items = useSelector((state) => state.item.items);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getItems())
  }, [])

  return (
    <Container>
      <ListGroup>
        <TransitionGroup className="shopping-list">
          {items.map((item) => (
            <CSSTransition key={item._id} timeout={500} classNames="fade">
              <ListGroupItem>
                <Button
                  className="remove-btn"
                  color="danger"
                  size="sm"
                  onClick={() => dispatch(deleteItem(item._id))}
                >
                  &times;
                </Button>
                {item.name}
              </ListGroupItem>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </ListGroup>
    </Container>
  );
};

export default ShoppingList;
