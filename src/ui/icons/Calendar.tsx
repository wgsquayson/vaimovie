import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface CalendarProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Calendar: React.FC<CalendarProps> = ({
  width = 24,
  height = 24,
  fill = Colors.lightBorder,
}) => {
  return (
    <Svg height={height} width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z" />
    </Svg>
  );
};

export default Calendar;
