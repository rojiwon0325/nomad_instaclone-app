import "styled-components";

declare module "styled-components" {
    export interface DefaultTheme {
        dark: boolean;
        colors: {
            primary: string;
            background: string;
            bar: string;
            card: string;
            text: string;
            subtext: string;
            border: string;
            notification: string;
        }
    }
}