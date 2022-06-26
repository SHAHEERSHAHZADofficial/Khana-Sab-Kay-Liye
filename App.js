import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Routes from './src/screens/Signup';
  // import ForgetPasswordScreen from './src/screens/ForgetPasswordScreen';
    export default function App() {

      return (
        <Routes/>
      )
    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
