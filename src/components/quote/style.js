import { Container } from "reactstrap";
import styled from "styled-components";

export const QuoteForm = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Label = styled.div`
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  color: #ec6608;
`;
export const Title = styled.div`
  font-size: 35px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  text-align: center;
  color: #00305a;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px dotted #eee;
`;
export const QuoteContainer = styled(Container)`
  box-shadow: 0 0 24px #cccccc, 0 44px 74px rgb(27 22 66 / 6%);
  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
`;
export const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 0 20px 0;
`;
