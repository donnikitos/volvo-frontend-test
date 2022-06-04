import { ComponentProps } from "react";
import ArrowButton from "../../ArrowButton";

type CarouselArrowProps = Pick<ComponentProps<typeof ArrowButton>, "type"> & {
  slidesToShow: number;
  onClick?: () => void;
  currentSlide?: number;
  slideCount?: number;
};

function CarouselArrow({
  type,
  currentSlide,
  slideCount,
  slidesToShow,
  ...props
}: CarouselArrowProps) {
  let isDisabled = false;

  if (currentSlide !== undefined && slideCount !== undefined) {
    isDisabled =
      type === "next"
        ? currentSlide === slideCount - slidesToShow
        : currentSlide === 0;
  }

  return <ArrowButton {...props} type={type} disabled={isDisabled} />;
}

export default CarouselArrow;
