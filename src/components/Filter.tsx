import React, { ReactNode } from "react";
import { SelectInput, Flex, useTheme, Block } from "vcc-ui";

interface Props<T> {
  options: Map<T, string>;
  value: T | "";
  setValue: (v: T | "") => void;
}
function Filter<T extends string>({
  options: OptionsMap,
  value,
  setValue,
}: Props<T>) {
  const theme = useTheme();

  const options: ReactNode[] = [];
  OptionsMap.forEach((label, value) =>
    options.push(
      <option key={value} value={value}>
        {label}
      </option>
    )
  );

  return (
    <Flex
      extend={{
        padding: "20px",
        background: theme.color.primitive.black,
        marginBottom: "20px",
      }}
    >
      <Block extend={{ maxWidth: "400px" }}>
        <SelectInput
          value={value}
          onChange={({ target }: { target: { value: T } }) =>
            setValue(target.value)
          }
          allowEmpty
          label="Body type"
        >
          {options}
        </SelectInput>
      </Block>
    </Flex>
  );
}

export default Filter;
