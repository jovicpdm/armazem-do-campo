import {View, Text} from 'react-native';
import React, { useEffect, useState } from 'react';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import TopScreen from '../components/TopScreen';
import TitleScreen from '../components/TitleScreen';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';

export default function MethodPix({navigation,route}){
const {codePhone} = route.params
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
      </WhiteAreaWithoutScrollView>     
    </>
   )
}