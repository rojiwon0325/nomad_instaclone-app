import { ApolloCache, useMutation } from '@apollo/client';
import { DOLIKE_MUTATION, DOUNLIKE_MUTATION } from '@constants/query/post';
import { Ionicons } from '@expo/vector-icons';
import useColorScheme from '@hooks/useColorScheme';
import { doLike } from '@Igql/doLike';
import { doUnLike } from '@Igql/doUnLike';
import { seePost_seePost_detail, seePost_seePost__count } from '@Igql/seePost';
import React from 'react';
import styled from 'styled-components/native';

const Buttons: React.FC<{ isLiked: boolean, id: number }> = ({ isLiked, id }) => {
    const isDark = useColorScheme() === 'dark';
    const updateCache = (cache: ApolloCache<any>, type: boolean | null) =>
        cache.modify({
            id: `Post:${id}`, fields: {
                _count: (prev: seePost_seePost__count) => ({
                    ...prev,
                    like: type === null ? prev.like : type ? prev.like + 1 : prev.like - 1
                }),
                detail: (prev: seePost_seePost_detail) => ({ ...prev, isLiked: type ?? prev.isLiked }),

            }
        });

    const [doLike, { loading: loadingLike }] = useMutation<doLike>(DOLIKE_MUTATION, {
        variables: { id },
        update: (cache, result) => {
            if (result.data?.doLike.ok || result.data?.doLike.error === "P2002") {
                updateCache(cache, result.data.doLike.type);
            }
        }
    });
    const [doUnLike, { loading: loadingUnLike }] = useMutation<doUnLike>(DOUNLIKE_MUTATION, {
        variables: { id },
        update: (cache, result) => {
            if (result.data?.doUnLike.ok || result.data?.doUnLike.error === "P2025") {
                updateCache(cache, result.data.doUnLike.type);
            }
        }
    });

    return (
        <>
            <Btn activeOpacity={1} onPress={() => {
                if (loadingLike || loadingUnLike) { return; }
                return isLiked ? doUnLike() : doLike();
            }}>
                <Ionicons name={isLiked ? "heart" : "heart-outline"} color={isLiked ? "red" : isDark ? "white" : "black"} size={30} />
            </Btn>
            <Btn activeOpacity={1}>
                <Ionicons name="chatbubble-outline" color={isDark ? "white" : "black"} size={30} />
            </Btn>
        </>
    );
};

const Btn = styled.TouchableOpacity`
    color:${({ theme }) => theme.colors.text};
    margin: 0;
    margin-right: 10px;
`;


export default Buttons;