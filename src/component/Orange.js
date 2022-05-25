import styled from "styled-components";

const Body = styled.div`
  background-color: #000;
  perspective: 2500px;
  position: relative;
`;
const Container = styled.div`
  width: 640px;
  height: 480px;
  margin: 50px auto;
  overflow: hidden;
  background-color: #000;
  position: relative;
`;

const Speedometr = styled.div`
  width: 550px;
  height: 550px;
  border: solid 4px #e86519;
  border-radius: 50%;
  margin: 50px auto;
  position: relative;
  animation-name: speedo;
  animation-duration: 4s;
`;
const Black = styled.div`
  width: 100%;
  height: 95px;
  background: #000;
  position: absolute;
  bottom: -5px;
  left: 0px;
  color: white;
`;
const Span = styled.span`
  color: #fff;
  font-size: 35px;
  display: block;
  position: absolute;
`;
const S10 = styled(Span)`
  top: 280px;
  left: 57px;
`;
const S100 = styled(Span)`
  top: 280px;
  right: 57px;
`;
const Strelka = styled.div`
  width: 250px;
  height: 8px;
  background-color: #ffa429;
  border-radius: 50% 5px 5px 50%;
  position: absolute;
  left: 22px;
  top: calc(50% - 8px / 2);
  transform: rotate(29deg); /** 200이 기준, -10 ~ 190, (value * 2) - 10 */
  transform-origin: 100%;
  transition: 0.6s;
`;

const Orange = () => {
  return (
    <Body>
      <Container>
        <Speedometr>
          <S10>0</S10>
          <S100>100</S100>
          <Strelka></Strelka>
        </Speedometr>
        <Black>
          CPU
          <br />
          19%
        </Black>
      </Container>
    </Body>
  );
};

export default Orange;
