import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/authActions";
import { NavLink } from "reactstrap";
import PropTypes from "prop-types";

const Logout = (props) => {
  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <NavLink onClick={() => dispatch(logout())} href="#">
        Logout
      </NavLink>
    </React.Fragment>
  );
};

Logout.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default Logout;
