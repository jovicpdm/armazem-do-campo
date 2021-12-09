import React, { useState, useEffect } from 'react';
import {
    View,
    Alert,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { getDatabase, ref, onValue, remove } from 'firebase/database';
import ProductCardDelete from '../components/ProductCardDelete';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';
import WhiteArea from '../components/WhiteArea';

export default function ProductList({ navigation: { navigate } }) {

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
                <TitleScreen> Remover Produtos</TitleScreen>
            </TopScreen>
            <WhiteAreaWithoutScrollView>

                {!loading ? (
                    <FlatList
                        data={products}
                        key={item => item.id}
                        renderItem={({ item }) => {
                            return (
                                <ProductCardDelete
                                    name={item.name}
                                    price={item.price}
                                    id={item.id}
                                    image={item.mainImage}
                                    

                                />
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