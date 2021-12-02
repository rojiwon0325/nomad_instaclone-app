import styled from "styled-components/native";

const AuthInput = styled.TextInput`
    width: 100%;
    background-color: ${({ theme }) => theme.colors.bar};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 5px;
    color: ${({ theme }) => theme.colors.text};
    padding: 12px;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    margin-bottom: 10px;
`;

export default AuthInput;