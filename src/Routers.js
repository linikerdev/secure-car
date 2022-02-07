import { Router } from "@reach/router";
import Home from "./views/Home";
import Layout from "./components/layout";

const Routers = () => {
  return (
    <Layout>
      <Router>
        <Home path="/" />
      </Router>
    </Layout>
  );
};

export default Routers;
