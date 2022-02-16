import React, { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import ProductCardItem from '../components/ProductCardItem';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteArea from '../components/WhiteArea';

export default function EditItem({ navigation, route }) {

    const db = getDatabase();

    const [loading, setLoading] = useState(false);
    const [product, setProduct] = useState({});


    const searchProduct = async () => {
        setLoading(true);
        let data = {};
        const dbRef = ref(db, 'products/' + route.params.id);
        await new Promise(resolve => {
            onValue(dbRef, snapshot => {
                const { name, price, mainImage, description, category, formsOfSale, amount, placeOfSale } = snapshot.val();
                data = {
                    id: snapshot.key,
                    name: name,
                    price: price,
                    mainImage: mainImage,
                    description: description,
                    category: category,
                    formsOfSale: formsOfSale,
                    amount: amount,
                    placeOfSale: placeOfSale
                };
                resolve();
                setProduct(data);
            });
        });
        setLoading(false);
    };

    useEffect(() => {
        searchProduct();
    }, []);


    return (
        <>
            <TopScreen>
                <TitleScreen>Editar Produto</TitleScreen>
            </TopScreen>
            <WhiteArea>

                <>
                    <ProductCardItem
                        id={product.id}
                        name={product.name}
                        price={product.price}
                        image={product.mainImage}
                        placeOfSale={product.placeOfSale}
                        description={product.description} 
                        category={product.category}  
                        amount={product.amount}
                        mainImage={product.mainImage}
                        formsOfSale={product.formsOfSale}
                    />


                </>
            </WhiteArea>
        </>
    );
}