import { ApolloClient, InMemoryCache, makeVar, split } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getMe_getMe } from "@Igql/getMe";
import { onError } from "@apollo/client/link/error";
import { createUploadLink } from "apollo-upload-client";
import { WebSocketLink } from "@apollo/client/link/ws";
import _ from "lodash";
import { getMainDefinition } from "@apollo/client/utilities";


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
    jwToken(null);
    isLogin(false);
    Promise.all([
        AsyncStorage.removeItem(TOKEN),
        AsyncStorage.clear(),
        client.clearStore()
    ]);
};

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: {
        reconnect: true,
        connectionParams: () => ({
            jwt: jwToken(),
        })
    }
});

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

const filtering = (array: any[]) => {
    return array.filter((item1, idx) => array.findIndex(item2 => item1.__ref === item2.__ref) === idx);
}


export const cache = new InMemoryCache({
    typePolicies: {
        User: {
            keyFields: (obj) => `${obj.__typename}:${obj.account}`,
        },
        ChatRoom: {
            fields: {
                chat: {
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                }
            }
        },
        Query: {
            fields: {
                seePost: {
                    keyArgs: ["id", "account"],
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                },
                seeFeed: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => {
                        if (inc === null) {
                            return exi;
                        } else if (exi === null) {
                            return inc;
                        } else {
                            return filtering([...exi, ...inc]);
                        }
                    }
                },
                seeLike: {
                    keyArgs: ["id"],
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                },
                seeFollower: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                },
                seeFollowing: {
                    keyArgs: ["account"],
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                },
                seeComment: {
                    keyArgs: ["postId", "rootId"],
                    merge: (exi = [], inc = []) => filtering([...exi, ...inc]),
                },
            }
        }

    }
});
const httpLink = authLink.concat(onErrorLink).concat(uploadHttpLink);
const splitLink = split(
    ({ query }) => {
        const definition = getMainDefinition(query);
        return (
            definition.kind === "OperationDefinition" &&
            definition.operation === "subscription"
        );
    },
    wsLink,
    httpLink
);

const client = new ApolloClient({
    link: splitLink,
    cache
});



export default client;

// npx localtunnel --port 4000
