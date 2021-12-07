import { ApolloClient, createHttpLink, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe_getMe } from "@Igql/getMe";

const TOKEN = 'jwt';
export const jwToken = makeVar<string | null>(null);
export const isLogin = makeVar<boolean>(false);
export const myData = makeVar<getMe_getMe | null>(null);

export const login = async (token: string) => {
    await AsyncStorage.setItem(TOKEN, token);
    jwToken(token);
    isLogin(true);
};

export const logout = async () => {
    await AsyncStorage.removeItem(TOKEN);
    await AsyncStorage.clear();
    await client.clearStore();
    jwToken(null);
    isLogin(false);
};

const httpLink = createHttpLink({
    uri: 'https://kind-turtle-89.loca.lt/graphql',
});

const auth = setContext((_, { headers }) => {
    return {
        headers: {
            ...headers,
            jwt: jwToken()
        },
    }
});


export const cache = new InMemoryCache({
    typePolicies: {
        User: {
            keyFields: (obj) => `${obj.__typename}:${obj.account}`,
        },
        Query: {
            fields: {
                seePost: {
                    keyArgs: ["id", "account"],
                    merge: (exi = [], inc = []) => [...exi, ...inc]
                },
                seeFeed: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => {
                        if (inc === null) {
                            return exi;
                        } else if (exi === null) {
                            return inc;
                        } else {
                            return [...exi, ...inc];
                        }
                    }
                },
                seeLike: {
                    keyArgs: ["id"],
                    merge: (exi = [], inc = []) => [...exi, ...inc]
                },
                seeFollower: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => [...exi, ...inc]
                },
                seeFollowing: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => [...exi, ...inc]
                },
                seeComment: {
                    keyArgs: ["postId", "rootId"],
                    merge: (exi = [], inc = []) => [...exi, ...inc]
                }
            }
        }

    }
});

const client = new ApolloClient({
    link: auth.concat(httpLink),
    cache
});



export default client;

// npx localtunnel --port 4000
