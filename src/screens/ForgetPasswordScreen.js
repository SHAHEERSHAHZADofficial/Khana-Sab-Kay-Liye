import { useState } from 'react'
import { StyleSheet, Text, View, TextInput,TouchableOpacity,SafeAreaView,ScrollView,ToastAndroid } from 'react-native' 
import React from 'react'
import { db,sendPasswordResetEmail,auth } from '../config/firebase'
import { onSnapshot,query,where,collection } from 'firebase/firestore'
const ForgetPasswordScreen = () => {
    const [PasswordResetEmail, setPasswordResetEmail] = useState("")
    const [Err, setErr] = useState("")
    const [Errors, setErrors] = useState("")

    const PasswordReset= async ()=>{
        const q = query(collection(db, "Users"), where("Email", "==", PasswordResetEmail));
        const unsubscribe = onSnapshot(q, (snapshot) => {
          snapshot.docChanges().forEach((change) => {
                console.log("User: ", change.doc.data());
                if (change.doc.data().Type === "Manager"){
                 setErr("You Are A  Manager, You Can't Reset Your PassWord Ask Admin To Reset Password")
                }else{
                    sendPasswordResetEmail(auth, PasswordResetEmail)
                     .then(() => {
                        ToastAndroid.show("Password Reset Email Has Been Sented", ToastAndroid.LONG);
                     })
                     .catch((error) => {
                      const errorCode = error.code;
                      const errorMessage = error.message;
                      setErrors(error)
                     });
                }
          });
        });
        
        }
  return (
    <ScrollView style={{backgroundColor:"white"}}>
<SafeAreaView style={{flex:2,}}>
    <View style={styles.container}>
      <View style={styles.input}>
<TextInput
        onChangeText={text => setPasswordResetEmail(text)}
        value={PasswordResetEmail}
        placeholder="Enter Your Email"
        // keyboardType="default"
placeholderTextColor={"blue"} 
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View>
{Err?
<View style={styles.inputs}>
<Text style={{color:"red",fontSize:15}}>{Err}</Text>
</View>
:null}
{Errors?
<View style={styles.inputs}>
<Text style={{color:"red",fontSize:15}}>{Errors}</Text>
</View>
:null}
<TouchableOpacity
        onPress={PasswordReset}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
      <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Reset Your Password </Text>
      </TouchableOpacity>
      </View>
      </SafeAreaView>
    </ScrollView>
  )
}

export default ForgetPasswordScreen

const styles = StyleSheet.create({
    input: {
        height: 70,
        margin: 12,
        borderWidth: 6,
        // padding: 10,
        borderRadius:60,
        padding:16
      },
      inputs: {
        margin: 12,
        // padding: 10,
      },
      container: {
        marginTop:40,
        backgroundColor: 'white',
  
      },
})