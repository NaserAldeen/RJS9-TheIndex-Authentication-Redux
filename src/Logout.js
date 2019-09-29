import { logout } from "./store/actions";

import React from "react";
import { connect } from "react-redux";

const Logout = props => {
  return (
    <button className="btn btn-danger" onClick={() => props.logout()}>
      Logout {props.user.username}
    </button>
  );
};
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
const mapStateToProps = state => ({
  user: state.rootAuth
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
