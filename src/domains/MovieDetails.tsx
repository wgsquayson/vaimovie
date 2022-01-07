import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
} from "react-native";
import styled from "styled-components/native";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { DomainsStackParamList } from "./index";

import { bottomSpacer, Colors, round, screenPaddingTop } from "../ui/tokens";
import Icons from "../ui/icons";
import api from "../service/api";

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const MoviePoster = styled.Image`
  width: 80%;
  min-height: ${round(450)}px;
  align-self: center;
  border-radius: ${round(12)}px;
  margin-top: ${round(32)}px;
`;

const MovieTitle = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(24)}px;
  color: ${Colors.textPrimary};
  margin-top: ${round(32)}px;
`;

const MovieDetailContainer = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${round(12)}px;
`;

const MovieDetail = styled.Text`
  font-family: "BeVietnamPro-Regular";
  font-size: ${round(16)}px;
  color: ${Colors.lightBorder};
  max-width: 70%;
`;

const ImdbRatingContainer = styled.View`
  background-color: ${Colors.yellowStar};
  padding: 4px;
  align-items: center;
  justify-content: center;
  border-radius: 3px;
`;

const ImdbRatingText = styled.Text`
  font-family: "BeVietnamPro-Black";
  font-size: ${round(16)}px;
  color: #000;
`;

const Tags = styled.View`
  flex-direction: row;
`;

interface TagProps {
  isFirstItem?: boolean;
}

const Tag = styled.View<TagProps>`
  background-color: ${Colors.lighterBackground};
  padding: ${round(10)}px ${round(12)}px;
  border-radius: ${round(50)}px;
  align-items: center;
  justify-content: center;
  margin-top: ${round(16)}px;
  margin-left: ${({ isFirstItem }) => (isFirstItem ? 0 : round(10))}px;
`;

const TagText = styled.Text`
  font-family: "BeVietnamPro-light";
  font-size: ${round(12)}px;
  color: #fff;
`;

const SectionTitle = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
  margin-top: ${round(20)}px;
`;

const SectionText = styled.Text`
  font-family: "BeVietnamPro-Regular";
  font-size: ${round(16)}px;
  color: ${Colors.textPrimary};
  margin-top: ${round(20)}px;
`;

const BottomSpacer = styled.View`
  width: 100%;
  height: ${bottomSpacer}px;
`;

interface MovieDetailsResponse {
  Actors?: string;
  Awards?: string;
  BoxOffice?: string;
  Country?: string;
  DVD?: string;
  Director?: string;
  Genre?: string;
  Language?: string;
  Metascore?: string;
  Plot?: string;
  Poster?: string;
  Production?: string;
  Rated?: string;
  Ratings: {
    Source: string;
    Value: string;
  }[];
  Released?: string;
  Runtime?: string;
  Title?: string;
  Writer?: string;
  Year: string;
  imdbRating?: string;
  imdbVotes?: string;
  Type?: string;
  Website?: string;
}

const MovieDetails: React.FC = () => {
  const { Back } = Icons;

  const [movie, setMovie] = useState<MovieDetailsResponse>();
  const [isFetching, setIsFetching] = useState(true);

  const navigation =
    useNavigation<
      NativeStackNavigationProp<DomainsStackParamList, "MovieDetails">
    >();

  const route = useRoute<RouteProp<DomainsStackParamList, "MovieDetails">>();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("", {
          params: {
            i: route.params.imdbID,
            plot: "full",
          },
        });

        if (data.Response === "True") {
          setMovie(data);
        } else {
          //toastRef.current?.show("No movies found.", 2000);
        }
      } catch (error) {
        //toastRef.current?.show("An error ocurred. Try again later", 2000);
      } finally {
        setIsFetching(false);
      }
    })();
  }, []);

  const Content: React.FC = () => {
    const genres = movie?.Genre?.split(", ") ?? [];

    return (
      <>
        {movie?.Poster === "N/A" ? (
          <MoviePoster
            source={require("../../assets/images/avatar.png")}
            resizeMode="contain"
          />
        ) : (
          <MoviePoster source={{ uri: movie?.Poster }} resizeMode="cover" />
        )}
        <MovieTitle>{movie?.Title}</MovieTitle>
        <MovieDetailContainer>
          <MovieDetail>
            {movie?.Year} | {movie?.Director || movie?.Writer}{" "}
          </MovieDetail>
          <ImdbRatingContainer>
            <ImdbRatingText>IMDb {movie?.imdbRating}</ImdbRatingText>
          </ImdbRatingContainer>
        </MovieDetailContainer>
        <Tags>
          {genres?.length > 0 &&
            genres?.map(item => {
              const isFirstItem = item === genres[0];

              return (
                <Tag key={item} isFirstItem={isFirstItem}>
                  <TagText>{item}</TagText>
                </Tag>
              );
            })}
        </Tags>
        <SectionTitle>Synopsis</SectionTitle>
        <SectionText>{movie?.Plot}</SectionText>
      </>
    );
  };

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundDark}
      />
      <ScrollView contentContainerStyle={styles.flatlist} bounces={false}>
        <Header>
          <Pressable hitSlop={round(30)} onPress={navigation.goBack}>
            <Back />
          </Pressable>
        </Header>
        {isFetching ? (
          <ActivityIndicator size="large" animating />
        ) : (
          <Content />
        )}
        <BottomSpacer />
      </ScrollView>
    </>
  );
};

export default MovieDetails;

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
