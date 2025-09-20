import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';
import { User } from '../types/user';
import { isValidEmail } from '../utils/validation';

interface Props {
  initialValues?: User;
  onSubmit: (user: {
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
  submitLabel: string;
  title?: string;
  onCheckDuplicate: (email: string) => boolean;
}

const UserForm: React.FC<Props> = ({
  initialValues,
  onSubmit,
  submitLabel,
  onCheckDuplicate,
  title,
}) => {
  const [firstName, setFirstName] = useState(initialValues?.firstName || '');
  const [lastName, setLastName] = useState(initialValues?.lastName || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    if (!firstName || !lastName || !email) {
      return 'Please fill all fields';
    }
    if (!isValidEmail(email)) {
      return 'Please enter a valid email address';
    }
    if (onCheckDuplicate(email)) {
      return 'User with this email already exists';
    }
    return '';
  };

  const handleSubmit = () => {
    setSubmitted(true);
    const error = validate();
    setErrorMessage(error);

    if (error) return;

    onSubmit({ firstName, lastName, email });

    setSuccessMessage(
      initialValues ? 'User updated successfully!' : 'User added successfully!',
    );
    setTimeout(() => setSuccessMessage(''), 3000);

    setFirstName('');
    setLastName('');
    setEmail('');
    setSubmitted(false);
    setErrorMessage('');
  };

  const handleChangeEmail = (text: string) => {
    setEmail(text.toLowerCase());
    if (submitted) setErrorMessage('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title || 'Enter user details'}</Text>

      <TextInput
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={handleChangeEmail}
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />

      {submitted && errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}

      {successMessage ? (
        <Text style={styles.successText}>{successMessage}</Text>
      ) : null}

      <TouchableOpacity
        style={[
          styles.button,
          submitted && errorMessage ? styles.buttonDisabled : null,
        ]}
        onPress={handleSubmit}
        disabled={submitted && !!errorMessage}
      >
        <Text style={styles.buttonText}>{submitLabel}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    marginVertical: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
    color: '#000',
  },
  errorText: {
    color: '#f44336',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  successText: {
    color: '#4caf50',
    marginBottom: 6,
    fontSize: 14,
    fontWeight: '500',
  },
  button: {
    backgroundColor: '#6200ee',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonDisabled: {
    backgroundColor: '#999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 16,
  },
});

export default UserForm;
