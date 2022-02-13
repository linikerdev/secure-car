import styled from "styled-components";

const Footer = () => {
  return (
    <FooterContainer>
      Todos os direitos Reservados a <span>SECURE CAR</span>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.div`
  border-top: 3px solid #92a9d8;
  background-color: #282849;
  text-align: center;
  color: #fff;
  padding: 12px 10px;
  font-family: "Roboto", sans-serif;
`;
