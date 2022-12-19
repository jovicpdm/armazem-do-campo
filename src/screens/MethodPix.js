import {View, Text, StyleSheet, Platform} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import TopScreen from '../components/TopScreen';
import TitleScreen from '../components/TitleScreen';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
import DocumentPicker from 'react-native-document-picker'
import { async } from '@firebase/util';
import { Button } from 'react-native-elements';
import FormTitle from '../components/FormTitle';
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage'

import { getDatabase } from 'firebase/database';
import ButtonRequests from '../components/ButtonRequests';
export default function MethodPix({navigation,route}){
const {codePhone,id} = route.params
const [uri,setUri] = useState('')
  const chooseFile = async () => { 
       try{
          const file = await DocumentPicker.pick({
             type : [DocumentPicker.types.pdf]
          })
          file.forEach(async (item) => {
              const path = await normalizePath(item.uri)
              const result = await RNFetchBlob.fs.readFile(path,'base64')
              uploadFileToFirebaseStorage(result,file)
          })
       }
       catch(e){
          if(DocumentPicker.isCancel(e)){
             //caso o usuario cancele a seleção
          }
          else{
            throw e
            //caso ocorra um erro
          }
       }
  }
const normalizePath = async (path) => {
    if(Platform.OS === 'ios' || Platform.OS === 'android'){
       const prefix = 'file://'
       if(path.startsWith(prefix)){
         path = path.substring(prefix.length)
         try {
           path = decodeURI(path)
         }
         catch(e) {}
       }
    }
    return path
}
const uploadFileToFirebaseStorage = async (result,file) => {
          file.forEach(item => {
            const uploadTask = storage().ref(`paymentProof/${item.name}`).putString(result,'base64',{contentType:item.type})

            uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
              console.log(error)
            }, 
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL)  {
                console.log('File available at', downloadURL);
              });
            }
          );
        })
      
     
}
   return (
    <> 
       <TopScreen>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <View>
             <TitleScreen textAlign="center">Método Pix</TitleScreen>
           </View>
         </View>
       </TopScreen>
       <WhiteAreaWithoutScrollView> 
       <FormTitle>PIX:992443989</FormTitle>
        <Text></Text>
        <View style={styles.boxSubmit}>
          <View style={styles.buttonChoose}>
         
          <Button title='ENVIAR COMPROVANTE' onPress={chooseFile}></Button>
          </View>
        </View>
      </WhiteAreaWithoutScrollView>     
    </>
   )
}

const styles = StyleSheet.create({
   boxSubmit:{
    flex: 1,
    justifyContent: "center", // ignore this - we'll come back to it
    flexDirection: "column"
   },
   buttonChoose:{
     marginBottom:7,
   }
})