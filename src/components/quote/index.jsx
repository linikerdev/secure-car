import React, { useCallback, useEffect, useRef } from "react";
import { InputGroup, Input, Container } from "reactstrap";
import styled from "styled-components";
import { IMaskInput } from "react-imask";
import { getCepService } from "../../services/viaCep.service";
import ReactSelect from "react-select";
import {
  getCitiesFromStateService,
  getStateService,
} from "../../services/ibge.service";

const Quote = () => {
  const [form, setForm] = React.useState({});
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);

  const selectCitiesRef = useRef();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // buscar a lista de Municipios por estado

  const getCitiesFromState = useCallback(async (uf) => {
    const cities = await getCitiesFromStateService(uf);
    setCities(cities);
  }, []);

  // carregar os Estados
  useEffect(() => getStateService().then((states) => setStates(states)), []);

  const handleZipCode = (value, mask) => {
    if (value.length === 8) {
      getCepService(value).then(async (res) => {
        await getCitiesFromState(res.uf);
        setForm({
          ...form,
          localization_zipcode: value,
          localization_state: res.uf,
          localization_city: res.localidade,
        });
      });
    }

    return false;
  };

  const selectState = (opt) => {
    getCitiesFromState(opt?.sigla);
    delete form.localization_city;
    form.localization_state = opt?.sigla;
    setForm(form);
    selectCitiesRef.current.clearValue();
  };

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
            <IMaskInput
              className="form-control"
              mask={"00 9 0000-0000"}
              unmask={true}
              name="client_phone"
              onAccept={(value, mask) =>
                setForm({ ...form, client_phone: value })
              }
              placeholder="Telefone"
            />
          </InputGroup>
          <InputGroup style={{ width: "15%" }}>
            <IMaskInput
              className="form-control"
              mask={"00/00/0000"}
              unmask={true}
              name="client_birth"
              onAccept={(value, mask) =>
                setForm({ ...form, client_birth: value })
              }
              placeholder="Nascimento"
            />
          </InputGroup>
        </FormGroup>
        <Label>:: Localização</Label>
        <FormGroup>
          <InputGroup style={{ width: "20%" }}>
            <IMaskInput
              className="form-control"
              mask={"00000-000"}
              unmask
              name="localization_zipcode"
              onAccept={handleZipCode}
              placeholder="Informe o  Cep"
            />
          </InputGroup>
          <InputGroup style={{ width: "40%" }}>
            <ReactSelect
              className="flex-grow-1"
              name="localization_state"
              value={states.find(
                (state) => state.sigla === form.localization_state
              )}
              isClearable
              getOptionLabel={(option) => option?.nome}
              getOptionValue={(option) => option?.id}
              options={states}
              onChange={selectState}
            />
          </InputGroup>

          <InputGroup style={{ width: "40%" }}>
            <ReactSelect
              isClearable
              className="flex-grow-1"
              name="localization_city"
              ref={selectCitiesRef}
              value={cities?.find(
                (state) => state.nome === form.localization_city
              )}
              getOptionLabel={(option) => option?.nome}
              getOptionValue={(option) => option?.id}
              placeholder="Cidades"
              options={cities}
              onChange={(opt) =>
                setForm({ ...form, localization_city: opt?.nome })
              }
            />
            {/* <Input
              name="localization_city"
              type="select"
              id="exampleSelect"
              disabled={!form.localization_state}
              placeholder="Cidades"
            >
              <option></option>
              {cities?.map((city) => (
                <option
                  selected={city.sigla === form.localization_city || null}
                  key={city.id}
                  value={city.sigla}
                >{`${city.nome}`}</option>
              ))}
            </Input> */}
          </InputGroup>
        </FormGroup>
        <Label>:: Dados do Veículo</Label>
        <FormGroup>
          <InputGroup style={{ width: "25%" }}>
            <Input
              type="select"
              id="exampleSelect"
              name="vehicle_brand"
              onChange={handleChange}
            >
              <option># Marca</option>
              {states?.map((state) => (
                <option
                  selected={state.sigla === form.localization_state || null}
                  key={state.id}
                  value={state.sigla}
                >{`${state.sigla} - ${state.nome}`}</option>
              ))}
            </Input>
          </InputGroup>
          <InputGroup style={{ width: "25%" }}>
            <Input
              type="select"
              id="exampleSelect"
              name="vehicle_model"
              onChange={handleChange}
              disabled
            >
              <option># Modelo</option>
              {states?.map((state) => (
                <option
                  selected={state.sigla === form.localization_state || null}
                  key={state.id}
                  value={state.sigla}
                >{`${state.sigla} - ${state.nome}`}</option>
              ))}
            </Input>
          </InputGroup>
          <InputGroup style={{ width: "25%" }}>
            <Input
              type="select"
              id="exampleSelect"
              name="vehicle_year"
              onChange={handleChange}
              disabled
            >
              <option># Ano</option>
              {states?.map((state) => (
                <option
                  selected={state.sigla === form.localization_state || null}
                  key={state.id}
                  value={state.sigla}
                >{`${state.sigla} - ${state.nome}`}</option>
              ))}
            </Input>
          </InputGroup>
          <InputGroup style={{ width: "25%" }}>
            <Input
              type="select"
              id="exampleSelect"
              name="vehicle_price"
              onChange={handleChange}
              disabled
            >
              <option># Valor</option>
              {states?.map((state) => (
                <option
                  selected={state.sigla === form.localization_state || null}
                  key={state.id}
                  value={state.sigla}
                >{`${state.sigla} - ${state.nome}`}</option>
              ))}
            </Input>
          </InputGroup>
        </FormGroup>
        <Label>:: Tipo do Seguro</Label>
        {/* <FormGroup>Cereja do Bolo</FormGroup> */}
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
