import React,{useState,useEffect} from "react";
import { View,ScrollView,SafeAreaView,TextInput,StyleSheet,TouchableOpacity,Text,ToastAndroid} from "react-native";
import { StatusBar } from 'expo-status-bar';
import {db } from "../config/firebase"
import { collection,getDocs } from "firebase/firestore";
import {query,where } from "firebase/firestore";
import { auth,signOut } from "../config/firebase";
import {  onSnapshot } from "firebase/firestore";

function SerialNumber({navigation}) {
    const [SerialNumber, setSerialNumber] = useState("");
    const [serialNumberDoc, setSerialNumberDoc] = useState([]);



const CheckIt= async ()=>{
const q = query(collection(db, "UserRequest"), where("User", "==", SerialNumber));
    let myRequest = serialNumberDoc.slice(0);
const unsubscribe = onSnapshot(q, (snapshot) => {
  snapshot.docChanges().forEach((change) => {
        console.log("Request: ", change.doc.data());
        myRequest.push(change.doc.data())
  });
  setSerialNumberDoc(myRequest)
});

}

 




const logout=() => {
  // console.log('logout');
  signOut(auth).then(() => {
    ToastAndroid.show("Successfully SignOut", ToastAndroid.SHORT);
    navigation.replace("Authentication")
  }).catch((error) => {
    ToastAndroid.show(error, ToastAndroid.LONG);

  });
  }
    return (
 <ScrollView style={{backgroundColor:"white"}}>
<View style={styles.container}>
    <StatusBar style="black"/>

<View style={styles.input}>
<TextInput
        onChangeText={text => setSerialNumber(text)}
        value={SerialNumber}
        placeholder="Enter Serial Number"
        // keyboardType="default"
placeholderTextColor={"blue"} 
style={{color:"blue",fontSize:20,fontStyle:"italic"}}
/> 
</View>
      <TouchableOpacity
        onPress={CheckIt}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
      <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Check It </Text>
      </TouchableOpacity>
      </View>
{/* <View  style={styles.inputS}> */}
{

serialNumberDoc?.map(({Name,FatherName,FamilyMember,CNIC,Income,Ration,User,Status}) => (

 <>
  <View style={styles.inputS} key={User}>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Name:-{Name}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Father Name:-{FatherName}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Income:-{Income}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Family Member:-{FamilyMember}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:17,fontStyle:"italic",fontWeight:"bold"}}>Cnic Number:-{CNIC}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Ration Type:-{Ration}</Text>
<Text style={{backgroundColor: 'green',color:"black",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}>Request Status:-{Status}</Text>

</View>

</>
        
  ))
              }
{/* </View> */}

<View style={styles.containerS}>
      <TouchableOpacity
        onPress={logout}
        style={{ backgroundColor: 'green' ,height:50 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}>Sign Out</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
    )
            
}
export default SerialNumber

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        backgroundColor: 'white',
  
      },
      containerS: {
        marginTop:20,
        backgroundColor: 'white',
        borderBottomColor:"black",
        borderTopColor:"white",
        borderLeftColor:"white",
        borderRightColor:"white"
      },
      inputS: {
        //   height: 70,
          margin: 12,
          borderWidth: 6,
        //   // padding: 10,
        //   borderRadius:60,
          padding:16,
          backgroundColor:"green"
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
        height: 70,
        margin: 12,
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