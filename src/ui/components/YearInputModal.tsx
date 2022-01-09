import React from "react";
import { Platform, Pressable, StyleSheet } from "react-native";
import { Modalize, ModalizeProps } from "react-native-modalize";
import styled from "styled-components/native";

import { Colors, round } from "../tokens";
import Icons from "../icons";

const Container = styled.View`
  padding: ${round(30)}px ${round(20)}px;
`;

const Label = styled.Text`
  font-family: "BeVietnamPro-Bold";
  font-size: ${round(20)}px;
  color: ${Colors.textPrimary};
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

interface YearInputModalProps extends ModalizeProps {
  value?: string;
  onChangeText: (year: string) => void;
  onPress: () => void;
}

const YearInputModal: React.ForwardRefRenderFunction<
  Modalize,
  YearInputModalProps
> = ({ value, onChangeText, onPress }, ref) => {
  const { Check } = Icons;

  return (
    <Modalize
      modalStyle={styles.modal}
      ref={ref}
      snapPoint={Platform.OS === "ios" ? 570 : 425}>
      <Container>
        <Label>
          If you'd like, you can add a year to filter the movie or show of your
          search:
        </Label>
        <SearchbarContainer>
          <SearchInput
            placeholder="Leave empty if you don't want."
            placeholderTextColor={Colors.lightBorder}
            value={value}
            onChangeText={onChangeText}
            returnKeyType="done"
            keyboardType="number-pad"
            maxLength={4}
            autoFocus
            onBlur={() => {
              onPress();
            }}
            autoCorrect={false}
          />
          <Pressable onPress={onPress}>
            <Check />
          </Pressable>
        </SearchbarContainer>
      </Container>
    </Modalize>
  );
};

export default React.forwardRef(YearInputModal);

const styles = StyleSheet.create({
  modal: {
    backgroundColor: Colors.lighterBackground,
    flex: 1,
  },
});
