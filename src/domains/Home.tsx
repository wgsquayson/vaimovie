import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { DomainsStackParamList } from "./index";
import api from "../service/api";

import Icons from "../ui/icons";
import { bottomSpacer, Colors, round, screenPaddingTop } from "../ui/tokens";
import MovieItem from "../ui/components/MovieItem";

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
`;

const Avatar = styled.Image`
  width: ${round(50)}px;
  height: ${round(50)}px;
  border-radius: ${round(25)}px;
`;

const SearchbarContainer = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: ${Colors.lightBorder};
  border-radius: ${round(100)}px;
  margin: ${round(30)}px 0;
  padding: ${round(16)}px;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0 ${round(12)}px;
  font-family: "BeVietnamPro-Regular";
  font-size: ${round(16)}px;
  color: ${Colors.lightBorder};
`;

const Tip = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(16)}px;
  color: ${Colors.lightBorder};
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

const Home: React.FC = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<DomainsStackParamList, "Home">>();

  const toastRef = useRef<Toast>();
  const { Search } = Icons;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [page, setPage] = useState(2);

  const fetchMovies = async (movie?: string) => {
    setIsFetching(true);

    setHasMoreMovies(true);
    try {
      const { data } = await api.get("", {
        params: {
          s: search ? search.toLowerCase().trim() : movie,
        },
      });

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        toastRef.current?.show("No movies found.", 2000);
      }
    } catch (error) {
      toastRef.current?.show("An error ocurred. Try again later", 2000);
    } finally {
      setIsFetching(false);
    }
  };

  const fetchMore = async (movie?: string) => {
    setIsFetchingMore(true);

    try {
      const { data } = await api.get("", {
        params: {
          s: search ? search.toLowerCase().trim() : movie,
          page: String(page),
        },
      });

      if (data.Response === "True") {
        setMovies(prevState => [...prevState, ...data.Search]);
        setPage(prevState => prevState + 1);
      } else {
        setHasMoreMovies(false);

        toastRef.current?.show("No more movies found.", 2000);
      }
    } catch (error) {
      toastRef.current?.show("An error ocurred. Try again later", 2000);
    } finally {
      setIsFetchingMore(false);
    }
  };

  useEffect(() => {
    fetchMovies("spider");
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundDark}
      />
      <ScrollView contentContainerStyle={styles.flatlist} bounces={false}>
        <HeaderContainer>
          <HeaderTitle>Hi, William!</HeaderTitle>
          <Avatar source={require("../../assets/images/avatar.png")} />
        </HeaderContainer>
        <SearchbarContainer>
          <SearchInput
            placeholder="Search for a movie or series!"
            placeholderTextColor={Colors.lightBorder}
            value={search}
            onChangeText={(value: string) => {
              setSearch(value);
            }}
            returnKeyType="search"
            onBlur={() => {
              if (search) {
                fetchMovies();
              } else {
                return;
              }
            }}
            autoCorrect={false}
          />
          <Pressable onPress={() => fetchMovies()}>
            <Search />
          </Pressable>
        </SearchbarContainer>
        {isFetching ? (
          <ActivityIndicator size="large" animating />
        ) : (
          <>
            {movies.length > 0 && (
              <Tip>Tap on a title to see more details!</Tip>
            )}
            {movies.map(movie => {
              const isLastItem = movies[movies.length - 1] === movie;

              return (
                <MovieItem
                  key={movie.imdbID}
                  imdbID={movie.imdbID}
                  Poster={movie.Poster}
                  Title={movie.Title}
                  Year={movie.Year}
                  hasMoreMovies={hasMoreMovies}
                  isFetchingMore={isFetchingMore}
                  onFetchMore={() => fetchMore("spider")}
                  isLastItem={isLastItem}
                  onPress={() =>
                    navigation.navigate("MovieDetails", {
                      imdbID: movie.imdbID,
                    })
                  }
                />
              );
            })}
          </>
        )}
        <BottomSpacer />
      </ScrollView>
      <Toast
        ref={toastRef}
        style={styles.toast}
        textStyle={styles.toastText}
        position="bottom"
      />
    </>
  );
};

export default Home;

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
