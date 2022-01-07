import React, {useRef, useState} from "react";
import {
  ActivityIndicator,
  PixelRatio,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from "react-native";
import {
  getBottomSpace,
  getStatusBarHeight,
  isIphoneX,
} from "react-native-iphone-x-helper";
import styled from "styled-components/native";

import api from "../service/api";
import Icons from "../icons";
import Toast from "react-native-easy-toast";

const BOTTOM_SPACER =
  (isIphoneX() ? getBottomSpace() : 0) + PixelRatio.roundToNearestPixel(20);

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTitle = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${PixelRatio.roundToNearestPixel(20)}px;
  color: #fff;
`;

const Avatar = styled.Image`
  width: ${PixelRatio.roundToNearestPixel(50)}px;
  height: ${PixelRatio.roundToNearestPixel(50)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(25)}px;
`;

const SearchbarContainer = styled.View`
  width: 100%;
  border-width: 1px;
  border-color: #8e95b2;
  border-radius: ${PixelRatio.roundToNearestPixel(100)}px;
  margin: ${PixelRatio.roundToNearestPixel(30)}px 0;
  padding: ${PixelRatio.roundToNearestPixel(16)}px;
  flex-direction: row;
`;

const SearchInput = styled.TextInput`
  flex: 1;
  margin: 0 ${PixelRatio.roundToNearestPixel(12)}px;
  font-family: "BeVietnamPro-Regular";
  font-size: ${PixelRatio.roundToNearestPixel(16)}px;
  color: #8e95b2;
`;

const Tip = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${PixelRatio.roundToNearestPixel(16)}px;
  color: #8e95b2;
`;

const MovieItemContainer = styled.Pressable`
  width: 100%;
  background-color: #242444;
  padding: ${PixelRatio.roundToNearestPixel(16)}px;
  border-radius: ${PixelRatio.roundToNearestPixel(12)}px;
  flex-direction: row;
  margin-top: ${PixelRatio.roundToNearestPixel(12)}px;
`;

const MovieItemCover = styled.Image`
  width: ${PixelRatio.roundToNearestPixel(100)}px;
  height: ${PixelRatio.roundToNearestPixel(130)}px;
`;

const MovieItemInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: ${PixelRatio.roundToNearestPixel(16)}px;
`;

const MovieItemTitle = styled.Text`
  font-family: "BeVietnamPro-ExtraBold";
  font-size: ${PixelRatio.roundToNearestPixel(20)}px;
  color: #fff;
  max-width: 100%;
`;

const MovieItemExtraInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${PixelRatio.roundToNearestPixel(12)}px;
`;

const MovieItemText = styled.Text`
  color: #8e95b2;
  font-family: "BeVietnamPro-Medium";
  margin-right: ${PixelRatio.roundToNearestPixel(4)}px;
`;

const LoadMoreMovies = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${PixelRatio.roundToNearestPixel(16)}px;
  color: #fff;
  margin-top: ${PixelRatio.roundToNearestPixel(16)}px;
  align-self: center;
`;

const Loading = styled.ActivityIndicator`
  margin-top: ${PixelRatio.roundToNearestPixel(16)}px;
`;

const BottomSpacer = styled.View`
  width: 100%;
  height: ${BOTTOM_SPACER}px;
`;

interface Movie {
  Poster?: string;
  Title?: string;
  Type?: string;
  Year?: string;
  imdbID?: string;
}

const Home: React.FC = () => {
  const toastRef = useRef<Toast>();
  const {Search} = Icons;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const [hasMoreMovies, setHasMoreMovies] = useState(true);
  const [page, setPage] = useState(2);

  const fetchMovies = async () => {
    setIsFetching(true);

    setHasMoreMovies(true);
    try {
      const {data} = await api.get("", {
        params: {
          s: search.toLowerCase().trim(),
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

  const fetchMore = async () => {
    setIsFetchingMore(true);

    try {
      setPage(prevState => prevState + 1);

      const {data} = await api.get("", {
        params: {
          s: search.toLowerCase().trim(),
          page: String(page),
        },
      });

      if (data.Response === "True") {
        setMovies(prevState => [...prevState, ...data.Search]);
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

  const LoadMoreComponent: React.FC = () => {
    if (isFetchingMore) {
      return <Loading size="small" animating />;
    }
    if (hasMoreMovies) {
      return (
        <Pressable onPress={fetchMore}>
          <LoadMoreMovies>Load more</LoadMoreMovies>
        </Pressable>
      );
    }

    return null;
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.flatlist} bounces={false}>
        <HeaderContainer>
          <HeaderTitle>Hi, William!</HeaderTitle>
          <Avatar source={require("../../assets/images/avatar.png")} />
        </HeaderContainer>
        <SearchbarContainer>
          <SearchInput
            placeholder="Search for a movie!"
            placeholderTextColor="#8e95b2"
            value={search}
            onChangeText={value => {
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
          <Pressable onPress={fetchMovies}>
            <Search />
          </Pressable>
        </SearchbarContainer>
        {isFetching && <ActivityIndicator size="large" animating />}
        {movies.length > 0 && <Tip>Tap on a title to see more details!</Tip>}
        {movies.map((movie, index) => {
          const isLastItem = movies[movies.length - 1] === movie;

          return (
            <View key={movie.imdbID || String(index)}>
              <MovieItemContainer>
                {movie.Poster === "N/A" ? (
                  <MovieItemCover
                    source={require("../../assets/images/avatar.png")}
                    resizeMode="contain"
                  />
                ) : (
                  <MovieItemCover
                    source={{uri: movie.Poster}}
                    resizeMode="cover"
                  />
                )}
                <MovieItemInfo>
                  <MovieItemTitle numberOfLines={3} ellipsizeMode="tail">
                    {movie.Title}
                  </MovieItemTitle>
                  <MovieItemExtraInfo>
                    <MovieItemText>{movie.Year}</MovieItemText>
                  </MovieItemExtraInfo>
                </MovieItemInfo>
              </MovieItemContainer>
              {isLastItem && <LoadMoreComponent />}
            </View>
          );
        })}
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
    backgroundColor: "#060D2C",
    width: "100%",
    minHeight: "100%",
    paddingTop:
      ((isIphoneX()
        ? getStatusBarHeight()
        : StatusBar.currentHeight) as number) +
      PixelRatio.roundToNearestPixel(32),
    paddingHorizontal: PixelRatio.roundToNearestPixel(20),
  },
  toast: {
    backgroundColor: "red",
  },
  toastText: {
    color: "#FFF",
    fontFamily: "BeVietnamPro-Medium",
  },
});
