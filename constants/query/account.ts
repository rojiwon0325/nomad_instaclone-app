import { gql } from "@apollo/client";

export const USER_FRAGMENT = gql`
    fragment User on User{
        username
        account
        avatarUrl
        isMe
        isFollowing
        isRequesting
        profile{
            isPublic
            bio
            _count{
                post
                follower
                following
            }
        }
    }
`;

export const LOGIN_MUTATION = gql`
    mutation login($account:String! $password:String!){
        login(account: $account password:$password){
            ok
            error
            token
        }
    }
`;

export const NEWACCOUNT_MUTATION = gql`
    mutation newAccount($username:String! $account:String! $password:String!){
        newAccount(username:$username account: $account password:$password){
            ok
            error
        }
    }
`;

export const GETME_QUERY = gql`
    query getMe{
        getMe{
            ...User
        }
    }
    ${USER_FRAGMENT}
`;

export const SEEPROFILE_QUERY = gql`
    query seeProfile($account: String!){
        seeProfile(account: $account){
            ...User
        }
    }
    ${USER_FRAGMENT}
`;

export const REQUESTFOLLOW_MUTATION = gql`
    mutation requestFollow($account:String!){
        requestFollow(account: $account){
            ok
            error
        }
    }
`;

export const DELETEFOLLOWING_MUTATION = gql`
    mutation deleteFollowing($account:String!){
        deleteFollowing(account: $account){
            ok
            error
        }
    }
`;