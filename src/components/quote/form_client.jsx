import React from "react";
import { InputGroup, Input, FormGroup } from "reactstrap";
import { IMaskInput } from "react-imask";

const FormClient = ({ handleChange, setForm, form }) => {
  return (
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
          onAccept={(value, mask) => setForm({ ...form, client_phone: value })}
          placeholder="Telefone"
        />
      </InputGroup>
      <InputGroup style={{ width: "15%" }}>
        <IMaskInput
          className="form-control"
          mask={"00/00/0000"}
          unmask={true}
          name="client_birth"
          onAccept={(value, mask) => setForm({ ...form, client_birth: value })}
          placeholder="Nascimento"
        />
      </InputGroup>
    </FormGroup>
  );
};

export default FormClient;
