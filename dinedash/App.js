// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/LoginSignUpScreen/LoginScreen';
import SignUpScreen from './src/LoginSignUpScreen/SignUpScreen';
import SignUpNextScreen from './src/LoginSignUpScreen/SignUpNextScreen';
import AppNav from './src/Navigation/AppNav';
import { AuthProvider } from './src/Context/AuthContext';

export default function App() {
  return (
    <View style={styles.container}>
      <AuthProvider>
        <AppNav/>
      </AuthProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
