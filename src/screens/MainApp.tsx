import React, { useCallback, useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  Alert,
} from 'react-native';
import { useUsers } from '../context/UserContext';
import Header from '../components/Header';
import UserList from '../components/UserList';
import UserForm from '../components/UserForm';
import uuid from 'react-native-uuid';

const MainApp: React.FC = () => {
  const { users, addUser, editUser, deleteUser } = useUsers();
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [searchText, setSearchText] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);

  const filteredUsers = users.filter(user =>
    `${user.firstName} ${user.lastName}`
      .toLowerCase()
      .includes(searchText.toLowerCase()),
  );
  const visibleUsers = filteredUsers.slice(0, visibleCount);

  const handleAdd = useCallback(() => {
    setEditingId(null);
    setModalVisible(true);
  }, []);

  const handleEdit = useCallback((id: string) => {
    setEditingId(id);
    setModalVisible(true);
  }, []);

  const handleDelete = useCallback(
    (id: string) => {
      Alert.alert(
        'Confirm Delete',
        'Are you sure you want to delete this user?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () => deleteUser(id),
          },
        ],
      );
    },
    [deleteUser],
  );

  const handleSubmit = useCallback(
    (user: { firstName: string; lastName: string; email: string }) => {
      if (editingId) editUser(editingId, user);
      else addUser(user);
      setModalVisible(false);
    },
    [editingId, addUser, editUser],
  );

  const initialValues = editingId
    ? users.find(u => u.id === editingId)
    : undefined;

  const addRandomUsers = () => {
    const newUsers = [];
    for (let i = 1; i <= 100; i++) {
      let email = `random${Math.floor(Math.random() * 100000)}@example.com`;
      while (users.some(u => u.email === email)) {
        email = `random${Math.floor(Math.random() * 100000)}@example.com`;
      }
      newUsers.push({
        id: uuid.v4().toString(),
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email,
      });
    }
    newUsers.forEach(u =>
      addUser({ firstName: u.firstName, lastName: u.lastName, email: u.email }),
    );
  };

  const handleDeleteAll = useCallback(() => {
    Alert.alert(
      'Confirm Delete All',
      'Are you sure you want to delete all users?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete All',
          style: 'destructive',
          onPress: () => {
            users.forEach(u => deleteUser(u.id));
          },
        },
      ],
    );
  }, [deleteUser, users]);

  return (
    <View style={styles.container}>
      <Header title="Dot Code User Manager" />
      <TextInput
        placeholder="Search by name..."
        value={searchText}
        onChangeText={setSearchText}
        style={styles.searchInput}
        placeholderTextColor="#999"
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
          <Text style={styles.addButtonText}>+ Add User</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.addButton} onPress={addRandomUsers}>
          <Text style={styles.addButtonText}>+ Add 100 Random</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAll}>
          <Text style={styles.addButtonText}>Delete All Users</Text>
        </TouchableOpacity>
      </View>

      <UserList
        users={visibleUsers}
        editingId={editingId ?? undefined}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onEndReached={() => setVisibleCount(prev => prev + 10)}
      />

      <Modal visible={modalVisible} transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <UserForm
              title={editingId ? 'Edit User' : 'Add New User'}
              initialValues={initialValues}
              onCheckDuplicate={email =>
                users.some(u => u.email.toLowerCase() === email.toLowerCase())
              }
              onSubmit={handleSubmit}
              submitLabel={editingId ? 'Save' : 'Add User'}
            />
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f2f2f2', paddingBottom: 32 },
  searchInput: {
    marginHorizontal: 16,
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderRadius: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  addButton: {
    flex: 1,
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: '#f44336',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  addButtonText: {
    color: '#fff',
    paddingHorizontal: 8,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    padding: 16,
  },
  modalContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  cancelButton: {
    marginTop: 12,
    marginHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#f44336',
    alignItems: 'center',
  },
  cancelButtonText: { color: '#fff', fontWeight: '600' },
});

export default MainApp;
