import styled from "styled-components";
import BannerImg from "../../assets/img/logo_banner.png";

const Banner = () => {
  return (
    <div>
      <BannerContainer>
        <Title>
          <p>Economize até 30% em seu seguro de <span>carro</span> em minutos.</p>
        </Title>
        <ImgBanner src={BannerImg} alt="asd" />
      </BannerContainer>
    </div>
  );
};

export default Banner;

const BannerContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
`;
const ImgBanner = styled.img`
  height: 350px;
  flex: 1;
`;
const Title = styled.div`
  flex: 1;
  font-size: 50px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: #00305a;
  display: flex;
  flex-direction: column;
  justify-content: center;
  span {
    color: #ec6608;
  }
`;
