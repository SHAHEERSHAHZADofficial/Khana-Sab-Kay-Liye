import React,{useState ,useEffect} from "react";
import { View,ScrollView,SafeAreaView,TextInput,StyleSheet,TouchableOpacity,Text,ToastAndroid} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {auth,onAuthStateChanged, createUserWithEmailAndPassword,getDoc,setDoc,doc,db} from "../config/firebase"
import Checkbox from 'expo-checkbox';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Signin from "./Signin";
// import Home from "../Needy/Request";
import RequestSendingTab from "../Needy/RequestSendingTab";
// import InfoCard from "../Needy/InfoCard";
import QRScreen from "../Needy/info2";
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MainPage from "./Intro-page";
import QrCode from "../Manager/QrcodeScanner";
import SerialNumber from "../Manager/SerialNumberVerification";
import ForgetPasswordScreen from "./ForgetPasswordScreen";
import Maps from "../Needy/Map";
function Signup({ navigation }) {
  const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ErrMsg, setErrMsg] = useState("")
    const [isChecked, setChecked] = useState(true);
    const [Err, setErr] = useState("")


    

    const handleSignup = async()=>{
      if (email!==""&& password!==""&&userName!==""){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (reg.test(email) === true){
        if (pass.test(password)=== true) {
           await createUserWithEmailAndPassword(auth,email, password)
          .then( async function (userCredential) {
           let user=userCredential.user
          let userInfo = {
            Name:userName,
            Email:user.email,
            Uid:user.uid,
            Type:"Needy"
          }
          await setDoc(doc(db, "Users",user.uid), userInfo)
          .then(
            async()=>{
              ToastAndroid.show("Successfully Registered", ToastAndroid.SHORT);

              navigation.navigate('NeedyHome')
            }
          ).catch(
            function(error){
            setErr(error)
            }
          )

          
         
          })
          .catch(function (error) {
            ToastAndroid.show(error, ToastAndroid.LONG);
          });
        

      }else{
          setErrMsg("Password must be between 8 to 16 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
         setTimeout(() => {
          setErrMsg("")
         }, 6000);
            }
  }else{
    ToastAndroid.show("Email is not correct", ToastAndroid.SHORT);

  }
}else{
  ToastAndroid.show("Fill all the Field", ToastAndroid.SHORT);

}



}
    return (
 <ScrollView style={{backgroundColor:"white"}}>
{/* <SafeAreaView style={{backgroundColor:"black"}}> */}
<View style={styles.container}>
    <StatusBar style="dark"/>
<View style={styles.input}>
<TextInput
        onChangeText={text => setUserName(text)}
        value={userName}
        placeholder="UserName"
        keyboardType="name-phone-pad"
placeholderTextColor={"blue"} 
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View>
<View style={styles.input}>
<TextInput
        onChangeText={text => setEmail(text)}
        value={email}
        placeholder="Email"
        keyboardType="email-address"
placeholderTextColor={"blue"} 
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View>
<View style={styles.input}>
  {/* {isChecked===false?setSecurity(true):true} */}
<TextInput
        onChangeText={text => setPassword(text)}
        value={password}
        placeholder="Password"
        keyboardType="default"
        placeholderTextColor={"blue"} 
        secureTextEntry={isChecked}
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View>

{ErrMsg? <View style={styles.inputs}>
 <Text style={{color:"red",fontSize:14}}>{ErrMsg}</Text>
 </View>:null}

<View style={styles.section}>
        {/* <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={"blue"} /> */}
        <Checkbox
      status={isChecked ? 'checked' : 'unchecked'}
      onPress={() => {
        setChecked(!isChecked);
      }}
    />
        <Text style={styles.paragraph}>Hide Password</Text>
      </View>
      {Err? <View style={styles.inputs}>
 <Text style={{color:"red",fontSize:14}}>{Err}</Text>
 </View>:null}
<TouchableOpacity
        onPress={handleSignup}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Register </Text>
      </TouchableOpacity>
{/* <View style={styles.section}> */}
{/* <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130 }}><Text style={{fontSize: 20, color: '#fff',textAlign:"center",marginTop:12}}>Already Register Click Here!</Text></TouchableOpacity> */}
{/* </View> */}
</View>
</ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        backgroundColor: 'white',
  
      },
    input: {
      height: 70,
      margin: 12,
      borderWidth: 6,
      // padding: 10,
      borderRadius:60,
      padding:16
    },
    inputs: {
      // height: 70,
      // margin: 12,
      // borderWidth: 6,
      // // padding: 10,
      // borderRadius:60,
      padding:16
    },
    checkbox: {
      margin: 8,
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:14

    },
    section2: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:"space-evenly",
      marginLeft:70,
      marginRight:20
    }
  });
 

  
  function Authentication() {
    const Tab = createMaterialTopTabNavigator()
    return (
  // <NavigationContainer>
  <Tab.Navigator>
  <Tab.Screen name="Signup" component={Signup} />
  <Tab.Screen
    name="Login"
    component={Signin} color={"blue"}/>
</Tab.Navigator>
// {/* </NavigationContainer> */}
    );
  }

function Needy(){
      const Tab = createMaterialTopTabNavigator()
      return(
      <Tab.Navigator>
<Tab.Screen name="Send Request" component={RequestSendingTab}/>
{/* <Tab.Screen name="Info Card" component={InfoCard}/> */}
<Tab.Screen name="Info Card" component={QRScreen}/>
<Tab.Screen name="Map" component={Maps}/>


      </Tab.Navigator>
      )
}

  function Manager(){
    const Tab = createMaterialTopTabNavigator()
    return (
      <Tab.Navigator>
        <Tab.Screen name="Qr Code Scanner" component={QrCode}
        style={{  activeTintColor: "blue", 
        inactiveTintColor: "green"}} />
        <Tab.Screen name="Serial Number Scanner" component={SerialNumber} />
      </Tab.Navigator>
    );
  }

  function ForgetPasswordScreens(){
    const Stack = createNativeStackNavigator()
    return (
      <Stack.Navigator>
        <Stack.Screen name="Forget Password" component={ForgetPasswordScreen} />
        <Stack.Screen name="SignUp/SignIn" component={Authentication}/>
      </Stack.Navigator>
    );
  }

  export default function Routes() {
    const Stack = createNativeStackNavigator()
    return (
      <NavigationContainer>
      {/* {USER_REGISTERED? setInitialRoute("Home"):null} */}
      
        <View style={{flex:3,marginTop:30}}>
      <Stack.Navigator
       screenOptions={() => ({
        headerShown: false,
      })}>


         <Stack.Screen name="Home" component={MainPage}/>
        <Stack.Screen name="Authentication" component={Authentication}/>
        <Stack.Screen name="NeedyHome" component={Needy}/>
        <Stack.Screen name="Manager" component={Manager}/>
         <Stack.Screen name="Forget-Password" component={ForgetPasswordScreens} />
    </Stack.Navigator>
    </View>
    

    </NavigationContainer>
    );
  }
  
  