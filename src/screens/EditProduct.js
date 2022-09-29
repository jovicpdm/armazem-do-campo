import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue} from 'firebase/database';
import ProductCardEdit from '../components/ProductCardEdit';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import Logo from '../components/Logo';

export default function EditProduct({ navigation }) {

    const db = getDatabase();

    const [products, setProducts] = useState();
    const [loading, setLoading] = useState(false);

    const listProducts = async () => {
        setLoading(true);
        const dbRef = ref(db, 'products');
        const dataArray = [];
        await new Promise(resolve => {
            onValue(dbRef, snapshot => {
                snapshot.forEach(snap => {
                    dataArray.push(snap.val());
                });
                resolve();
            });
        })
            .then(() => {
                
            })
            .catch(e => {
                console.log(e);
            });
        setProducts(dataArray);
        setLoading(false);
    };

    useEffect(() => {
        listProducts();
        return () => {
            setProducts({}); 
            setLoading(false);
          };
    }, []);


    return (
        <>
        <Logo/>
            <TopScreen>
                <TitleScreen>Atualizar Itens</TitleScreen>
            </TopScreen>
            <WhiteAreaWithoutScrollView>

                {!loading ? (
                    <FlatList
                        data={products}
                        key={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <>
                                    <ProductCardEdit
                                        id={item.id}
                                        name={item.name}
                                        price={item.price}
                                        image={item.mainImage}
                                        placeOfSale={item.placeOfSale}
                                        description={item.description}
                                        formsOfSale={item.formsOfSale}
                                        amount={item.amount}
                                        props={() => {
                                            navigation.navigate('EditItem', {
                                                id: item.id
                                            });  
                                        }}
                                    />
                                </>
                            );
                        }}
                    />
                ) : (
                    <ActivityIndicator size={48} />
                )}

            </WhiteAreaWithoutScrollView>
        </>
    );
}

const styles = StyleSheet.create({});