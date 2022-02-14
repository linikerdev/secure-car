import { InputGroup, Input, Container } from "reactstrap";
import styled from "styled-components";
import InputMask from "react-input-mask";
import { useState } from "react";

const Quote = () => {
  const [form, setForm] = useState({});

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: [e.target.value] });

  return (
    <QuoteContainer>
      {JSON.stringify(form)}
      <Title>Simulação de Cotação de Seguro</Title>
      <QuoteForm>
        <Label>:: Dados do Cliente</Label>
        <FormGroup>
          <InputGroup style={{ width: "35%" }}>
            <Input
              placeholder="Nome Completo"
              onChange={handleChange}
              name="client_nome"
            />
          </InputGroup>
          <InputGroup style={{ width: "30%" }}>
            <Input
              placeholder="E-mail"
              name="client_email"
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup style={{ width: "20%" }}>
            <Input
              type="text"
              mask="99 9 9999-9999"
              tag={InputMask}
              placeholder="Telefone"
              onChange={(e) => console.log(e.target.value)}
            />
          </InputGroup>
          <InputGroup style={{ width: "15%" }}>
            <Input
              onChange={handleChange}
              type="text"
              name="client_birth"
              placeholder="Nascimento"
              mask="99/99/9999"
              tag={InputMask}
              alwaysShowMask={true}
            />
          </InputGroup>
        </FormGroup>
        <Label>:: Localização</Label>
        <FormGroup>
          <InputGroup style={{ width: "20%" }}>
            <Input
              type="string"
              placeholder="CEP"
              name="localization_zipcode"
              mask="99999-999"
              tag={InputMask}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup style={{ width: "20%" }}>
            <Input type="select" name="select" id="exampleSelect">
              <option>RJ</option>
            </Input>
          </InputGroup>
          <InputGroup style={{ width: "60%" }}>
            <Input
              name="localization_city"
              type="select"
              id="exampleSelect"
              disabled
              placeholder="Cidades"
            >
              <option></option>
            </Input>
          </InputGroup>
        </FormGroup>
        <Label>:: Dados do Veículo</Label>
        <Label>:: Tipo do Seguro</Label>
      </QuoteForm>
    </QuoteContainer>
  );
};

export default Quote;

const QuoteForm = styled.div`
  display: flex;
  flex-direction: column;
`;
const Label = styled.div`
  font-family: "Rubik", sans-serif;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 14px;
  color: #ec6608;
`;
const Title = styled.div`
  font-size: 35px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  text-align: center;
  color: #00305a;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px dotted #eee;
`;
const QuoteContainer = styled(Container)`
  box-shadow: 0 0 24px #cccccc, 0 44px 74px rgb(27 22 66 / 6%);
  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #fff;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 0 20px 0;
`;
