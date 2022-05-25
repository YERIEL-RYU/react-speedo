import React from "react";
import styled from "styled-components";

const Speedo = styled.div`
  font-family: "Fugaz One";
  font-size: 40px;
  line-height: 40px;
  font-weight: 400;
  color: white;
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.25);
  width: 240px;
  height: 240px;
  border-radius: 100%;
  border: 2px solid rgba(255, 255, 255, 0.75);
  border-bottom-color: transparent;
  box-sizing: border-box;
  overflow: hidden;
  position: relative;
  font-variant-numeric: tabular-nums;
  background: #333;
  &::before {
    // TODO: mixin
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: 4px;
    border-radius: 1000px;
    border: 1px solid fadeout(rgba(255, 255, 255, 0.75), 50%);
    border-bottom-color: transparent;
  }
`;
const Rot = styled.div`
  transform: rotate(45deg);
  transition: transform 0.1s ease-in-out;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  z-index: 10000;
`;
const Indicator = styled.div`
  width: 4px;
  height: 30px;
  /* offset: (240px * 65% / 100 * 0.5) + (30px / 2) + 2px; */
  width: 4px;
  margin-left: 4px * -0.5;
  margin-top: 30px * -0.5;
  box-shadow: 0 0 2px lighten(#43b6f2, 10%);
  height: 30px;
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
  background: #43b6f2;
  z-index: 10000;
  transform: translate(
    0,
    unit((240px * 65% / 100 * 0.5) + (30px / 2) + 2px, px)
  );
`;
const Lines = styled.div`
  --offset: 240px / 2;
  --base: -44.6;
  --arc: 33.62;

  span {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 1000;
    font-size: 0.5em;
    background: linear-gradient(
      to left,
      fadeout(rgba(255, 255, 255, 0.75), 20%) 10%,
      transparent 30%,
      transparent 70%,
      rgba(255, 255, 255, 0.75) 90%
    );
    height: 2px;
    width: 40px;
    text-align: center;
    .text {
      position: absolute; // needed for transform
      opacity: 0.9;
      text-shadow: 0 0 8px rgba(0, 0, 0, 0.25);
    }
  }
  /* .loop(--counter) when (--counter >= 0) {
    span &:nth-child(--counter) {
      --rot: ((counter - 1) * var(--arc)) + var(--base);

      transform: translate(-50%, -50%) rotate(unit(var(--rot), deg))
        translate(-(var(--offset) - 21px) + 0px);

      span.text {
        transform: translate(-50%, -50%) rotate(unit(-(var(--rot)), deg));
      }
    }
    loop (counter - 1);
  }
  loop (9); */
`;
const Center = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;
const Inner = styled.div`
  width: 240px;
  height: 240px;
  border-radius: 100%;
  border: 2px solid fadeout(rgba(255, 255, 255, 0.75), 20%);
  text-align: center;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: -6px;
    border-radius: 1000px;
    border: 1px solid fadeout(rgba(255, 255, 255, 0.75), 50%);
    border-bottom-color: transparent;
  }

  span {
    sub {
      font-size: 0.5em;
      opacity: 0.25;
      margin-right: -20px;
    }

    &.small {
      font-size: 0.5em;
      opacity: 0.65;
    }

    &.feat {
      color: #43b6f2;
    }
  }
`;
const Bg = styled.div`
  width: 180%;
  margin-left: -40%;
  height: 240px * 0.88;
  box-shadow: 0 0 1px fadeout(rgba(0, 0, 0, 0.25), 50%);
  background: rgba(0, 0, 0, 0.25);
  border-bottom-left-radius: 100%;
  border-bottom-right-radius: 100%;
`;

const Gameui = () => {
  return (
    <Speedo>
      <Bg class="bg"></Bg>
      <Lines class="lines">
        <span>
          <span class="text">1</span>
        </span>
        <span>
          <span class="text">2</span>
        </span>
        <span>
          <span class="text">3</span>
        </span>
        <span>
          <span class="text">4</span>
        </span>
        <span>
          <span class="text">5</span>
        </span>
        <span>
          <span class="text">6</span>
        </span>
        <span>
          <span class="text">7</span>
        </span>
        <span>
          <span class="text">8</span>
        </span>
        <span>
          <span class="text">9</span>
        </span>
      </Lines>
      <Rot id="rpm">
        <Indicator />
      </Rot>
      <Center class="center">
        <Inner class="inner">
          <span class="small feat" id="gear">
            5
          </span>
          <span>
            <span id="speed">150</span>
            <sub>kph</sub>
          </span>
          <span class="small" id="time">
            40.2
          </span>
        </Inner>
      </Center>
    </Speedo>
  );
};

export default Gameui;
