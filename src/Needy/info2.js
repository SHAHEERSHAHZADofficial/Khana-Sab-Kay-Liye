import React,{useState,useEffect} from 'react'
import QRCode from 'react-native-qrcode-svg';
import { StatusBar } from 'expo-status-bar';

import {
    StyleSheet,
    View,
    TextInput,
    ScrollView,
    Text,
    TouchableOpacity,
    SafeAreaView,ToastAndroid
} from 'react-native';
import { auth,doc,db,getDoc,signOut,collection } from '../config/firebase';

 import { onSnapshot } from 'firebase/firestore';
const QRScreen = ({ navigation }) => {
    // const [Qrcode, setQrCode] = useState("null")
const [requestData, setRequestData] = useState([])

const [UserID, setUserID] = useState("null")
const [Err, setErr] = useState("")

useEffect(async () => {
  const docRef = doc(db, "UserRequest", auth.currentUser.uid);
const docSnap = await getDoc(docRef);
if (docSnap.exists()) {
  let myRequest = requestData.slice(0);
  const dataonSnapshot = onSnapshot(docRef,(doc) => {
    console.log("Current data: ", doc.data());
    myRequest.push(doc.data())
    setUserID(doc.data().User)
});
setRequestData(myRequest)
}else{
  setErr("You have not submitted your Request")
}

}, []);
     
// useEffect(async () => {
//   let RequestRef = doc(db, 'UserRequest');
//   let q = query(RequestRef, where("User", "==", auth.currentUser.uid))
//   let Request = await getDoc(q);
//   let myRequestClone = requestData.slice(0);
//   Request.forEach((doc) => {
//       console.log(doc.id, doc.data());
//       myRequestClone.push(doc.data());
//   });
//   setRequestData(myRequestClone);
// }, [])
            
  const logout=() => {
        // console.log('logout');
        signOut(auth).then(() => {
          ToastAndroid.show("Successfully SignOut", ToastAndroid.SHORT);

          navigation.replace("Authentication")
        }).catch((error) => {
          // An error happened.
        });
        }

    return (
      // <View style={{backgroundColor:"white"}}>
      <SafeAreaView style={{backgroundColor:"white"}}>
    <ScrollView style={{backgroundColor:"white"}}>
<View style={styles.containerS}>
<StatusBar style="dark"/>

{

requestData?.map(({Name,FatherName,FamilyMember,CNIC,Income,Ration,User,Status}) => (

 <>
  <View style={styles.inputS}>
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





</View>


<View style={styles.container}>

{Err?
<View style={styles.inputs}>
<Text style={{color:"red",fontSize:15}}>{Err}</Text>
</View>
:null}

<View>

        {/* <QRCode
      value={this.state.text}
    /> */}
        <QRCode
          value={UserID}
          logoSize={100}
          size={200}
          bgColor='white'
          fgColor='green'/>
      </View>
      <View style={styles.containerS}>    
      <Text style={{fontSize:20}}>Serial Number:-</Text>  
        <Text style={{ borderWidth:3,fontSize:20, borderBottomColor:"black",
        borderTopColor:"white",
        borderLeftColor:"white",
        borderRightColor:"white",}}>{UserID}</Text>
      </View>
{/* Serial Number:- */}
      </View>


      <View style={styles.containerS}>
      <TouchableOpacity
        onPress={logout}
        style={{ backgroundColor: 'green' ,height:50 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}>Sign Out</Text>
      </TouchableOpacity>
      </View>
      </ScrollView>
      </SafeAreaView>
      // </View>
    );

}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
 
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        margin: 10,
        borderRadius: 5,
        padding: 5,
    },
    inputs: {
      margin: 12,
      // padding: 10,
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
 
export default QRScreen
