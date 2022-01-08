import React, { useEffect, useState } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { store } from "../store";

import { DomainsStackParamList } from "./index";

import Icons from "../ui/icons";
import { bottomSpacer, Colors, round, screenPaddingTop } from "../ui/tokens";
import { BackButton, MovieItem } from "../ui/components";

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: column;
`;

const HeaderTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const HeaderTitle = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
  margin: 0 ${round(8)}px;
`;

const Detail = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(16)}px;
  color: ${Colors.lightBorder};
  margin-top: ${round(10)}px;
`;

const BottomSpacer = styled.View`
  width: 100%;
  height: ${bottomSpacer}px;
`;

export interface Movie {
  imdbID: string;
  Poster?: string;
  Title?: string;
  Type?: string;
  Year?: string;
}

const FavouriteMovies: React.FC = () => {
  const navigation =
    useNavigation<
      NativeStackNavigationProp<DomainsStackParamList, "FavouriteMovies">
    >();

  const isFocused = useIsFocused();

  const { Star } = Icons;

  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    if (isFocused) {
      setMovies(store.getState().favouriteMovies);
    }
  }, [isFocused]);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundDark}
      />
      <FlatList
        contentContainerStyle={styles.flatlist}
        bounces={false}
        data={movies}
        keyExtractor={item => item.imdbID}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="none"
        ListHeaderComponent={
          <HeaderContainer>
            <HeaderTitleContainer>
              <BackButton />
              <HeaderTitle>Your favourites</HeaderTitle>
              <Star />
            </HeaderTitleContainer>
            {movies.length > 0 && (
              <Detail>
                Only the best of cinema! Tap on a movie to see more details.
              </Detail>
            )}
          </HeaderContainer>
        }
        ListEmptyComponent={
          <Detail>
            No favourites yet. To save a movie as a favourite, tap on the star
            on the upper right side, when seeing the movie details.
          </Detail>
        }
        ListFooterComponent={<BottomSpacer />}
        renderItem={({ item }) => {
          return (
            <MovieItem
              key={item.imdbID}
              imdbID={item.imdbID}
              Poster={item.Poster}
              Title={item.Title}
              Year={item.Year}
              onPress={() =>
                navigation.navigate("MovieDetails", {
                  imdbID: item.imdbID,
                })
              }
            />
          );
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  flatlist: {
    backgroundColor: Colors.backgroundDark,
    width: "100%",
    minHeight: "100%",
    paddingTop: screenPaddingTop,
    paddingHorizontal: round(20),
  },
  toast: {
    backgroundColor: "red",
  },
  toastText: {
    color: Colors.textPrimary,
    fontFamily: "BeVietnamPro-Medium",
  },
});

const mapStateToProps = (state: Movie[]) => {
  const movie = {
    data: state,
  };
  return { movie };
};

export default connect(mapStateToProps)(FavouriteMovies);
