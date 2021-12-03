import React from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "@constants/ApolloClient";
import { RecoilRoot } from 'recoil';

const Providers: React.FC = ({ children }) => {

    return (
        <ApolloProvider client={client}>
            <RecoilRoot>
                {children}
            </RecoilRoot>
        </ApolloProvider>
    );
}

export default Providers;