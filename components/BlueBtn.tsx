import React from 'react';
import { ActivityIndicator, TouchableOpacity, TouchableOpacityProps } from "react-native";
import styled from "styled-components/native";

const BlueBtn: React.FC<TouchableOpacityProps & { ref?: React.RefObject<TouchableOpacity>, loading?: Boolean }> = (props) => {

    return (
        <Btn {...props} activeOpacity={1}>
            {props.loading ? <ActivityIndicator color="white" />
                : <Text disabled={props.disabled ?? false}>{props.children}</Text>}
        </Btn>
    );
};
export default BlueBtn;

const Btn = styled.TouchableOpacity`
    background-color: ${({ theme, disabled }) => disabled ? "rgba(0,149,253, 0.5)" : theme.colors.primary};
    border: 1px solid transparent;
    border-radius: 4px;
    padding: 10px 12px;
    width: 100%;
    justify-content: center;
    align-items: center;
`;
const Text = styled.Text <{ disabled: boolean }>`
    opacity: ${({ disabled }) => disabled ? "0.5" : "1"};
    color: white;
    font-size: 18px;
    font-weight: 600;
`;