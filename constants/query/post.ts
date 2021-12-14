import { gql } from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
    fragment Comment on Comment{
        id
        text
        rootId
        account
        createdAt
        _count{
            reComment
        }
        isMine
    }
`;

export const POSTDETAIL_FRAGMENT = gql`
    fragment Post_detail on Post_detail{
        isMine
        caption
        account
        isLiked
        createdAt
        avatarUrl
        comments{
            ...Comment
        }
    }
    ${COMMENT_FRAGMENT}
`;

export const FEED_FRAGMENT = gql`
    fragment Feed on Post{
        id
        photo
        _count{
            like
            comment
            reComment
        }
    }
`;

export const SEEPOST_QUERY = gql`
    query seePost($id:Int $offset:Int $account:String){
        seePost(id:$id offset:$offset account:$account){
            ...Feed
            detail{
                ...Post_detail
            }
        }
    }
    ${FEED_FRAGMENT}
    ${POSTDETAIL_FRAGMENT}
`;

export const DOLIKE_MUTATION = gql`
    mutation doLike($id: Int!){
        doLike(id:$id){
            ok
            error
            type
        }
    }
`;

export const DOUNLIKE_MUTATION = gql`
    mutation doUnLike($id: Int!){
        doUnLike(id:$id){
            ok
            error
            type
        }
    }
`;

export const SEECOMMENT_QUERY = gql`
    query seeComment($postId:Int! $rootId:Int $offset:Int $take:Int){
        seeComment(postId:$postId rootId:$rootId offset:$offset take:$take){
            ...Comment
        }
    }
    ${COMMENT_FRAGMENT}
`;

export const DELETECOMMENT_MUTATION = gql`
    mutation deleteComment($id: Int!){
        deleteComment(id:$id){
            ok
            error
        }
    }
`;

export const NEWCOMMENT_MUTATION = gql`
    mutation newComment($postId:Int! $text:String! $rootId:Int){
        newComment(postId:$postId text:$text rootId:$rootId){
            ok
            error
            comment{
                ...Comment
            }
        }
    }
    ${COMMENT_FRAGMENT}
`;

export const SEEFEED_QUERY = gql`
    query seeFeed($account:String! $offset:Int){
        seeFeed(account:$account offset: $offset){
            ...Feed
        }
    }
    ${FEED_FRAGMENT}
`;

export const NEWPOST_MUTATION = gql`
    mutation newPost($photo:[Upload!]! $caption:String!){
        newPost(photo:$photo caption: $caption){
            ok
            error
        }
    }
`;
