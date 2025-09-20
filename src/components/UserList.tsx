import React from 'react';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import { User } from '../types/user';
import UserItem from './UserItem';

interface Props {
  users: User[];
  editingId?: string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onEndReached?: () => void;
}

const UserList: React.FC<Props> = ({
  users,
  onEdit,
  onDelete,
  onEndReached,
}) => {
  if (!users.length) {
    return (
      <View style={styles.empty}>
        <Text>No users found</Text>
      </View>
    );
  }

  const renderItem = ({ item }: { item: User }) => (
    <>
      <UserItem user={item} onEdit={onEdit} onDelete={onDelete} />
      <View style={styles.divider} />
    </>
  );

  return (
    <FlatList
      data={users}
      keyExtractor={item => item.id}
      contentContainerStyle={styles.list}
      renderItem={renderItem}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
    />
  );
};

const styles = StyleSheet.create({
  empty: { padding: 20, alignItems: 'center' },
  list: { paddingBottom: 40, paddingHorizontal: 16, paddingTop: 8 },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 4,
    marginHorizontal: 12,
  },
});

export default UserList;
