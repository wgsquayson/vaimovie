import React, { useEffect, useRef, useState } from "react";
import { FlatList, StatusBar, StyleSheet } from "react-native";
import styled from "styled-components/native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { connect } from "react-redux";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";

import { store } from "../store";

import { DomainsStackParamList } from "./index";

import Icons from "../ui/icons";
import { bottomSpacer, Colors, round, screenPaddingTop } from "../ui/tokens";
import { BackButton, MovieItem } from "../ui/components";
import { signIn, signOut, User } from "../store/actions";
import Toast from "react-native-easy-toast";

const HeaderContainer = styled.View`
  width: 100%;
  flex-direction: column;
`;

const SectionTitleContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

interface SectionTitleProps {
  hasLeftMargin?: boolean;
  hasRightMargin?: boolean;
}

const SectionTitle = styled.Text<SectionTitleProps>`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
  margin-left: ${({ hasLeftMargin }) => (hasLeftMargin ? round(8) : 0)}px;
  margin-right: ${({ hasRightMargin }) => (hasRightMargin ? round(8) : 0)}px;
`;

const Detail = styled.Text`
  font-family: "BeVietnamPro-Medium";
  font-size: ${round(16)}px;
  color: ${Colors.lightBorder};
  margin-top: ${round(10)}px;
`;

const UserSection = styled.View`
  width: 100%;
  margin-top: ${round(20)}px;
  flex-direction: row;
  align-items: center;
`;

const UserPhoto = styled.Image`
  width: ${round(75)}px;
  height: ${round(75)}px;
  border-radius: ${round(37.5)}px;
`;

const GoogleSignBtn = styled.Pressable`
  width: 100%;
  background-color: ${Colors.lighterBackground};
  align-items: center;
  justify-content: center;
  flex-direction: row;
  padding: ${round(12)}px;
  border-radius: ${round(10)}px;
  margin: ${round(20)}px 0;
`;

const GoogleSignBtnText = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(16)}px;
  color: ${Colors.textPrimary};
  margin-left: ${round(8)}px;
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

const UserProfile: React.FC = () => {
  const toastRef = useRef<Toast>();
  const navigation =
    useNavigation<
      NativeStackNavigationProp<DomainsStackParamList, "UserProfile">
    >();

  const isFocused = useIsFocused();

  const { Star, Google, User: UserIcon } = Icons;

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loggedUser, setLoggedUser] = useState<User | undefined>(undefined);

  const login = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const { idToken, user } = await GoogleSignin.signIn();

      const credential = auth.GoogleAuthProvider.credential(idToken);

      await auth().signInWithCredential(credential);

      store.dispatch(
        signIn({
          id: user.id,
          name: user.name || user.givenName || user.familyName || "",
          photo: user.photo ?? "",
        }),
      );

      setLoggedUser({
        id: user.id,
        name: user.name || user.givenName || user.familyName || "",
        photo: user.photo ?? "",
      });
    } catch (error) {
      toastRef.current?.show(
        "Failed attempt to sign in. Try again later.",
        2000,
      );
    }
  };

  const logout = async () => {
    try {
      store.dispatch(signOut(loggedUser?.id as string));

      setLoggedUser(undefined);

      await GoogleSignin.revokeAccess();

      await GoogleSignin.signOut();

      auth().signOut();
    } catch (error) {
      toastRef.current?.show(
        "Failed attempt to sign out. Try again later.",
        2000,
      );
    }
  };

  const UserSectionComponent: React.FC = () => {
    if (loggedUser) {
      return (
        <UserSection>
          {loggedUser.photo ? (
            <UserPhoto source={{ uri: loggedUser.photo }} />
          ) : (
            <UserIcon />
          )}
          <SectionTitle hasLeftMargin>{loggedUser.name}</SectionTitle>
        </UserSection>
      );
    }

    return <Detail>You're not signed in yet.</Detail>;
  };

  const GoogleBtn: React.FC = () => {
    if (loggedUser) {
      return (
        <GoogleSignBtn onPress={logout}>
          <GoogleSignBtnText>Sign out</GoogleSignBtnText>
        </GoogleSignBtn>
      );
    }

    return (
      <GoogleSignBtn onPress={login}>
        <Google />
        <GoogleSignBtnText>Sign in with Google</GoogleSignBtnText>
      </GoogleSignBtn>
    );
  };

  useEffect(() => {
    if (isFocused) {
      setMovies(store.getState().favouriteMovies);
      setLoggedUser(
        store.getState().users.find(user => user.signedIn === true),
      );
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
            <SectionTitleContainer>
              <BackButton />
              <SectionTitle hasLeftMargin>Your profile</SectionTitle>
            </SectionTitleContainer>
            <UserSectionComponent />
            <GoogleBtn />
            <SectionTitleContainer>
              <SectionTitle hasRightMargin>Your favourites</SectionTitle>
              <Star />
            </SectionTitleContainer>
            {movies.length > 0 && (
              <Detail>
                Only the best! Tap on a title to see more details.
              </Detail>
            )}
          </HeaderContainer>
        }
        ListEmptyComponent={
          <Detail>
            No favourites yet. To save a title as a favourite, tap on the star
            on the upper right corner, when checking the movie details.
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

export default connect(mapStateToProps)(UserProfile);
