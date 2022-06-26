import React,{useState} from "react";
import { View,ScrollView,TextInput,StyleSheet,TouchableOpacity,Text,ToastAndroid} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {auth , signInWithEmailAndPassword,doc,db,getDoc} from "../config/firebase"
import Checkbox from 'expo-checkbox';
function Signin({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [ErrMsg, setErrMsg] = useState("")
    const [isChecked, setChecked] = useState(true);
    const [Err, setErr] = useState("")

    const Login = async()=>{
      if (email!==""&& password!==""){
        const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        const pass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,16}$/;
        if (reg.test(email) === true){
        if (pass.test(password)=== true) {
           await signInWithEmailAndPassword(auth,email, password)
          .then( async (userCredential)=>{
            let user = userCredential.user
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.data().Type === "Needy") {
              ToastAndroid.show("Successfully Logged In", ToastAndroid.SHORT);
              navigation.navigate("NeedyHome")
              // console.log("Document data:", docSnap.data());
            } else if (docSnap.data().Type === 'Manager') {
              ToastAndroid.show("Successfully Logged In", ToastAndroid.SHORT);
                navigation.navigate("Manager")
            }else{
              ToastAndroid.show("LogIn UnSuccessful", ToastAndroid.SHORT);

            }}
          ).catch( (error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            setErr(error)
           }

          )
                // console.log(signInUser, ">>signIn");



       
       }else{
          setErrMsg("Password must be between 8 to 16 characters which contain at least one lowercase letter, one uppercase letter, one numeric digit, and one special character")
         setTimeout(() => {
          setErrMsg("")
         }, 6000);
            }
  }else{
    ToastAndroid.show("Email is not correct", ToastAndroid.LONG);

  }
}else{
  ToastAndroid.show("Fill all the Field", ToastAndroid.LONG);
}



}


    return (
 <ScrollView style={{backgroundColor:"white"}}>
<View style={styles.container}>
    <StatusBar style="black"/>
{/* <View style={styles.input}>
<TextInput
        onChangeText={text => setUserName(text)}
        value={userName}
        placeholder="UserName"
        keyboardType="name-phone-pad"
placeholderTextColor={"blue"} 
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View> */}
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
<View style={styles.section2}>
{ErrMsg? <Text style={{color:"blue",fontSize:14}} >{ErrMsg}</Text>:null}
</View>
<View style={styles.section}>
        <Checkbox style={styles.checkbox} value={isChecked} onValueChange={setChecked} color={"blue"} />
        <Text style={styles.paragraph}>Hide Password</Text>
      </View>
      {Err? <Text style={{color:"blue",fontSize:14}} >{Err}</Text>:null}

<TouchableOpacity
        onPress={Login}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Login</Text>
      </TouchableOpacity>
<TouchableOpacity onPress={() =>navigation.navigate('Forget-Password')} style={{ height:50 ,backgroundColor:"white" }}><Text style={{fontSize: 20,fontWeight:"bold", color: 'green',textAlign:"center"}}>Forget Password</Text></TouchableOpacity>
</View>
{/* 
<TouchableOpacity style={styles.button} onPress={logIn}>
                <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <View ><IconsFontAwesome name="facebook" size={25} color="#0377FB" /></View>
                    <View ><Text style={styles.fbText}>Continue with facebook</Text></View>
                </View>
            </TouchableOpacity> */}
</ScrollView>
    )
}

export default Signin

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
      },
      fbText: {
        color: '#0377FB',
        fontSize: 18,
        marginStart: 10,

    },
    button: {
        marginTop: 50,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 50,
        borderColor:'#0377FB',
        borderWidth:3


    }
  });