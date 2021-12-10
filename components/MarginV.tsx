import React from "react";
import styled from "styled-components/native";

const MarginV: React.FC<{ size: string, color?: string }> = ({ size, color }) => <Margin size={size} color={color} />;

const Margin = styled.View<{ size: string, color: string | undefined }>`
    height: ${({ size }) => size};
    background-color: ${({ color }) => color ? color : "rgba(0,0,0,0)"};
`;

export default MarginV;