import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import deepai from 'deepai';
import { Link } from 'react-router-dom';

import ColorBlob from '../ColorBlob';
import { AuthUserContext, withAuthorization } from '../Session';

const { 
  REACT_APP_BACKEND_URL,
  REACT_APP_DD_API_KEY  
} = process.env;

deepai.setApiKey(REACT_APP_DD_API_KEY);

class ArchivePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.firebase.auth.O,
      dreams: []
    };
  }

  componentDidMount() {
    const { userId } = this.state;
    fetch(`${REACT_APP_BACKEND_URL}/dreams/?userId=${userId}`)
      .then(response => response.json())
      .then((myJson) => {
        this.setState({dreams: myJson});
      })
  }

  callToDeep =  async (i) => {
    const dreams = this.state.dreams.slice();
    const images = await Promise.all(dreams[i].images.map(async (obj, i) => {
      const resp = await deepai.callStandardApi("neural-style", {
        style: 'http://www.suttonmemorial.com/pht/2014-08-21-William%20D%20Bill%20Bergen.jpg',
        content: obj.url
      });
      obj.url = resp.output_url;
      obj.dreamed = true
      return obj;
    }))
    dreams[i].images = images
    this.setState({dreams, loading: false})
  }

  deepDreamOnClick = async (e, i) => {
    this.callToDeep(i)
    this.setState({loading: true})
  }

  render() {
    return(
      <PageStyle>
        <BlobInputContainerS>
          <ColorBlob leftAlign={0} topAlign={0}/>
        </BlobInputContainerS>
        <AuthUserContext.Consumer>
          {authUser => (
            <ArchiveDivS>
              <ArchiveTitle id="test-dreamarchive-user-h1">Dream Archive for {authUser.email}</ArchiveTitle>
              <BlobInputContainerSS>
                <ColorBlob/>
              </BlobInputContainerSS>
              {!this.state.dreams.length &&
                <p>Looks like you haven't journaled any dreams yet!
                Click New Dream to get started!</p>
              }
              {this.state.dreams.map( (dream, index) =>
                <DreamDiv key={dream._id} >
                  <TitleRowDiv>
                    <DreamTitle>{dream.title}</DreamTitle>
                    <button onClick={(e) => this.deepDreamOnClick(e, index)}>AButton</button>
                    <Link to={{
                      pathname: './editDream',
                      state: {
                        title: dream.title,
                        content: dream.content,
                        _id: dream._id,
                        userId: dream.userId,
                        images: dream.images,
                      }
                    }}>Edit Dream</Link>
                  </TitleRowDiv>
                  <StyledHR />
                  <ContentRowDiv>
                    <p>{dream.content}</p>
                  </ContentRowDiv>
                  <StyledHR />
                  <ImgRowDiv>
                    {!!dream.images.length &&
                      dream.images.map( (image) => 
                        <StyledImg dreamed src={image.url} key={image._id}/>)
                    }
                  </ImgRowDiv>
                </DreamDiv>
              )}
            </ArchiveDivS>
          )}
        </AuthUserContext.Consumer>
      </PageStyle>
    )
  }
}

const ArchiveDivS = styled.div`
  position: relative;
  top: -85px;
  left: -10px;
`

const BlobInputContainerS = styled.div`
  display: inline-block;
  position: relative;
`

const ArchiveTitle = styled.h1`
  font-family: serif;
  color: gray;
  font-size: xx-large;
  font-weight: 900;
  background: transparent;
`
const DreamTitle = styled.h2`
  font-family: serif;
  color: gray;
  font-size: xx-large;
  font-weight: 900;
`

const BlobInputContainerSS = styled.div`
  z-index: -1;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 250%;
  height: 50%;
  transform: scale(10);
  overflow: hidden;
`

const StyledImg = styled.img`
  ${props => props.dreamed && css`
    width: 40%;
  `}
  height: 100%;
  margin: 10px;
  border-radius: 15px;
  opacity: 0.75;
  -webkit-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  -moz-box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  box-shadow: 2px 2px 3px 1px rgba(181,181,181,0.26);
  &:hover{
    transition: 1s ease-in-out;
    opacity: 1.0;
  }
`

const StyledHR = styled.hr`
  border: 0.5px solid rgba(0,0,0,.1);
  width: 100%;
`

const TitleRowDiv = styled.div`
  display: flex;
  justify-content: inherit;
`

const ContentRowDiv = styled.div`
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
`

const ImgRowDiv = styled.div`
  display: flex;
  flex-wrap: wrap;
`

const PageStyle = styled.div`
  margin-left: 25px;
`

const DreamDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 60%;
  padding: 15px;
  border-radius: 1em 5em 1em 5em / 2em 1em 2em 1em;
  margin-bottom: 25px;
  font-size: small;
  border-style: double;
  border-width: 4px;
  -webkit-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  -moz-box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
  box-shadow: 3px 6px 25px -6px rgba(0,0,0,0.75);
`

const condition = authUser => !!authUser;

export default withAuthorization(condition)(ArchivePage);
