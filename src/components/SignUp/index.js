import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpS, BlobInputContainerSS, StyledDiv, ButtonS, SignUpFormS } from './styled'
import { SignInLink } from '../SignIn'
import ColorBlob from '../ColorBlob'
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../Constants/routes';

const SignUpPage = () => (
  <StyledDiv>
    <h1 id="test-title-signup">Sign Up</h1>
    <SignUpForm />
  </StyledDiv>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE }
  }

  onSubmit = (event) => {
    event.preventDefault();
    const { email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.props.history.push(ROUTES.NEW_DREAM);
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error,
    } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <BlobInputContainerSS id='happy'>
          <ColorBlob
          leftAlign={-3}
          topAlign={2}
          />
        </BlobInputContainerSS>
        <SignUpFormS
          id="test-input-username"
          name="username"
          value={username}
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <SignUpFormS
        id="test-input-email"
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <br/>
        <SignUpFormS
          id="test-input-passwordone"
          name="passwordOne"
          value={passwordOne}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <SignUpFormS
          id="test-input-passwordtwo"
          name="passwordTwo"
          value={passwordTwo}
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <ButtonS id="test-button-signup-submit" disabled={isInvalid} type="submit">
          Sign Up
        </ButtonS>
        <SignInLink/>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

const SignUpLink = () => (
  <SignUpS>
    {`Don't have an account?`} <Link id="test-link-signup" to={ROUTES.SIGN_UP}>Sign Up</Link>
  </SignUpS>
);

const SignUpForm = compose(
  withRouter,
  withFirebase,
  )(SignUpFormBase);

export default SignUpPage;

export { SignUpForm, SignUpLink };
