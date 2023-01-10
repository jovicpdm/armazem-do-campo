import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import TopScreen from '../components/TopScreen';
import TitleScreen from '../components/TitleScreen';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
import { getDatabase, onValue, ref } from 'firebase/database';
export default function RequestConfirmed({navigation,route}){
const [count,setCount] = useState(0)
useEffect(()=>{
   
},[count])
const {codePhone} = route.params
   return (
    <> 
       <TopScreen>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <View>
             <TitleScreen textAlign="center">Pedido realizado com sucesso</TitleScreen>
           </View>
         </View>
       </TopScreen>
       <WhiteAreaWithoutScrollView> 
       <TitleSection>Informe o código abaixo para retirada do produto na loja.</TitleSection>
            <View style={{flex:1,justifyContent:'center',alignContent:'center'}}>
               <TitleSection><Text style={{fontSize:40}}>{codePhone}</Text></TitleSection>
            </View>
            <View style={{flex:1,justifyContent:'flex-end'}}>
               <ButtonPrimary style={{marginTop:5}} onPress={()=>{navigation.navigate('Purchase',{
                 id:route.params.id
               })}}>PRODUTOS</ButtonPrimary>
            </View>
      </WhiteAreaWithoutScrollView>     
    </>
   )
}