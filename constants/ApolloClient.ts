import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe_getMe } from "@Igql/getMe";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import _ from "lodash";


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

const uploadHttpLink = createUploadLink({
    uri: 'http://localhost:4000/graphql'
});

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
        console.log('GraphQL Error', graphQLErrors);
    }
    if (networkError) {
        console.log("Network Error", networkError);
    }
});


const authLink = setContext((_, { headers }) => {
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
                    merge: (exi = [], inc = []) => {

                        //return _.uniqBy([...exi, ...inc], "id");
                        return [...exi, ...inc];
                    }
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
    link: authLink.concat(onErrorLink).concat(uploadHttpLink),
    cache
});



export default client;

// npx localtunnel --port 4000
