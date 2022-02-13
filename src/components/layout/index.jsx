import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";
import { Container } from "reactstrap";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>
        <Container>{children}</Container>
      </Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Content = styled.div`
  overflow: hidden;
  flex: 1;
`;
