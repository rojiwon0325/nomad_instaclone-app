import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TOKEN = 'jwt';
export const jwToken = makeVar<string | null>(null);
export const isLogin = makeVar<boolean>(false);

export const login = async (token: string) => {
    await AsyncStorage.setItem(TOKEN, token);
    jwToken(token);
    isLogin(true);
};

export const logout = async () => {
    await AsyncStorage.removeItem(TOKEN);
    jwToken(null);
    isLogin(false);
};

const httpLink = createHttpLink({
    uri: 'http://localhost:4000/graphql',
});

const auth = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            jwt: jwToken()
        },
    }
});


const client = new ApolloClient({
    link: auth.concat(httpLink),
    cache: new InMemoryCache({
        typePolicies: {
            User: {
                keyFields: (obj) => `${obj.__typename}:${obj.account}`,
            },
            Query: {
                fields: {
                    seePost: {
                        keyArgs: ["id", "account"],
                        merge: (exi = [], inc = []) => [...exi, ...inc]
                    }
                }
            }

        }
    }),
});

export default client;

// npx localtunnel --port 4000
