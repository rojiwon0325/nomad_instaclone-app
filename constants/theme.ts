
const YELLOW: string = "#ffa801";
const BLACK: string = "#1e272e";
const LIGHT_BLACK: string = "rgba(30,39,46, 0.8)";
const WHITE: string = "rgb(242,242,242)";

export interface CustomTheme {
    dark: boolean;
    colors: {
        primary: string;
        background: string;
        subbackground: string;
        card: string;
        text: string;
        subtext: string;
        border: string;
        notification: string;
    }
}

export const DarkTheme: CustomTheme = {
    dark: true,
    colors: {
        primary: YELLOW,
        background: BLACK,
        subbackground: BLACK,
        card: 'rgb(18, 18, 18)',
        text: WHITE,
        subtext: "rgba(242,242,242,0.8)",
        border: 'rgb(39, 39, 41)',
        notification: 'rgb(255, 69, 58)',
    },
}
export const DefaultTheme: CustomTheme = {
    dark: false,
    colors: {
        primary: YELLOW,
        background: 'rgb(255, 255, 255)',
        subbackground: 'rgb(255, 255, 255)',
        card: WHITE,
        text: BLACK,
        subtext: LIGHT_BLACK,
        border: 'rgb(216, 216, 216)',
        notification: 'rgb(255, 59, 48)',
    },
}