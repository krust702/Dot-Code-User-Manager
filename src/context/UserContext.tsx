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
  isDuplicateEmail: (email: string, excludeId?: string) => boolean;
}

const UserContext = createContext<UserContextType | null>(null);

export const UserProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const json = await AsyncStorage.getItem('@users_list');
        if (json) {
          const data = JSON.parse(json);
          if (Array.isArray(data)) {
            setUsers(data);
            return;
          }
        }
        setUsers([]);
      } catch {
        setUsers([]);
      }
    };
    load();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('@users_list', JSON.stringify(users)).catch(() => {});
  }, [users]);

  const isDuplicateEmail = (email: string, excludeId?: string) =>
    users.some(
      u => u.email.toLowerCase() === email.toLowerCase() && u.id !== excludeId,
    );

  const addUser = (user: Omit<User, 'id'>) => {
    if (isDuplicateEmail(user.email)) return;
    setUsers(prev => [...prev, { ...user, id: uuid.v4().toString() }]);
  };

  const editUser = (id: string, updatedUser: Omit<User, 'id'>) => {
    if (isDuplicateEmail(updatedUser.email, id)) return;
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, ...updatedUser } : u)),
    );
  };

  const deleteUser = (id: string) => {
    setUsers(prev => prev.filter(u => u.id !== id));
  };

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
