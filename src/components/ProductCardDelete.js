import React from 'react';
import { StyleSheet, Image, View, TouchableOpacity, Text } from 'react-native';
import { Card, Paragraph, Title } from 'react-native-paper';
import { theme } from '../global/styles/theme';
import IconMedium from './IconMedium';


const ProductCardDelete = ({ name, price, id, image, onPress, props }) => {

    return (
        <View>
            <Card style={styles.card} elevation={1} mode="outlined">

                <View>
                    <Card.Content style={styles.container}>
                        <Image
                            style={styles.image}
                            source={{ uri: `data:image/gif;base64,${image}` }}
                        />

                        <Card.Content>
                            <Title>{name}</Title>
                            <Paragraph>R$ {price}</Paragraph>
                            <Text>{id}</Text>

                        </Card.Content>
                    </Card.Content>
                </View>

                <View style={styles.button}>
                    <TouchableOpacity
                        {...props}
                        onPress={onPress}
                    >
                        <IconMedium
                            name="delete"
                            color={theme.pallete.primary002}
                        />
                    </TouchableOpacity>
                </View>

            </Card>
        </View>
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