import React from 'react';
import { PageStyle, BlobInputContainerSS } from './styled';
import ColorBlob from '../ColorBlob';
import { AuthUserContext, withAuthorization } from '../Session';
import PasswordChangeForm from '../PasswordChange';

const AccountPage = () => (

  <AuthUserContext.Consumer>
    {authUser => (
      <PageStyle>
        <BlobInputContainerSS>
          <ColorBlob/>
        </BlobInputContainerSS>
        <h1>Account: {authUser.email}</h1>
        <PasswordChangeForm />
      </PageStyle>
    )}
  </AuthUserContext.Consumer>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(AccountPage);
