import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface BackProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Back: React.FC<BackProps> = ({
  width = 24,
  height = 24,
  fill = Colors.lightBorder,
}) => {
  return (
    <Svg height={height} width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M15.41 7.41 14 6l-6 6 6 6 1.41-1.41L10.83 12l4.58-4.59z" />
    </Svg>
  );
};

export default Back;
