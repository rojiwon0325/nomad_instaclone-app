import React from 'react';
import useColorScheme from '@hooks/useColorScheme';
import styled from 'styled-components/native';

const Logo: React.FC = () => {
    const isDark = useColorScheme() === 'dark';
    const logo_dark = require("../assets/images/logo_dark.png");
    const logo_light = require("../assets/images/logo_light.png");

    return (<Img resizeMode="contain" source={isDark ? logo_dark : logo_light} />);
};

const Img = styled.Image`
    width: 100%;
    height: 100%;
`;

export default Logo;