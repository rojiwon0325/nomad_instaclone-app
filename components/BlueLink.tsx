import React from 'react';
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

const BlueLink: React.FC<TouchableOpacityProps & { ref?: React.RefObject<TouchableOpacity> }> = (props) => {
    return (
        <Btn {...props} activeOpacity={1}>
            <Text>{props.children}</Text>
        </Btn>
    );
};

export default BlueLink;

const Btn = styled.TouchableOpacity`
    background-color: transparent;
    padding: 3px;
    width: 100%;
    justify-content: center;
    align-items: center;
    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
`;
const Text = styled.Text`
    color: ${({ theme }) => theme.colors.primary};
    font-size: 18px;
    font-weight: 600;
`;