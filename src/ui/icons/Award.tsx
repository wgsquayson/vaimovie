import React from "react";
import Svg, { Path } from "react-native-svg";
import { Colors } from "../tokens";

interface AwardProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Award: React.FC<AwardProps> = ({
  width = 18,
  height = 18,
  fill = Colors.textPrimary,
}) => {
  return (
    <Svg height={height} viewBox="0 0 20 20" width={width} fill={fill}>
      <Path fill="none" d="M0 0h20v20H0z" />
      <Path d="M15 6h-2V5H7v1H5c-.55 0-1 .45-1 1v1c0 1.66 1.34 3 3 3h.18a2.993 2.993 0 0 0 2.32 1.95V15H7v1h6v-1h-2.5v-2.05c1.08-.18 1.96-.94 2.32-1.95H13c1.66 0 3-1.34 3-3V7c0-.55-.45-1-1-1zM5 8V7h2v3c-1.1 0-2-.9-2-2zm5 4c-1.1 0-2-.9-2-2V6h4v4c0 1.1-.9 2-2 2zm5-4c0 1.1-.9 2-2 2V7h2v1z" />
    </Svg>
  );
};

export default Award;
