import styled from 'styled-components';

const TextInput = styled.input`
  border-radius: 22px;
  padding: 12px 16px;
  font-size: 14px;
  border: 1px solid #ddd;
  outline: none;
  transition: .3s;
  width:100%;
  &:focus {
    border: 1px solid #9cb0ff;
  }
`;

const Button = styled.button`
  padding: 12px 16px;
  font-size: 14px;
  border-radius: 22px;
  background: #0038FF;
  color: #fff;
  border: 0;
  transition: .3s;
  cursor:pointer;

  &:hover {
    background: #184bff;
  }

  &:active {
    background: #032ed0;
  }
`;

const BorderButton = styled(Button)`
  background: #fff;
  color: #0038FF;

  &:hover {
    color: #184bff;
    background: #fff;
  }

  &:active {
    color: #032ed0;
    background: #fff;
  }
`;

const FormLayout = styled.section`
  width:1024px;
  margin:25vh auto;
  height:50vh;
  background:#fff;
  border:1px solid #ddd;
  padding:32px;
  border-radius:32px;

  @media only screen and (max-width: 1024px) {
    width:100%;
  }


  @media only screen and (max-width: 768px) {
    margin-top:0;
    margin-bottom:0;
    height:100vh;
  }
`;

const Form = styled.div`
  width:360px;
  margin:0 auto;
  height:100%;
  display:flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap:12px;


  @media only screen and (max-width: calc(360px + 32px + 32px)) {
    width:100%;
  }
`;

const Label = styled.label`
  display:flex;
  align-items: center;
  gap:14px;
  font-size:14px;
  font-weight:bold;
  > div {
    width:100px;
    text-align:right;
    word-break: keep-all;
    line-height:1.5;
  }
`;

const Fields = styled.div`
  display:flex;
  flex-direction: column;
  gap:16px;
  width:100%;
`;

export {
  TextInput,
  Button,
  FormLayout,
  BorderButton,
  Form,
  Label,
  Fields,
};
