import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, FlatList, Alert} from 'react-native';

import { getDatabase, ref, onValue, update, set, remove, push, child } from 'firebase/database';
import uuid from 'react-native-uuid';
import  BackHandler from 'react-native'
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import HighlightedText from '../components/HighlightedText';
import {theme} from '../global/styles/theme';
import TitleSection from '../components/TitleSection';
import ButtonPrimary from '../components/ButtonPrimary';
import GrayText from '../components/GrayText';
import ButtonSecondary from '../components/ButtonSecondary';
import RequestConfirmed from './RequestConfirmed';
import FormTitle from '../components/FormTitle';
import RowHorizontal from '../components/Rowhorizontal';
import { CheckBox } from 'react-native-elements';
import WhiteArea from '../components/WhiteArea';
import { useIsFocused } from '@react-navigation/core';


export default function Basket({navigation,  route}) {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [selected, setSelected] = useState(true);
  const [control,setControl] = useState(0)
  const [total, setTotal] = useState(0);
  const [phone,setPhone] = useState('');
  const [isCheckedMoney,setisCheckedMoney] = useState(false)
  const [isCheckedPix,setisCheckedPix] = useState(false)
  const [nameMethod,setNameMethod] = useState('')
  const isFocused = useIsFocused();
  let storageName = []
  const idOrder = uuid.v4();

  const db = getDatabase();
  const updateProduct = (id, amount) => { // erro 
     update(ref(db, 'products/' + id), {
      amount: amount,
    }); 
    
  };
 
  const getNumber = () => {
    const dbRef = ref(db, 'users/' + route.params.id); 
    let counts = ''
    onValue(dbRef,(snapshot)=>{
        let datasPhone = snapshot.val().phone
        counts = datasPhone        
    })
    setPhone(counts.substring(counts.length - 4))
  }

  function dateFormat  () {
    let data = new Date();
	  let dia = data.getDate();
        if (dia.toString().length == 1){
          dia = "0"+dia;
        }
	  let mes = data.getMonth()+1;
        if (mes.toString().length == 1){
          mes = "0"+mes;
        }
	  let ano = data.getFullYear();  
	
	  return dia+"/"+mes+"/"+ano;
}
  const buy =  () => {
   
    const dbRef = ref(db, 'order/' + idOrder);
      set(dbRef, {
      id: idOrder,
      date: dateFormat(),
      total: total,
      idUser: route.params.id,
      formPay: nameMethod,
      status: 'aguardando',
      codeNumber:phone,
      paymentProofUrl : ''
    }); 
    products.map(item => {
      if (item.amountBuy != 0) {  
        storageName.push(`${item.amountBuy} ${item.name}\n`)
        set(ref(db, 'order/' + idOrder  + `/requests`), {
           products:storageName.join("")
        });
        updateProduct(item.id, item.amount - item.amountBuy);
      }
    });
    remove(ref(db, 'purchase/' + route.params.id));
  };
  const listProducts = async () => {
    setRefresh(true);
    const dbRef = ref(db, 'purchase/' + route.params.id);
    const dataArray = [];
    var prices = 0;
    var amounts = 0
    await new Promise(resolve => {
      onValue(dbRef, snapshot => {
        snapshot.forEach(snap => {
          dataArray.push(snap.val());
          prices += snap.val().price;
          amounts += snap.val().amountBuy
        });
        resolve();
      });
    });
    setProducts(dataArray);
    setTotal(prices);
    setControl(amounts)
    
  };

  
  useEffect(() => {
    listProducts();
    getNumber() 
    return () => {
       setPhone([]); 
      setProducts ([]); 
    }; 
  }, [isFocused])
 
  return (
    <>

      <TopScreen>
        <TitleScreen>Cesta</TitleScreen>
      </TopScreen>
      <WhiteArea>
        <HighlightedText>Lista de itens</HighlightedText>
        {products === null ? (
          <HighlightedText>Não há itens</HighlightedText>
        ) : (
          <View>
            <FlatList
              data={products}
              extraData={products}
              keyExtractor={item=>{
                return item.id
              }}
              // onRefresh={}
              renderItem={({item}) => {
                return (
                  <View>
                    {item.price !== 0 ? (
                      <View style={styles.itemContainer}>
                        <View>
                          <Text style={styles.text}>{item.name}</Text>
                          <Text style={styles.subText}>
                            Quantidade: {item.amountBuy}
                          </Text>
                        </View>
                        <Text
                          style={[
                            styles.text,
                            {color: theme.pallete.primary004},
                          ]}>
                          R$ {item.price}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                );
              }}
            />
            <View style={styles.totalContainer}>
              <TitleSection>Total: R$ {total} </TitleSection>
            </View>
          </View>
        )}
       
        <View style={{marginTop: 45}} />    
        <ButtonPrimary
          onPress={() => {
            if(control !== 0 && isCheckedMoney === true){
              
            buy();
              navigation.navigate('RequestConfirmed',{
               id:route.params.id,
               codePhone:phone
             })
            }
            else if(control !== 0 && isCheckedPix === true){
               
               buy()
               navigation.navigate('MethodPix',{
                id:route.params.id,
                idRequest:idOrder,
                codePhone:phone,
                
              })
            }
            else if(control === 0) {
              Alert.alert('Atenção','Adicione no mínimo um produto na cesta')
              navigation.goBack()
            }
            else if(isCheckedPix === false && isCheckedMoney === false){
              Alert.alert('Atenção','Selecione um método de pagamento')
            }
            
          }}>
          CONCLUIR COMPRA
        </ButtonPrimary>
        <ButtonSecondary
          onPress={() => {
            navigation.goBack()
            remove(ref(db, 'purchase/' + route.params.id));  
          }}>
          CANCELAR COMPRA
        </ButtonSecondary>
        <RowHorizontal></RowHorizontal>
       <View style={styles.ContainerCheckbox}>
         <FormTitle>Formas de Pagamento</FormTitle>
         <View style={styles.checkBoxs}>
          
         <CheckBox
            title='Dinheiro'
            checkedIcon='check'
            uncheckedIcon='square-o'
            checkedColor='green'
            uncheckedColor='red'
            checked={isCheckedMoney}
            onPress={()=>{setisCheckedMoney(!isCheckedMoney)
              setNameMethod('Dinheiro')
              
             if(isCheckedPix === true) {
                setisCheckedPix(!isCheckedPix)
             }
            }}
         />
          <CheckBox
            title='Transferência Pix'
            checkedIcon='check'
            uncheckedIcon='square-o'
            checkedColor='green'
            uncheckedColor='red'
            checked={isCheckedPix}
            onPress={()=>{setisCheckedPix(!isCheckedPix)
              setNameMethod('Pix')
              
             if(isCheckedMoney === true){
               setisCheckedMoney(!isCheckedMoney)
             }
            }}
         />
         </View>
       </View>
      </WhiteArea>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    paddingHorizontal: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
    alignItems: 'center',
  },
  text: {
    color: theme.pallete.primary002,
    fontFamily: 'Roboto-Medium',
    fontSize: 20,
    textAlign: 'left',
  },
  subText: {
    fontSize: 15,
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 16,
    borderColor: theme.pallete.gray,
  },
  ContainerCheckbox:{
     marginTop:10
  },
  checkBoxs:{
    marginTop:10
  }
});
