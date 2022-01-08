import React from "react";
import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

import { Colors } from "../tokens";

const Container = styled.View`
  flex: 1;
  background-color: ${Colors.backgroundDark};
  justify-content: center;
  align-items: center;
`;

const FullscreenLoading: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size="large" animating />
    </Container>
  );
};

export default FullscreenLoading;
