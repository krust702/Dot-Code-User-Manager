import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types/user';

interface Props {
  user: User;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const UserItem: React.FC<Props> = ({ user, onEdit, onDelete }) => {
  return (
    <View style={[styles.card]}>
      <View style={styles.info}>
        <Text numberOfLines={1} style={styles.name}>
          {user.firstName} {user.lastName}
        </Text>
        <Text numberOfLines={1} style={styles.email}>
          {user.email}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => onEdit(user.id)}
        >
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => onDelete(user.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    flex: 1,
    paddingRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  editButton: {
    backgroundColor: '#4caf50',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  editText: {
    color: '#fff',
    fontWeight: '600',
  },
  deleteButton: {
    backgroundColor: '#f44336',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  deleteText: {
    color: '#fff',
    fontWeight: '600',
  },
});

export default UserItem;
