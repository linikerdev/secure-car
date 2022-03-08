import { useEffect, useState } from "react";
import { Container } from "reactstrap";
import Banner from "../components/layout/banner";
import QuoteForm from "../components/quote";
import Quotation from "../components/quote/quotation";

const Home = () => {
  const [form, setForm] = useState({});
  const [quotation, setQuotation] = useState({
    show: false,
    data: {},
  });

  const SubmitForm = () => {
    const formNew = Object.assign({}, form);
    setQuotation({
      show: true,
      data: formNew,
    });
  };

  useEffect(() => {
    setQuotation({
      show: false,
      data: {},
    });
  }, [form]);

  return (
    <Container>
      <Banner />
      <QuoteForm form={form} setForm={setForm} submit={SubmitForm} />
      {quotation.show ? <Quotation quote={quotation.data} /> : null}
    </Container>
  );
};

export default Home;
