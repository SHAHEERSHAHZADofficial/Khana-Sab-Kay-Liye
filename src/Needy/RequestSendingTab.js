import React,{useState} from 'react'
import { View,TextInput,StyleSheet,ScrollView,Image,TouchableOpacity,Text ,Picker,SafeAreaView,ToastAndroid} from 'react-native'
import { StatusBar } from 'expo-status-bar'
import * as ImagePicker from 'expo-image-picker';
import { db,setDoc,doc ,storage,ref,getDownloadURL,uploadBytes, auth} from '../config/firebase';
// import ModalDropdown from 'react-native-modal-dropdown';
import {
    Dropdown
  } from 'sharingan-rn-modal-dropdown';
const RequestSendingTab = () => {
    const [name, setName] = useState("")
    const [fatherName, setFatherName] = useState("")
    const [familyMember, setFamilyMember] = useState("")
    const [cnic, setCNIC] = useState()
    const [income, setIncome] = useState("")
    const [image, setImage] = useState(null);
    const [secondImage, setSecondImage] = useState(null);
    const [ration, setRation] = useState("")
    const [Err, setErr] = useState("")

    const sendRequest = async () => {
        if(name!==""&&fatherName!==""&&familyMember!==""&&cnic!==""&&income!==""&&ration!==""&&image!==null&&secondImage!==null){
          ToastAndroid.show("Please wait Your Request is processing", ToastAndroid.LONG);

          let storageRef = ref(storage,`${"CNIC"}/${cnic*2}`)
          const img = await fetch(image);
          const byte = await img.blob();
          await uploadBytes(storageRef, byte); //upload images
          let FrontPicOfCnic =  await getDownloadURL(ref(storage, storageRef))
        
          let Ref = ref(storage,`${"CNIC"}/${cnic*3}`)
          const images = await fetch(secondImage);
          const bytes = await images.blob();
          await uploadBytes(Ref, bytes); //upload images
          let BackPicOfCnic =  await getDownloadURL(ref(storage, Ref))
        
        
        
          let Requestobj = {
            Name:name,
            FatherName:fatherName,
            CNIC:cnic,
            FamilyMember:familyMember,
            Income:income,
            Ration:ration,
            FrontPicOfCnic:FrontPicOfCnic,
            BackPicOfCnic:BackPicOfCnic,
            User:auth.currentUser?.uid,
            Status:"Pending"
            
        };
            const RequestRef = doc(db,'UserRequest',auth.currentUser?.uid);
            await setDoc(RequestRef,Requestobj).then(
              ToastAndroid.show("Request Sended", ToastAndroid.LONG)
            ).catch((error)=>{
              setErr(error)
            })    

        }else{
          ToastAndroid.show("Info Error","Fill All The Field To Continue", ToastAndroid.LONG);
        }
        }

        const pickImage = async () => {
            // No permissions request is necessary for launching the image library
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [5,4],
              quality: 1,
            });
        
            // setresults(result)
            if (!result.cancelled) {
              setImage(result.uri)
            }
          };
          const pickSecondImage = async () => {
            // No permissions request is necessary for launching the image library
            let results1 = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [5,4],
              quality: 1,
            });
        
            // console.log(results1);
            // setresults2(results1)
            if (!results1.cancelled) {
                setSecondImage(results1.uri);
            }
          };
        //   let data = [{
        //     value: 'Monthly',
        //   }, {
        //     value: 'Daily 1 time',
        //   }, {
        //     value: 'Daily 2 time',
        //   }, 
        //   {
        //     value: 'Daily 3 time',
        //   }];
          const data = [
            {
              value: 'Monthly',
              label: 'Monthly',
          
            },
            {
              value: 'Daily 1 time',
              label: 'Daily 1 time',
            
            },
            {
              value: 'Daily 2 time',
              label: 'Daily 2 time',
             
            },
            {
              value: 'Daily 3 time',
              label: 'Daily 3 time',
            
            },
          ];
          
  return (
    <SafeAreaView style={{flex:3}}>
    <ScrollView style={{backgroundColor:"white"}}>
    <View style={styles.container}>
    <StatusBar style="dark"/>
    <View style={styles.input}>
    <TextInput
            onChangeText={text => setName(text)}
            value={name}
            placeholder="Name"
            keyboardType="name-phone-pad"
    placeholderTextColor={"blue"} 
    style={{color:"blue",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
    /> 
    </View>
    <View style={styles.input}>
    <TextInput
            onChangeText={text => setFatherName(text)}
            value={fatherName}
            placeholder="Father Name"
            keyboardType="name-phone-pad"
    placeholderTextColor={"blue"} 
    style={{color:"blue",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
    /> 
    </View>
    <View style={styles.input}>
    <TextInput
            onChangeText={text => setFamilyMember(text)}
            value={familyMember}
            placeholder="Enter The Number of Family Member"
            keyboardType="name-phone-pad"
    placeholderTextColor={"blue"} 
    style={{color:"blue",fontSize:15,fontStyle:"italic",fontWeight:"bold"}}
    /> 
    </View>
    <View style={styles.input}>
    <TextInput
            onChangeText={text => setIncome(text)}
            value={income}
            placeholder="Enter Your Income"
            keyboardType="name-phone-pad"
    placeholderTextColor={"blue"} 
    style={{color:"blue",fontSize:20,fontStyle:"italic",fontWeight:"bold"}}
    /> 
    </View>
    <View style={styles.input}>
    <TextInput
            onChangeText={text => setCNIC(text)}
            value={cnic}
            placeholder="Enter CNIC Number with out space"
            keyboardType="name-phone-pad"
    placeholderTextColor={"blue"} 
    style={{color:"blue",fontSize:15.5,fontStyle:"italic",fontWeight:"bold"}}
    /> 
    </View>
    <View>
    {/* <ModalDropdown style={styles.Dropdown} dropdownStyle="" options={['Monthly Ration', 'Daily 1 time',"Daily 2 time","Daily 3 time"]} defaultValue="Select Ration Type" 	/> */}
    <Dropdown
            label="Ration Type"
            data={data}
            // enableSearch
            value={ration}
            onChange={text=>setRation(text)}
         textInputStyle={{backgroundColor:"white"}}
          />
          
    </View>
         <TouchableOpacity onPress={pickImage}         
          style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
          <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Front cnic photo</Text>
          </TouchableOpacity>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 ,marginLeft:60}} />}
    
          {/* {results? <Text style={{color:"red",fontSize:14}} >{results}</Text>:null} */}
    
          <TouchableOpacity onPress={pickSecondImage}         
        style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130  }}>
            <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12  }}>Back cnic photo</Text>
          </TouchableOpacity>
          {secondImage && <Image source={{ uri: secondImage }} style={{ width: 200, height: 200,marginLeft:60 }} />}
          <TouchableOpacity
            onPress={sendRequest}
            style={{ backgroundColor: 'blue' ,height:50 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
            <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}>Send Request</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            onPress={()=>{navigation.navigate("Card")}}
            style={{ backgroundColor: 'blue' ,height:70 ,margin:20, borderRadius:130 ,fontWeight:"bold" }}>
            <Text style={{ fontSize: 20, color: '#fff',textAlign:"center",marginTop:12 ,fontWeight:"bold" }}> Request AlReady Submitted  Click Here !</Text>
          </TouchableOpacity> */}
    </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default RequestSendingTab

const styles = StyleSheet.create({
container: {
    marginTop:20,
    backgroundColor: 'white',

  },
  Dropdown: {
    flex: 1,
    // backgroundColor: "red",
    alignItems: 'center',
    justifyContent: 'center',
     
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
}})