import { Container } from "reactstrap";
import Banner from "../components/layout/banner";
import Quote from "../components/quote";

const Home = () => {
  return (
    <Container>
      <Banner />
      <Quote />
    </Container>
  );
};

export default Home;
