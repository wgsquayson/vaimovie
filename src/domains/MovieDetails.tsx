import React, { useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, StatusBar, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { DomainsStackParamList } from "./index";
import { connect } from "react-redux";
import { store } from "../store";

import { bottomSpacer, Colors, round, screenPaddingTop } from "../ui/tokens";
import Icons from "../ui/icons";
import api from "../service/api";
import Toast from "react-native-easy-toast";
import { BackButton, FullscreenLoading } from "../ui/components";

import { addFavourite, removeFavourite } from "../store/actions";
import { Movie } from "./Home";

const Header = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const MoviePoster = styled.Image`
  width: 80%;
  height: ${round(450)}px;
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
  color: ${Colors.textPrimary};
`;

const SectionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: ${round(20)}px;
`;

const SectionTitle = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
  margin-left: ${round(8)}px;
`;

const SectionText = styled.Text`
  font-family: "BeVietnamPro-Regular";
  font-size: ${round(16)}px;
  line-height: ${round(24)}px;
  color: ${Colors.lightBorder};
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
  const toastRef = useRef<Toast>();

  const { Star, Information, Award, Movie: MovieIcon } = Icons;

  const [movie, setMovie] = useState<MovieDetailsResponse>();
  const [isFetching, setIsFetching] = useState(true);
  const [isFavourite, setIsFavourite] = useState(false);

  const route = useRoute<RouteProp<DomainsStackParamList, "MovieDetails">>();

  const isMovieFavourite = store
    .getState()
    .favouriteMovies?.find(item => item.imdbID === route.params.imdbID);

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
          toastRef.current?.show("Nothing found.", 2000);
        }
      } catch (error) {
        toastRef.current?.show("An error ocurred. Try again later", 2000);
      } finally {
        setIsFetching(false);
      }
    })();

    setIsFavourite(isMovieFavourite !== undefined);
  }, []);

  const handleFavourite = () => {
    if (isMovieFavourite) {
      store.dispatch(removeFavourite(route.params.imdbID));

      toastRef.current?.show("Removed from favourites.", 2000);
    } else {
      store.dispatch(
        addFavourite({
          imdbID: route.params.imdbID,
          Poster: movie?.Poster,
          Title: movie?.Title,
          Type: movie?.Type,
          Year: movie?.Year,
        }),
      );

      toastRef.current?.show("Saved as favourite!", 2000);
    }

    setIsFavourite(!isMovieFavourite);
  };

  const genres = movie?.Genre?.split(", ") ?? [];

  if (isFetching) {
    return <FullscreenLoading />;
  }

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={Colors.backgroundDark}
      />
      <ScrollView contentContainerStyle={styles.flatlist} bounces={false}>
        <Header>
          <BackButton />
          <Pressable hitSlop={round(30)} onPress={handleFavourite}>
            <Star
              width={24}
              height={24}
              fill={isFavourite ? Colors.yellowStar : Colors.lightBorder}
            />
          </Pressable>
        </Header>
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
            {movie?.Year} |{" "}
            {movie?.Director === "N/A" ? movie?.Writer : movie?.Director}{" "}
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
        <SectionTitleContainer>
          <MovieIcon />
          <SectionTitle>Synopsis</SectionTitle>
        </SectionTitleContainer>
        <SectionText>{movie?.Plot}</SectionText>
        <SectionTitleContainer>
          <Award />
          <SectionTitle>Awards</SectionTitle>
        </SectionTitleContainer>
        <SectionText>{movie?.Awards}</SectionText>
        <SectionTitleContainer>
          <Star fill={Colors.textPrimary} />
          <SectionTitle>Ratings</SectionTitle>
        </SectionTitleContainer>
        {movie?.Ratings.map(item => (
          <SectionText key={item.Source}>
            {item.Source} - {item.Value}
          </SectionText>
        ))}
        <SectionTitleContainer>
          <Information />
          <SectionTitle>Other info</SectionTitle>
        </SectionTitleContainer>
        <SectionText>
          Rated - {movie?.Rated ?? "N/A"}
          {"\n"}
          Box office - {movie?.BoxOffice ?? "N/A"}
          {"\n"}
          Runtime - {movie?.Runtime ?? "N/A"}
          {"\n"}
          Dvd release date - {movie?.DVD ?? "N/A"}
          {"\n"}
          Writers - {movie?.Writer ?? "N/A"}
          {"\n"}
          Country - {movie?.Country ?? "N/A"}
          {"\n"}
          Languages - {movie?.Language ?? "N/A"}
          {"\n"}
          Total IMDb votes - {movie?.imdbVotes ?? "N/A"}
          {"\n"}
        </SectionText>
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

export default connect(mapStateToProps)(MovieDetails);
