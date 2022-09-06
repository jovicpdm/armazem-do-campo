import {View, Text} from 'react-native';
import React from 'react';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import TopScreen from '../components/TopScreen';
import TitleScreen from '../components/TitleScreen';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
export default function RequestConfirmed({navigation,route}){
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
            <TitleSection>Informe o codigo abaixo para retirada do produto na loja.</TitleSection>
            <View style={{flex:1,justifyContent:'flex-end'}}>
               <ButtonPrimary>HISTORICO PEDIDOS</ButtonPrimary>
               <ButtonPrimary style={{marginTop:5}} onPress={()=>{navigation.navigate('Purchase',{
                 id:route.params.id
               })}}>PRODUTOS</ButtonPrimary>
            </View>
      </WhiteAreaWithoutScrollView>     
    </>
   )
}