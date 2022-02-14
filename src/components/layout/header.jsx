import { Container } from "reactstrap";
import styled from "styled-components";
import { IoCarSportSharp } from "react-icons/io5";

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Logo>
          <Icon />
          SECURE <span>CAR</span>
        </Logo>
      </Container>
    </HeaderContainer>
  );
};

export default Header;

const HeaderContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  background-color: #ffeee0;
`;
const Logo = styled.div`
  color: #00305a;
  font-weight: 600;
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #ec6608;
  }
`;

const Icon = styled(IoCarSportSharp)`
  color: #00305a;
  font-size: 55px;
  margin-top: -5px;
`;
