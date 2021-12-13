import {StyleSheet, Text, View} from 'react-native';

const BasketCard = () => {
  return (
    <View style={styles.itemContainer}>
      <View>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.subText}>Quantidade: {item.amountBuy}</Text>
      </View>
      <Text style={[styles.text, {color: theme.pallete.primary004}]}>
        R$ {item.price}
      </Text>
    </View>
  );
};

export default BasketCard;

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
    fontSize: 16,
    textAlign: 'left',
  },
  subText: {
    fontSize: 10,
    color: theme.pallete.gray001,
    fontFamily: 'Roboto-Regular',
  },
  totalContainer: {
    borderTopWidth: 1,
    marginTop: 16,
    borderColor: theme.pallete.gray,
  },
});
