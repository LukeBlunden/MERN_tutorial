import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert,
} from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorActions";
import { useCallback } from "react";

const LoginModal = (props) => {
  const [modal, setModal] = useState(false);
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [msg, setMsg] = useState(null);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const toggle = useCallback(() => {
    dispatch(clearErrors());
    setModal((modal) => !modal);
  }, [dispatch]);

  useEffect(() => {
    error.id === "LOGIN_FAIL" ? setMsg(error.msg.msg) : setMsg(null);
  }, [error]);

  useEffect(() => {
    if (modal && isAuthenticated) {
      toggle();
    }
  }, [modal, isAuthenticated, toggle]);

  const onSubmit = (e) => {
    e.preventDefault();
    // Attempt to login
    dispatch(login(info));
  };

  return (
    <div>
      <NavLink onClick={() => setModal(!modal)} href="#">
        Login
      </NavLink>

      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Login</ModalHeader>
        <ModalBody>
          {msg ? <Alert color="danger">{msg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                className="mb-3"
                placeholder="Email"
                onChange={(e) => setInfo({ ...info, email: e.target.value })}
              />
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                className="mb-3"
                placeholder="Password"
                onChange={(e) => setInfo({ ...info, password: e.target.value })}
              />
              <Button
                type="submit"
                color="dark"
                style={{ marginTop: "2rem" }}
                block
              >
                Login
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
};

LoginModal.propTypes = {
  isAuthenticated: PropTypes.bool,
  error: PropTypes.object,
  login: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

export default LoginModal;
