import React from "react";
import { Controller, useForm } from "react-hook-form";
import styled from "styled-components/native";

const SearchBar: React.FC<{ onValid: ({ key }: { key: string }) => void, onInValid: () => void }> = ({ onValid, onInValid }) => {
    const { control, handleSubmit } = useForm<{ key: string }>();
    return (
        <Wrap>
            <Controller
                control={control}
                name="key"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                    <SearchInput placeholder="검색"
                        autoFocus
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        placeholderTextColor={"rgb(142,142,142)"}
                        returnKeyType="search"
                        onSubmitEditing={handleSubmit(onValid, onInValid)}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                    />
                )}
            />
        </Wrap>
    );
};

export default SearchBar;

const Wrap = styled.View`
    width: 100%;
    height: 80px;
    align-items: center;
    justify-content: center;
`;

const SearchInput = styled.TextInput`
    color: ${({ theme }) => theme.colors.text};
    width: 90%;
    background-color: ${({ theme }) => theme.colors.bar};
    border-radius: 10px;
    font-size: 20px;
    font-weight: 600;
    padding: 10px 20px;
    margin: 15px 0;
`;
