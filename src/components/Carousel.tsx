import React, { FC, ReactNode, useEffect, useState } from "react";
import { Block, Click, useTheme } from "vcc-ui";
import Slider from "react-slick";
import { useFela } from "react-fela";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import ArrowIcon from "../../docs/chevron-circled.svg";

const SLIDES_TO_SHOW_DEFAULT = 4;

const arrowStyle = {
  height: "37px",
  width: "37px",
  position: "absolute",
  bottom: "-50px",
  right: "12px",
  transition: "opacity 0.5s",
};
const disabledArrowStyle = {
  opacity: 0.5,
};

interface ArrowProps {
  currentSlide: number;
  slideCount: number;
  slidesToShow: number;
}
const setArrowDisabled = (props: ArrowProps, isNextBtn: boolean) => {
  const isDisabled = isNextBtn
    ? props.currentSlide === props.slideCount - props.slidesToShow
    : props.currentSlide === 0;
  return isDisabled ? disabledArrowStyle : {};
};
const PrevArrow = (props: ArrowProps) => {
  const { css } = useFela();
  return (
    <Click
      {...props}
      className={css({
        ...arrowStyle,
        right: "60px",
        transform: "rotate(180deg)",
        ...setArrowDisabled(props, false),
      })}
    >
      <ArrowIcon />
    </Click>
  );
};
const NextArrow = (props: ArrowProps) => {
  const { css } = useFela();
  return (
    <Click
      {...props}
      className={css({ ...arrowStyle, ...setArrowDisabled(props, true) })}
    >
      <ArrowIcon />
    </Click>
  );
};

interface Props {
  data: Array<ReactNode>;
  slidesToShow?: number;
}
const Carousel: FC<Props> = ({
  data,
  slidesToShow = SLIDES_TO_SHOW_DEFAULT,
}) => {
  const { css } = useFela();
  const theme = useTheme();
  const desktopSettings = {
    dots: false,
    slidesToShow: slidesToShow,
    touchMove: false,
    infinite: false,
    prevArrow: ((props) => (
      <PrevArrow slidesToShow={slidesToShow} {...props} />
    ))(),
    nextArrow: ((props) => (
      <NextArrow slidesToShow={slidesToShow} {...props} />
    ))(),
  };
  const mobileSettings = {
    dots: true,
    slidesToShow: 1,
    arrows: false,
    infinite: false,
    variableWidth: true,
    swipeToSlide: true,
    dotsClass: css({
      display: "flex !important",
      justifyContent: "center",
      margin: "10px",
      padding: 0,
      listStyle: "none",
      "& li": {
        display: "block",
        borderRadius: "50%",
        height: "8px",
        width: "8px",
        margin: "0 4px",
        overflow: "hidden",
        background: theme.color.ornament.divider,
        "&.slick-active": {
          background: theme.color.foreground.primary,
        },
        "& button": {
          cursor: "pointer",
          opacity: 0,
        },
      },
    }),
  };
  const [isMobile, setIsMobile] = useState(false);
  const [mobileItemWidth, setMobileItemWidth] = useState(0);
  useEffect(() => {
    if (!window) return;
    function handleResize() {
      const mobile = window.innerWidth < theme.breakpoint.size.large;
      if (mobile !== isMobile) setIsMobile(mobile);
      if (mobile)
        setMobileItemWidth(
          window.innerWidth *
            (window.innerWidth < theme.breakpoint.size.medium ? 0.8 : 0.4)
        );
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, [theme, isMobile]);
  return (
    <Block extend={{ paddingBottom: "60px" }}>
      <Slider {...(isMobile ? mobileSettings : desktopSettings)}>
        {data.map((item, ind) => (
          <Block key={ind}>
            <Block
              extend={{
                margin: "0 12px",
                width: isMobile ? mobileItemWidth : "auto",
              }}
            >
              {item}
            </Block>
          </Block>
        ))}
      </Slider>
    </Block>
  );
};

export default Carousel;
