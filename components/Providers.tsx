import React, { Suspense } from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "@constants/ApolloClient";
import { RecoilRoot } from 'recoil';
import { ActivityIndicator } from 'react-native';
const Providers: React.FC = ({ children }) => {

    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                <Suspense fallback={<ActivityIndicator />}>
                    {children}
                </Suspense>
            </RecoilRoot>
        </ApolloProvider>
    );
}

export default Providers;