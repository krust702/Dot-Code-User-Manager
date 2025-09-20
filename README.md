# Dot Code User Manager (React Native)

## Overview

## **Dot Code User Manager** is a simple **React Native** mobile application that allows you to manage a list of users: add, edit, delete, and view user information. Data is stored locally using **AsyncStorage** to persist between app launches.

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/<your-username>/dot-code-user-manager.git
cd dot-code-user-manager
```

2.

## Install dependencies:

```bash
npm install
# or
yarn install
```

# Run Metro

```bash
npm start
# OR using Yarn
yarn start
```

#Run App on IOS or Android

```bash
#Android
npm run android
yarn android
#or IOS
npm run ios
yarn ios
```

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

---

## Project Structure

/src
/components

- Header.tsx
- UserForm.tsx
- UserItem.tsx
- UserList.tsx
  /context
- UserContext.tsx
  /types
- user.ts
  /utils
- validation.ts
  /screens
- MainApp.tsx
  App.tsx

---

## Features

- **Add User** with field validation:
  - First Name
  - Last Name
  - Email (checks format and uniqueness)
- **Edit User** with highlight and duplicate check.
- **Delete User** with confirmation.
- **Add 100 Random Users** in one click.
- **Delete All Users** at once.
- **Search Users** by name.
- **Lazy loading / Pagination**: loads users 10 at a time.
- **UX/UI improvements**:
  - User cards with shadows and row separation.
  - Highlighting the user being edited.
  - Dynamic error messages and creation confirmation.

---

## Technologies

- **React Native** – main framework
- **TypeScript** – for type safety
- **AsyncStorage** – local data persistence
- **React Context API** – user state management
- **react-native-uuid** – unique ID generation for users

---

## Author

Pavlo Kliazmin
Front-End / React Native Developer
