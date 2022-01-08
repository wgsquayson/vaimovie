import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface UserProps {
  width?: number;
  height?: number;
  fill?: string;
}

const User: React.FC<UserProps> = ({
  width = 24,
  height = 24,
  fill = Colors.lightBorder,
}) => {
  return (
    <Svg height={height} width={width} fill={fill}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  );
};

export default User;
