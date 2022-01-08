import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable } from "react-native";
import Icons from "../icons";
import { round } from "../tokens";

const BackButton: React.FC = () => {
  const navigation = useNavigation();

  const { Back } = Icons;

  return (
    <Pressable hitSlop={round(30)} onPress={navigation.goBack}>
      <Back />
    </Pressable>
  );
};

export default BackButton;
