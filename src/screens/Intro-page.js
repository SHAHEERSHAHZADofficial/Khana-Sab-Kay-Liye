import React,{useEffect} from 'react'
import { ScrollView,View,Text,SafeAreaView,StyleSheet,ActivityIndicator,Image} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { auth,onAuthStateChanged,doc,db,getDoc } from '../config/firebase'
import Logo from "../images/logo.png"
 function MainPage({navigation}) {
  useEffect(async() => {
    const unsubscribe= onAuthStateChanged(auth,async(user) => {
        if (user) {
          const ref = doc(db, "Users",user.uid )
          const docSnap = await getDoc(ref);
          if (docSnap.exists()) {
            if(docSnap.data().Type === "Needy"){
                 navigation.replace("NeedyHome")
            }else{
              navigation.replace("Manager")
            }
          } else {
           navigation.replace("Authentication")     
          }
        } else {
          navigation.replace("Authentication")        }
    });
    return unsubscribe
    }, [])
 return (
      
<ScrollView style={{backgroundColor:"white"}}>
     <StatusBar style="black"/>
 
     {/* <View style={styles.input}><Text style={{color:"blue",fontSize:30,fontStyle:"italic",fontWeight:"bold" }}>Choose Your Role </Text></View> */}

{/* <View> */}
<Image source={Logo} style={{height:300,width:"100%",top:40}}/>
<ActivityIndicator size="large" color="blue" />

{/* </View> */}
     {/* <TouchableOpacity
        onPress={()=>{navigation.navigate("Manager Authentification")}}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}>MANAGER</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={()=>{navigation.navigate("Authentication")}}
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
        <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}>NEEDY</Text>
      </TouchableOpacity> */}
</ScrollView>
      
    )
}

export default MainPage

const styles = StyleSheet.create({
    container: {
        marginTop:20,
        backgroundColor: 'white',
  
      },
      // image: {
      //   flex: 1,
      //   justifyContent: "center"
      // },
    input: {
    //   height: 70,
      margin: 12,
    //   borderWidth: 6,
    //   // padding: 10,
    //   borderRadius:60,
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