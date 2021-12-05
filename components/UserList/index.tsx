import React from 'react';
import { FlatList } from 'react-native';
import Row from './RowUser';
import { SimpleUser } from '@Igql/SimpleUser';


const UserList: React.FC<{ users: SimpleUser[] | null | undefined }> = ({ users }) => {
    return <FlatList<SimpleUser>
        data={users ?? []}
        keyExtractor={({ account }) => account}
        renderItem={({ item: user }) => <Row user={user} />}
    />;
}

export default UserList;