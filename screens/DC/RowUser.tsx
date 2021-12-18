import { Avatar, MarginH } from "@components";
import useDateCalc from "@hooks/useDateCalc";
import { seeRoomList_seeRoomList } from "@Igql/seeRoomList";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React from "react";
import styled from "styled-components/native";
import { DCStackParamList } from "types";

const RowUser: React.FC<{ navigation: NativeStackNavigationProp<DCStackParamList, "Rooms">, room: seeRoomList_seeRoomList }> = ({ navigation, room }) => {
    const { id, user, chat, updatedAt } = room;
    const date = useDateCalc(updatedAt);
    return (
        <Container onPress={() => navigation.navigate("Chat", { roomId: id, account: user[0].account })}>
            <Avatar avatarUrl={user[0].avatarUrl} />
            <MarginH size="10px" />
            <Info>
                <Username numberOfLines={1} ellipsizeMode="tail">{user.map(elem => elem.username).join('·')}</Username>
                <Message numberOfLines={1} ellipsizeMode="tail">{
                    chat[0].account === user[0].account
                        ? chat[0].text
                        : "보낸 문자"
                }</Message>
            </Info>
            <MarginH size="10px" />
            <Message>{date}</Message>
        </Container>
    );
}
export default RowUser;


const Container = styled.TouchableOpacity`
    width: 100%;
    height: 80px;
    padding: 10px;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
`;

const AvatarWrap = styled.View`
    height: 100%;
    aspect-ratio: 1;
    flex-wrap: wrap;
`;


const Info = styled.View`
    flex: 1;
    flex-direction: column;
`;

const Username = styled.Text`
    color: ${({ theme }) => theme.colors.text};
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
`;

const Message = styled.Text`
    color: ${({ theme }) => theme.colors.subtext};
    font-size: 16px;
    font-weight: 500;
`;