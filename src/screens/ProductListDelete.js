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

    const deleteProd = async () => {
        remove(ref(db, 'products/' + id), {
            
        })
    }

    

    useEffect(() => {
        listProducts();
    }, []);

    const showConfirm = () => {
        Alert.alert(
            "Confirmação!!!",
            "Deseja realmente remover o produto?",

            [
                {
                    text: "Remover",
                    onPress: () => deleteProd()
                    
                },
                {
                    text: "Cancelar",
                }
            ],
            { cancelable: true }

        )
    }


    return (
        <View>
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
                                    onPress={showConfirm}

                                />
                            );
                        }}
                    />
                ) : (
                    <ActivityIndicator size={48} />
                )}


            </WhiteAreaWithoutScrollView>
        </View>
    );
}

const styles = StyleSheet.create({});