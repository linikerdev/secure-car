import styled from "styled-components";
import Header from "./header";
import Footer from "./footer";

const Layout = ({ children }) => {
  return (
    <LayoutContainer>
      <Header />
      <Content>{children}</Content>
      <Footer />
    </LayoutContainer>
  );
};

export default Layout;

const LayoutContainer = styled.div``;

const Content = styled.div``;
