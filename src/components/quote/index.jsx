import React, { useCallback, useEffect, useRef } from "react";
import { InputGroup, Input, Container, Button } from "reactstrap";
import styled from "styled-components";
import { IMaskInput } from "react-imask";
import { getCepService } from "../../services/viaCep.service";
import {
  getBrandService,
  getModelsService,
  getPricesService,
  getVersionService,
} from "../../services/parallelum.service";
import ReactSelect from "react-select";
import {
  getCitiesFromStateService,
  getStateService,
} from "../../services/ibge.service";

import acidenteSimples from "../../assets/img/categories/acidente_arvore.png";
import alagamento from "../../assets/img/categories/alagamento.png";
import guincho from "../../assets/img/categories/guincho.png";
import incendio from "../../assets/img/categories/incendio.png";
import roubo from "../../assets/img/categories/roubo.png";
import vitimas from "../../assets/img/categories/vitimas.png";

const typeInsurance = [
  { id: 1, title: "Acidente", img: acidenteSimples, value: 0.02 },
  { id: 2, title: "Alagamento", img: alagamento, value: 0.03 },
  { id: 3, title: "Guincho", img: guincho, value: 0.04 },
  { id: 4, title: "Incêndio", img: incendio, value: 0.05 },
  { id: 5, title: "Roubo/Furto", img: roubo, value: 0.06 },
  { id: 6, title: "Acidente com Vitimas", img: vitimas, value: 0.07 },
];

const Quote = () => {
  const [form, setForm] = React.useState({});
  const [states, setStates] = React.useState([]);
  const [cities, setCities] = React.useState([]);
  const [brands, setBrands] = React.useState([]);
  const [models, setModels] = React.useState([]);
  const [versions, setVersions] = React.useState([]);
  const [typesSelected, setTypeSelected] = React.useState([]);
  const [formValid, setIFormValid] = React.useState(false);

  const selectCitiesRef = useRef();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleTypes = (item) => {
    if (typesSelected.includes(item)) {
      const novoTypeSelected = typesSelected.filter((t) => t.id !== item.id);
      setTypeSelected([...novoTypeSelected]);
      setForm({ ...form, types: novoTypeSelected });
    } else {
      console.log(item);
      setTypeSelected([...typesSelected, item]);
      setForm({ ...form, types: [typesSelected, item] });
    }
  };

  // buscar a lista de Municipios por estado

  const getCitiesFromState = useCallback(async (uf) => {
    const cities = await getCitiesFromStateService(uf);
    setCities(cities);
  }, []);

  // Start
  useEffect(() => {
    getStateService().then((states) => setStates(states));
    getBrandService().then((states) => setBrands(states));
  }, []);

  useEffect(() => {
    const validateInputs = [
      "client_nome",
      "client_email",
      "client_phone",
      "client_birth",
      "localization_zipcode",
      "localization_state",
      "localization_city",
      "types",
      "vehicle_brand",
      "vehicle_model",
      "vehicle_price",
    ];
    const invalidateForm = validateInputs.some(
      (field) => !form[field] || form[field]?.length === 0
    );
    setIFormValid(!invalidateForm);
  }, [form]);

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

  const handleBrand = async (v) => {
    const { modelos } = await getModelsService(v.codigo);
    setModels(modelos);
    setForm({ ...form, vehicle_brand: v });
  };
  const handleModel = async (v) => {
    const vers = await getVersionService(form.vehicle_brand.codigo, v.codigo);
    setVersions(vers);
    setForm({ ...form, vehicle_model: v });
  };

  const handleVersion = async (v) => {
    const { vehicle_brand, vehicle_model } = form;
    const price = await getPricesService(
      vehicle_brand.codigo,
      vehicle_model.codigo,
      v.codigo
    );
    setForm({ ...form, vehicle_version: v, vehicle_price: price });
  };

  const SubmitForm = () => console.log(form);

  return (
    <QuoteContainer>
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
              isDisabled={cities.length === 0}
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
          </InputGroup>
        </FormGroup>
        <Label>:: Dados do Veículo</Label>
        <FormGroup>
          <InputGroup style={{ width: "33%" }}>
            <ReactSelect
              className="flex-grow-1"
              name="vehicle_brand"
              isClearable
              options={brands}
              placeholder="Marca"
              getOptionLabel={(option) => option?.nome}
              getOptionValue={(option) => option?.codigo}
              onChange={handleBrand}
            />
          </InputGroup>
          <InputGroup style={{ width: "33%" }}>
            <ReactSelect
              className="flex-grow-1"
              name="vehicle_model"
              isClearable
              isDisabled={models.length === 0}
              options={models}
              placeholder="Modelo"
              getOptionLabel={(option) => option?.nome}
              getOptionValue={(option) => option?.codigo}
              onChange={handleModel}
            />
          </InputGroup>
          <InputGroup style={{ width: "33%" }}>
            <ReactSelect
              className="flex-grow-1"
              name="vehicle_brand"
              isClearable
              isDisabled={versions.length === 0}
              options={versions}
              placeholder="Versão"
              getOptionLabel={(option) => option?.nome}
              getOptionValue={(option) => option?.codigo}
              onChange={handleVersion}
            />
          </InputGroup>
        </FormGroup>

        <Label>:: Tipo do Seguro</Label>
        <TypeInsuranceContainer>
          {typeInsurance.map((item, i) => (
            <TypeInsurance
              className={typesSelected.includes(item) ? "active" : ""}
              key={i}
              onClick={() =>
                handleTypes(
                  item,
                  typeInsurance.some((val) => item === val)
                )
              }
            >
              <div className="title">{item.title}</div>
              <img src={item.img} alt="" />
            </TypeInsurance>
          ))}
        </TypeInsuranceContainer>
        <FormGroup>
          <Button disabled={!formValid} onClick={SubmitForm} color="primary">
            Fazer Simulação
          </Button>
        </FormGroup>
      </QuoteForm>
    </QuoteContainer>
  );
};
export default Quote;

const QuoteForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
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
  background-color: #fff;

  padding: 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 120px;
`;
const FormGroup = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 5px;
  padding: 5px 0 20px 0;
`;

const TypeInsuranceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px 0;
`;

const TypeInsurance = styled.div`
  height: 140px;
  width: 140px;
  display: block;
  box-shadow: 0 0 24px #cccccc, 0 44px 74px rgb(27 22 66 / 6%);
  background-color: #fff;
  padding: 5px;
  border-radius: 5px;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    position: absolute;
    bottom: 0;
  }
  .title {
    text-align: center;
    color: #00305a;
    font-weight: 600;
    font-size: 14px;
  }
  &.active {
    border: 2px solid #00305a;
  }
`;
