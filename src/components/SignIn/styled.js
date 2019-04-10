import styled from "styled-components";

export const PageStyle = styled.div`
  margin-left: 20px;
  font-family: serif;
  font-size: x-large;
  font-weight: 900;
`
export const BlobInputContainerSS = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: -150%;
  height: 50%;
  transform: scale(10);
`
export const SignInPageS = styled.div`
  padding: 50px;
  border-radius: 10px;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  background: rgba(255, 255, 255,.3);
`
export const SignInputS = styled.input`
  padding: 10px;
  z-index: 20;
  width: 350px;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  border: white;
  text-align: left;
  margin-right: 5px;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
  position: relative;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  &::placeholder{
    color: gray;
    font-weight: 900;
    font-size: x-large;
  }
  &:focus{
    outline:none;
  }
`
export const ButtonS = styled.button`
  padding: 10px;
  z-index: 20;
  font-family: serif;
  color: gray;
  font-size: x-large;
  font-weight: 900;
  border-style: double;
  border-color: darkgoldenrod;
  text-align: left;
  margin-bottom: 2rem;
  margin-top: 1.8rem;
  position: relative;
  background: rgba(255,255,255,0.3);
  border-radius: 6px;
  &::placeholder{
    color: gray;
    font-weight: 900;
    font-size: x-large;
  }
  &:hover{
    transition: 1s ease-in-out;
    background-color: turquoise;;
  }
`
