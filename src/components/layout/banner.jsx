import styled from "styled-components";
import BannerImg from "../../assets/img/banner.svg";

const Banner = () => {
  return (
    <div>
      <BannerContainer>
        <Title>
          Seguro Auto
          <p>Faça o melhor seguro veicular e fique tranquilo.</p>
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
  font-size: 60px;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  color: #894b9d;
  display: flex;
  flex-direction: column;
  justify-content: center;
      p {
    color: #2880ba;
    font-size: 22px;
    flex-wrap: wrap;
    text-transform: initial;
    font-weight: 400;
    text-align: center;
  }
`;
