import { useState } from "react";
import styled from "styled-components";
import { insuranceDetails } from "../../config/insurance";

const Quotation = ({ quote }) => {
  const [insurance] = useState(insuranceDetails(quote));


  return (
    <QuotationContainer>
      <Title>Cotação para Liniquer Araujo</Title>
      <Label>
        Cliente: <span>{quote?.client_nome}</span>
      </Label>
      <Label>
        Email: <span>{quote?.client_email}</span>
      </Label>
      <Label>
        Telefone: <span>{quote?.client_phone}</span>
      </Label>
      <Label>
        Nascimento: <span>{quote?.client_birth}</span>
      </Label>
      <br />
      <Label>
        Cep: <span>{quote?.localization_zipcode}</span>
      </Label>
      <Label>
        Estado: <span>{quote?.localization_state}</span>
      </Label>
      <Label>
        Cidade: <span>{quote?.localization_city}</span>
      </Label>
      <br />
      <Label>
        Marca: <span>{quote?.vehicle_brand?.nome}</span>
      </Label>
      <Label>
        Modelo: <span>{quote?.vehicle_model?.nome}</span>
      </Label>
      <Label>
        Versão: <span>{quote?.vehicle_version?.nome}</span>
      </Label>
      <Label>
        Valor: <span>{quote?.vehicle_price?.Valor}</span>
      </Label>
      <hr />
      {quote.types.length ? (
        <Price>
          <ul>
            {insurance.services?.map((item, i) => (
              <li key={i}>
                {item.title} - {item.price_formated}
              </li>
            ))}
          </ul>
          Base: {insurance.base.formated}
          <br />
          Total de Seguro: {insurance.total_formated}
          <br />
          Parcelas:
          {Object.entries(insurance.parcelas)?.map((item, i) => (
              <li key={i}>
                {item[0]} x {item[1].formated}
              </li>
            ))}
        </Price>
      ) : null}
    </QuotationContainer>
  );
};

export default Quotation;

const QuotationContainer = styled.div`
  box-shadow: 0 0 24px #cccccc, 0 44px 74px rgb(27 22 66 / 6%);
  background-color: #f77b3e;
  margin: 5%;
  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 120px;
`;

const Title = styled.div`
  font-size: 22px;
  font-family: "Rubik", sans-serif;
  font-weight: 700;
  text-align: center;
  color: #fff;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #eee;
`;

const Label = styled.div`
    color: #00305a;
    span{
        color #eee
    }
`;

const Price = styled.div`
   color #eee
`;
