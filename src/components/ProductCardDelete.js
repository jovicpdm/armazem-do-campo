import React from 'react';
import { StyleSheet, Image, SafeAreaView, TouchableOpacity, Alert, } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { theme } from '../global/styles/theme';
import IconMedium from './IconMedium';
import { getDatabase, ref, remove } from 'firebase/database';


const ProductCardDelete = ({ name, price, id, image, description, props }) => {

    const deleteProd = (id) => {
        const db = getDatabase();
        remove(ref(db, 'products/' + id), {            
        })
    }


    const showConfirm = () => {
        Alert.alert(
            "Confirmação!!!",
            "Deseja realmente remover o produto?",

            [
                {
                    text: "Remover",
                    onPress: () => deleteProd(id),                    
                },
                {
                    text: "Cancelar",
                    style: "cancel"
                }
            ],
            { cancelable: true }

        )
    }

    return (
        <SafeAreaView>
            <Card style={styles.card} elevation={1} mode="outlined">

                <SafeAreaView>
                    <Card.Content style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{ uri: `data:image/gif;base64,${image}` }}
                        />

                        <Card.Content>
                            <Title>{name}</Title>
                            <Paragraph>R$ {price}</Paragraph>
                            <Paragraph>{description}</Paragraph>


                        </Card.Content>
                    </Card.Content>
                </SafeAreaView>

                <SafeAreaView style={styles.button}>
                    <TouchableOpacity
                        {...props}
                        onPress={showConfirm}
                    >
                        <IconMedium
                            name="delete"
                            color={theme.pallete.primary002}
                        />
                    </TouchableOpacity>
                </SafeAreaView>

            </Card>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    card: {
        marginTop: 8,
        backgroundColor: theme.pallete.white,
        borderRadius: 8,
        flexDirection: 'row',
    },
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        height: 80,
        width: 80,
        borderRadius: 8,
    },
    button: {
        marginLeft: 24,
    }
});

export default ProductCardDelete;