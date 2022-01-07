import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface InformationProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Information: React.FC<InformationProps> = ({
  width = 18,
  height = 18,
  fill = Colors.textPrimary,
}) => {
  return (
    <Svg height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M11 7h2v2h-2zm0 4h2v6h-2zm1-9C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
    </Svg>
  );
};

export default Information;
