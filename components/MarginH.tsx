import React from "react";
import styled from "styled-components/native";

const MarginH: React.FC<{ size: string }> = ({ size }) => <Margin size={size} />;

const Margin = styled.View<{ size: string }>`
    width: ${({ size }) => size};
`;

export default MarginH;