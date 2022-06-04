import { useFela } from "react-fela";
import { Click } from "vcc-ui";
import ArrowIcon from "../../docs/chevron-circled.svg";

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

type ArrowButtonProps = {
  type: "prev" | "next";
  disabled?: boolean;
  onClick?: () => void;
};

function ArrowButton({ type, ...props }: ArrowButtonProps) {
  const { css } = useFela();

  return (
    <Click
      {...props}
      className={css({
        ...arrowStyle,
        ...(props.disabled && disabledArrowStyle),
        ...(type === "prev" && {
          right: "60px",
          transform: "rotate(180deg)",
        }),
      })}
    >
      <ArrowIcon />
    </Click>
  );
}

export default ArrowButton;
