import React from 'react';
import { ApolloProvider } from "@apollo/client";
import client from "@constants/ApolloClient";
const Providers: React.FC = ({ children }) => {

    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    );
}

export default Providers;