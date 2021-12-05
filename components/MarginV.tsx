import React from "react";
import styled from "styled-components/native";

const MarginV: React.FC<{ size: string }> = ({ size }) => <Margin size={size} />;

const Margin = styled.View<{ size: string }>`
    height: ${({ size }) => size};
`;

export default MarginV;