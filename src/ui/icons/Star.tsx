import React from "react";
import Svg, { G, Path } from "react-native-svg";
import { Colors } from "react-native/Libraries/NewAppScreen";

interface StarProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Star: React.FC<StarProps> = ({
  width = 18,
  height = 18,
  fill = Colors.yellowStar,
}) => {
  return (
    <Svg height={height} viewBox="0 0 24 24" width={width} fill={fill}>
      <G fill="none">
        <Path d="M0 0h24v24H0V0z" />
        <Path d="M0 0h24v24H0V0z" />
      </G>
      <Path d="M12 17.27 18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z" />
    </Svg>
  );
};

export default Star;
