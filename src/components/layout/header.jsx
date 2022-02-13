import { Container } from "reactstrap";
import styled from "styled-components";
import LogoImg from "../../assets/img/logo.png";

const Header = () => {
  return (
    <HeaderContainer>
      <Container>
        <Logo>
          <Image src={LogoImg} />
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
  background-color: #282849;
  border-bottom: 10px solid #92A9D8;
`;
const Logo = styled.div`
  color: #fff;
  font-weight: 600;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  span {
    color: #92A9D8;
  }
`;

const Image = styled.img`
  max-width: 50px;
  margin: 05px;
`;
