import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  JSX,
} from 'react';
import { User } from '../types/user';
import AsyncStorage from '@react-native-async-storage/async-storage';
import uuid from 'react-native-uuid';

interface UserContextType {
  users: User[];
  addUser: (user: Omit<User, 'id'>) => void;
  editUser: (id: string, updatedUser: Omit<User, 'id'>) => void;
  deleteUser: (id: string) => void;
  isDuplicateEmail: (email: string) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  const generateTestUsers = (count: number): User[] => {
    const testUsers: User[] = [];
    for (let i = 1; i <= count; i++) {
      testUsers.push({
        id: uuid.v4().toString(),
        firstName: `First${i}`,
        lastName: `Last${i}`,
        email: `test${i}@example.com`,
      });
    }
    return testUsers;
  };

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem('@users_list');
        if (json) {
          const data = JSON.parse(json);
          if (Array.isArray(data) && data.length > 0) {
            setUsers(data);
            return;
          }
        }
        const testUsers = generateTestUsers(100);
        setUsers(testUsers);
        await AsyncStorage.setItem('@users_list', JSON.stringify(testUsers));
      } catch {
        setUsers([]);
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@users_list', JSON.stringify(users)).catch(() => {});
  }, [users]);

  const addUser = (user: Omit<User, 'id'>) => {
    if (isDuplicateEmail(user.email)) return;
    setUsers(prev => [...prev, { ...user, id: uuid.v4().toString() }]);
  };

  const editUser = (id: string, updatedUser: Omit<User, 'id'>) => {
    if (
      users.some(
        u =>
          u.email.toLowerCase() === updatedUser.email.toLowerCase() &&
          u.id !== id,
      )
    )
      return;

    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u)),
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

  const isDuplicateEmail = (email: string) =>
    users.some(u => u.email.toLowerCase() === email.toLowerCase());

  return (
    <UserContext.Provider
      value={{ users, addUser, editUser, deleteUser, isDuplicateEmail }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUsers must be used within UserProvider');
  return context;
};
