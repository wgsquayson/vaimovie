import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface MovieProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Movie: React.FC<MovieProps> = ({
  width = 18,
  height = 18,
  fill = Colors.textPrimary,
}) => {
  return (
    <Svg height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4z" />
    </Svg>
  );
};

export default Movie;
