import React, { ReactNode, useEffect, useState } from "react";
import { Block, useTheme } from "vcc-ui";
import Slider from "react-slick";
import { useFela } from "react-fela";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CarouselArrow from "./components/CarouselArrow";

const SLIDES_TO_SHOW_DEFAULT = 4;

interface Props<T> {
  data: Array<T>;
  slidesToShow?: number;
  children: (data: T, index: number) => ReactNode;
}
function Carousel<T extends { id: string | number }>({
  data,
  slidesToShow = SLIDES_TO_SHOW_DEFAULT,
  children,
}: Props<T>) {
  const { css } = useFela();
  const theme = useTheme();
  const desktopSettings = {
    dots: false,
    slidesToShow: slidesToShow,
    touchMove: false,
    infinite: false,
    prevArrow: <CarouselArrow type="prev" slidesToShow={slidesToShow} />,
    nextArrow: <CarouselArrow type="next" slidesToShow={slidesToShow} />,
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

  const [mobileItemWidth, setMobileItemWidth] = useState(0);

  useEffect(() => {
    if (!window) return;

    function handleResize() {
      const mobile = window.innerWidth < theme.breakpoint.size.large;
      if (mobile) {
        setMobileItemWidth(
          window.innerWidth *
            (window.innerWidth < theme.breakpoint.size.medium ? 0.8 : 0.4)
        );
      } else {
        setMobileItemWidth(0);
      }
    }
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [theme]);

  return (
    <Block extend={{ paddingBottom: "60px" }}>
      <Slider {...(mobileItemWidth ? mobileSettings : desktopSettings)}>
        {data.map((item, i) => (
          <Block key={item.id}>
            <Block
              extend={{
                margin: "0 12px",
                width: mobileItemWidth || "auto",
              }}
            >
              {children(item, i)}
            </Block>
          </Block>
        ))}
      </Slider>
    </Block>
  );
}

export default Carousel;
