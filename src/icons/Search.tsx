import React from "react";
import Svg, {Path} from "react-native-svg";

interface SearchProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Search: React.FC<SearchProps> = ({
  width = 24,
  height = 24,
  fill = "#8e95b2",
}) => {
  return (
    <Svg height={height} width={width} fill={fill}>
      <Path d="M0 0h24v24H0V0z" fill="none" />
      <Path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </Svg>
  );
};

export default Search;
