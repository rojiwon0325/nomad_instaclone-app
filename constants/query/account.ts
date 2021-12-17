import { gql } from "@apollo/client";

export const PROFILE_FRAGMENT = gql`
    fragment Profile on Profile{
        isPublic
        bio
        _count{
            post
            follower
            following
        }
    }
`;

export const SIMPLEUSER_FRAGMENT = gql`
    fragment SimpleUser on User{
        username
        account
        avatarUrl
        isMe
        isFollowing
        isRequesting
        isRequested
    }
`;

export const USER_FRAGMENT = gql`
    fragment User on User{
        ...SimpleUser
        profile{
            ...Profile
        }
    }
    ${SIMPLEUSER_FRAGMENT}
    ${PROFILE_FRAGMENT}
`;

export const CHAT_FRAGMENT = gql`
    fragment Chat on Chat{
        id
        text
        read
        roomId
        account
        createdAt
    }
`;

export const CHATROOM_FRAGMENT = gql`
    fragment ChatRoom on ChatRoom{
        id
        user{
            account
            username
            avatarUrl
        }
        chat{
            ...Chat
        }
        updatedAt
    }
    ${CHAT_FRAGMENT}
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

export const CHECKACCESS_QUERY = gql`
    query checkAccess($account: String!){
        checkAccess(account: $account)
    }
`;

export const SEEFOLLOWER_QUERY = gql`
    query seeFollower($account: String! $offset:Int){
        seeFollower(account: $account offset:$offset){
            ...SimpleUser
        }
    }
    ${SIMPLEUSER_FRAGMENT}
`;

export const SEEFOLLOWING_QUERY = gql`
    query seeFollowing($account: String! $offset:Int){
        seeFollowing(account: $account offset:$offset){
            ...SimpleUser
        }
    }
    ${SIMPLEUSER_FRAGMENT}
`;

export const SEELIKE_QUERY = gql`
    query seeLike($id:Int! $offset:Int){
        seeLike(id:$id offset:$offset){
            ...SimpleUser
        }
    }
    ${SIMPLEUSER_FRAGMENT}
`;

export const SEARCHUSERS_QUERY = gql`
    query searchUsers($key:String!){
        searchUsers(key:$key){
            ...SimpleUser
        }
    }
    ${SIMPLEUSER_FRAGMENT}
`;

export const RESPONSEFOLLOW_MUTATION = gql`
    mutation responseFollow($account:String! $accept: Boolean!){
        responseFollow(account: $account, accept: $accept) {
            ok
            error
        }
    }
`;

export const SEEROOMLIST_QUERY = gql`
    query seeRoomList($cursor:Int){
        seeRoomList(cursor: $cursor){
            ...ChatRoom
        }
    }
    ${CHATROOM_FRAGMENT}
`;

export const SEEROOM_QUERY = gql`
    query seeRoom($roomId:Int! $cursor:Int){
        seeRoom(roomId:$roomId cursor: $cursor){
            ...ChatRoom
        }
    }
    ${CHATROOM_FRAGMENT}
`;

export const FINDORCREATEROOM_QUERY = gql`
    query findOrCreateRoom($account:String!){
        findOrCreateRoom(account: $account)
    }
`;
