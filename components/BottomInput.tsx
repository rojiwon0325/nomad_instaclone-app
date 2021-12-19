import { Ionicons } from "@expo/vector-icons";
import React, { useRef } from "react";
import { GestureResponderEvent, Platform, TextInput, TextInputProps } from "react-native";
import styled from "styled-components/native";
import MarginH from "./MarginH";

interface Props {
    InputProps?: TextInputProps;
    ref?: React.RefObject<TextInput>;
    onPress?: ((event: GestureResponderEvent) => void) | undefined;
    disabled?: boolean;
}

const BottomInput: React.FC<Props> = ({ InputProps, ref, onPress, disabled }) => {

    const input = useRef<TextInput>(null);
    return (
        <InputWrap>
            <TextInputWrap disabled={Platform.OS === "web"} onPress={() => ref ? ref.current?.focus() : input.current?.focus()} activeOpacity={1}>
                <Input
                    ref={ref ?? input}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline
                    numberOfLines={3}
                    textAlignVertical="top"
                    {...InputProps}
                />
            </TextInputWrap>
            <MarginH size="10px" />
            <SubmitText onPress={onPress} disabled={disabled}>
                <Ion name="send" size={30} />
            </SubmitText>
        </InputWrap>
    );
}

export default BottomInput;

const InputWrap = styled.View`
    padding: 40px 20px;
    padding-top: 0px;
    flex-direction: row;
    align-items: center;
`;

const TextInputWrap = styled.TouchableOpacity`
    border-radius: 20px;
    padding: 10px 20px;
    border: 1px solid ${({ theme }) => theme.colors.border};
    flex: 1;
    font-size: 18px;
    font-weight: 600;
    align-items: flex-start;
    justify-content: center;
`;

const Input = styled.TextInput`
    color:${({ theme }) => theme.colors.text};
    font-size: 18px;
    font-weight: 600;
    max-height: 100px;
`;

const SubmitText = styled.TouchableOpacity`
`;

const Ion = styled(Ionicons)`
    border-radius: 100px;
    color:${({ theme }) => theme.colors.text};
`;