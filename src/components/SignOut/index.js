import React from 'react';
import { withFirebase } from '../Firebase';
import { DropdownItem } from 'reactstrap';
import { SignOutS } from './styled'

const SignOutButton = ({ firebase }) => (
  <SignOutS type="button" onClick={firebase.doSignOut}>
    Sign Out
  </SignOutS>

);

export default withFirebase(SignOutButton);
