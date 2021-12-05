import { DefaultTheme } from "styled-components/native";

const primary = "rgb(0,149,253)";
const notification = "rgb(237, 73, 86)";

export const DarkTheme: DefaultTheme = {
    dark: true,
    colors: {
        primary,
        background: "rgb(0,0,0)",
        bar: "rgb(15,15,15)",
        card: "rgb(15,15,15)",
        text: "rgb(255,255,255)",
        subtext: "rgb(217,217,217)",
        border: 'rgb(80, 80, 80)',
        notification,
    },
}
export const LightTheme: DefaultTheme = {
    dark: false,
    colors: {
        primary,
        background: "rgb(250,250,250)",
        bar: "rgb(255,255,255)",
        card: "rgb(255,255,255)",
        text: "rgb(0,0,0)",
        subtext: "rgb(38,38,38)",
        border: "rgb(219,219,219)",
        notification,
    },
}