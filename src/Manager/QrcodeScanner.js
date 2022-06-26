import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet,  TouchableOpacity,ScrollView,SafeAreaView, Button,ToastAndroid } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import {  onSnapshot,query,where,collection } from "firebase/firestore";
import { db } from '../config/firebase';
import * as Clipboard from 'expo-clipboard';



export default function QrCode() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
const [Data, setData] = useState("")
const [serialNumberDoc, setSerialNumberDoc] = useState([])
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true);
   Alert.alert("Scan Alert",`Bar code with data ${data} has been scanned!`);
    setData(data)
      const q = query(collection(db, "UserRequest"), where("User", "==", data));
          let myRequest = serialNumberDoc.slice(0);
      const unsubscribe = onSnapshot(q, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
              console.log("Request: ", change.doc.data());
              myRequest.push(change.doc.data())
        });
        setSerialNumberDoc(myRequest)
      });
      
      
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  const copyToClipboard = () => {
    Clipboard.setString(Data)
      ToastAndroid.show("Text Is Copied To ClipBoard", ToastAndroid.SHORT);
  }
  return (
    <SafeAreaView>
      <ScrollView>
    <View style={styles.container}>

<BarCodeScanner onBarCodeScanned={scanned ? undefined:handleBarCodeScanned}
style={{height:600,top:-13}}>

</BarCodeScanner>

{Data?
<View>
<View style={styles.input}>
<Text style={{color:"blue",fontSize:15}}>{Data}</Text>
</View>
<Button title='Click here to copy text' color={"green"} onPress={copyToClipboard}/>
</View>:null}


        {

serialNumberDoc?.map(({Name,FatherName,FamilyMember,CNIC,Income,Ration,User,Status},index) => (

 <>
  <View style={styles.inputS} key={index}>
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
{scanned && <TouchableOpacity onPress={() => setScanned(false)} style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Tap to Scan Again</Text>
        </TouchableOpacity>}
    </View>
    </ScrollView>
    </SafeAreaView>
  );
}
const opacity = 'rgba(0, 0, 0, .6)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
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
    // height: 70,
    margin: 12,
    borderWidth: 6,
    // padding: 10,
    borderRadius:60,
    padding:16
  },
  // container: {
  //   //     flex: 1,
  //   //     flexDirection: 'column'
  //   //   },
      layerTop: {
        flex: 2,
        backgroundColor: opacity
      },
      layerCenter: {
        flex: 6,
        flexDirection: 'row'
      },
      layerLeft: {
        flex: 1,
        backgroundColor: opacity
      },
      focused: {
        flex: 10
      },
      layerRight: {
        flex: 1,
        backgroundColor: opacity
      },
      layerBottom: {
        flex: 2,
        backgroundColor: opacity
      },
});

