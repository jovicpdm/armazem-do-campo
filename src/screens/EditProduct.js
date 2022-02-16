/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import ProductCard from '../components/ProductCard';
import ProductCardEdit from '../components/ProductCardEdit';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import SmallButton from '../components/SmallButton';
import ButtonPrimary from '../components/ButtonPrimary';
import WhiteArea from '../components/WhiteArea';

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
                console.log('show');
            })
            .catch(e => {
                console.log(e);
            });
        setProducts(dataArray);
        setLoading(false);
    };

    useEffect(() => {
        listProducts();
    }, []);


    return (
        <>
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
                                        formsOfSale={item.formsOfSale.toLowerCase()}
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