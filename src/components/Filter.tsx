import React, { FC } from "react";
import { SelectInput, Flex, useTheme, Block } from "vcc-ui";

import { BodyType } from "../types";

interface Props {
  value: BodyType | "";
  setValue: (v: BodyType) => void;
}
const Filter: FC<Props> = ({ value, setValue }) => {
  const theme = useTheme();
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
          onChange={({ target }: { target: { value: BodyType } }) =>
            setValue(target.value)
          }
          allowEmpty
          label="Body type"
        >
          {Object.entries(BodyType).map(([bodyType, name]) => (
            <option key={bodyType} value={bodyType}>
              {name}
            </option>
          ))}
        </SelectInput>
      </Block>
    </Flex>
  );
};

export default Filter;
