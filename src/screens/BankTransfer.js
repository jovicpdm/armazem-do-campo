import {View, Text, Platform, Alert} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import TopScreen from '../components/TopScreen';
import TitleScreen from '../components/TitleScreen';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
import DocumentPicker from 'react-native-document-picker'
import RNFetchBlob from 'rn-fetch-blob'
import storage from '@react-native-firebase/storage'

import { getDatabase ,update,ref} from 'firebase/database';

export default function MethodPix({navigation,route}){
const db =  getDatabase()
const {codePhone,id,idRequest} = route.params
const sendPaymentProf = async (id, urlDowload) => {
  await update(ref(db, 'order/' + id), {
    paymentProofUrl: urlDowload,
 }); 
 
};
  const chooseFile = async () => { 
       try{
          const file = await DocumentPicker.pick({
             type : [DocumentPicker.types.pdf,DocumentPicker.types.images]
          })
          file.forEach(async (item) => {
              const path = await normalizePath(item.uri)
              const result = await RNFetchBlob.fs.readFile(path,'base64')
              uploadFileToFirebaseStorage(result,file)
          })
       }
       catch(e){
          if(DocumentPicker.isCancel(e)){
            Alert.alert('Upload','Adicione o comprovante de pagamento');
          }
          else{
            throw e
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
            const uploadTask = storage().ref(`paymentProof/${item.name}`).
            putString(result,'base64',{contentType:item.type})

            uploadTask.on('state_changed', 
            (snapshot) => {
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
              console.log(error)
            }, 
            () => {
              uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL)  {
                console.log('File available at', downloadURL);
               
                Alert.alert('Envio','Comprovante enviado com sucesso');
                navigation.navigate('RequestConfirmed',  {id:route.params.id,codePhone})
                sendPaymentProf(idRequest,downloadURL)
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
             <TitleScreen textAlign="center">Transferência Bancaria</TitleScreen>
           </View>
         </View>
       </TopScreen>
       <WhiteAreaWithoutScrollView> 
       <TitleSection>Utilize os dados para efetuar transferência bancaria </TitleSection>
            <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
                  <Text style={{fontSize:20,textAlign:'center'}}>Centro de Formação Produção e Artes da Amazônia</Text>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>CNPJ: 25.464.886/0001-55</Text>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Banco: 350 - Crehnor Laranjeiras</Text>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Agência:3001</Text>
                  <Text style={{fontSize:20,textAlign:'center',marginTop:10}}>Conta Corrente: 30926-5</Text>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
               <ButtonPrimary style={{marginTop:5}} onPress={chooseFile}>ENVIAR COMPROVANTE</ButtonPrimary>
            </View>
      </WhiteAreaWithoutScrollView>    

         
    </>
   )
}
