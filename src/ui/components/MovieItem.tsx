import React from "react";
import { Pressable } from "react-native";
import styled from "styled-components/native";

import { Movie } from "../../domains/Home";
import { Colors, round } from "../tokens";
import Icons from "../icons";

const MovieItemContainer = styled.Pressable`
  width: 100%;
  background-color: ${Colors.lighterBackground};
  padding: ${round(16)}px;
  border-radius: ${round(12)}px;
  flex-direction: row;
  margin-top: ${round(12)}px;
`;

const MovieItemCover = styled.Image`
  width: ${round(100)}px;
  height: ${round(130)}px;
`;

const MovieItemInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: ${round(16)}px;
`;

const StarContainer = styled.View`
  position: absolute;
  top: ${round(5)}px;
  right: ${round(5)}px;
`;

const MovieItemTitle = styled.Text`
  font-family: "BeVietnamPro-ExtraBold";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
  max-width: 100%;
  margin-right: ${round(8)}px;
`;

const MovieItemExtraInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${round(12)}px;
`;

const MovieItemText = styled.Text`
  color: ${Colors.lightBorder};
  font-family: "BeVietnamPro-Medium";
  margin-right: ${round(4)}px;
`;

const LoadMoreMovies = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(16)}px;
  color: ${Colors.textPrimary};
  margin-top: ${round(16)}px;
  align-self: center;
`;

const Loading = styled.ActivityIndicator`
  margin-top: ${round(16)}px;
`;

interface MovieItemProps extends Movie {
  isFetchingMore?: boolean;
  hasMoreMovies?: boolean;
  onFetchMore?: () => void;
  isLastItem?: boolean;
  onPress?: () => void;
  isFavourite?: boolean;
}

const MovieItem: React.FC<MovieItemProps> = ({
  Poster,
  Title,
  Year,
  hasMoreMovies,
  isFetchingMore,
  isLastItem,
  onFetchMore,
  onPress,
  isFavourite,
}) => {
  const { Star } = Icons;

  const LoadMoreComponent: React.FC = () => {
    if (isFetchingMore) {
      return <Loading size="small" animating />;
    } else if (hasMoreMovies) {
      return (
        <Pressable onPress={onFetchMore}>
          <LoadMoreMovies>Load more</LoadMoreMovies>
        </Pressable>
      );
    } else {
      return null;
    }
  };

  return (
    <>
      <MovieItemContainer onPress={onPress}>
        {Poster === "N/A" ? (
          <MovieItemCover
            source={require("../../../assets/images/avatar.png")}
            resizeMode="contain"
          />
        ) : (
          <MovieItemCover source={{ uri: Poster }} resizeMode="cover" />
        )}
        <MovieItemInfo>
          {isFavourite && (
            <StarContainer>
              <Star />
            </StarContainer>
          )}
          <MovieItemTitle numberOfLines={3} ellipsizeMode="tail">
            {Title}
          </MovieItemTitle>
          <MovieItemExtraInfo>
            <MovieItemText>{Year}</MovieItemText>
          </MovieItemExtraInfo>
        </MovieItemInfo>
      </MovieItemContainer>
      {isLastItem && <LoadMoreComponent />}
    </>
  );
};

export default MovieItem;
