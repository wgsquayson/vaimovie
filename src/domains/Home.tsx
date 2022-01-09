import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import Toast from "react-native-easy-toast";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { store } from "../store";

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
  max-width: 70%;
`;

const UserProfileButton = styled.Pressable`
  width: ${round(50)}px;
  height: ${round(50)}px;
  border-radius: ${round(25)}px;
  align-items: center;
  justify-content: center;
  background-color: ${Colors.lighterBackground};
`;

const UserPhoto = styled.Image`
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
  padding: ${Platform.OS === "ios" ? round(16) : round(4)}px ${round(16)}px;
  flex-direction: row;
  align-items: center;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0 ${Platform.OS === "ios" ? round(12) : 0}px;
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
  const { Search, User } = Icons;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [page, setPage] = useState(2);

  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [year, setYear] = useState<String | undefined>(undefined);

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

  const userFirstName = store
    .getState()
    .users.find(user => user.signedIn === true)
    ?.name.split(" ")[0];

  const userPhoto = store
    .getState()
    .users.find(user => user.signedIn === true)?.photo;

  useEffect(() => {
    fetchMovies("spider");
  }, []);

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
          <>
            <HeaderContainer>
              <HeaderTitle>
                {userFirstName
                  ? `Hi ${userFirstName}!`
                  : "Welcome to VaiMovies!"}
              </HeaderTitle>
              <UserProfileButton
                onPress={() => navigation.navigate("UserProfile")}>
                {userPhoto ? (
                  <UserPhoto source={{ uri: userPhoto }} />
                ) : (
                  <User />
                )}
              </UserProfileButton>
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
            {isFetching && <ActivityIndicator size="large" animating />}
            {!isFetching && movies.length > 0 && (
              <Tip>Tap on a title to see more details!</Tip>
            )}
          </>
        }
        ListFooterComponent={<BottomSpacer />}
        renderItem={({ item }) => {
          const isFavourite = store
            .getState()
            .favouriteMovies?.find(movie => movie.imdbID === item.imdbID);

          const isLastItem = movies[movies.length - 1] === item;

          if (isFetching) {
            return null;
          }

          return (
            <MovieItem
              key={item.imdbID}
              imdbID={item.imdbID}
              Poster={item.Poster}
              Title={item.Title}
              Year={item.Year}
              hasMoreMovies={hasMoreMovies}
              isFetchingMore={isFetchingMore}
              onFetchMore={() => fetchMore("spider")}
              isLastItem={isLastItem}
              isFavourite={!!isFavourite}
              onPress={() =>
                navigation.navigate("MovieDetails", {
                  imdbID: item.imdbID,
                })
              }
            />
          );
        }}
      />
      <Toast
        ref={toastRef}
        style={styles.toast}
        textStyle={styles.toastText}
        position="bottom"
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
  modal: {
    width: round(300),
    height: round(300),
  },
});

const mapStateToProps = (state: Movie[]) => {
  const movie = {
    data: state,
  };
  return { movie };
};

export default connect(mapStateToProps)(Home);
