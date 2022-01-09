import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface CheckProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Check: React.FC<CheckProps> = ({
  width = 24,
  height = 24,
  fill = Colors.lightBorder,
}) => {
  return (
    <Svg height={height} width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />
    </Svg>
  );
};

export default Check;
