import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from './store';

const mapDispatchToProps = dispatch => {
  return { loginUser: userLogin => dispatch(login(userLogin)) };
};

const Login = props => {
  const state = {
    email: '',
    password: '',
  };
  const onChange = ev => {
    state[ev.target.name] = ev.target.value;
  };
  const onSubmit = ev => {
    ev.preventDefault();
    props.loginUser(state);
  };
  return (
    <div className="h100 w100 flex column align-items-center justify-center">
      <h1>Let's Loggin'!</h1>
      <div className="flex w50">
        <img src="/loggin.png" />
        <form className="grow1" onSubmit={onSubmit}>
          <div className="flex column">
            <div className="flex column m1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                className="input"
                onChange={onChange}
              />
            </div>
            <div className="flex column m1">
              <label htmlFor="email">Password</label>
              <input
                type="password"
                name="password"
                className="input"
                onChange={onChange}
              />
            </div>
            <div className="m1">
              <button type="submit" className="btn bg-blue white p1 rounded">
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default connect(
  null,
  mapDispatchToProps
)(Login);
