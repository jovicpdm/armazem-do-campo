import React, {useState} from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import SlideShow from 'react-native-image-slider-show';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import {theme} from '../global/styles/theme';
import TitleSection from '../components/TitleSection';
import GrayText from '../components/GrayText';
import TextCard from '../components/TextCard';

export default function ProductInfo() {
  const [value, setValue] = useState(0);
  const [amount, setAmount] = useState([]);

  const createAmountArray = () => {};

  const images = [
    {
      url: 'https://img.itdg.com.br/tdg/images/blog/uploads/2017/08/shutterstock_279701309-300x200.jpg',
    },
    {
      url: 'https://alavoura.com.br/wp-content/uploads/2020/08/0-shutterstock_194249981.jpg',
    },
    {
      url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrJsqh-Uxw_GU2U9jxeJOSvyXWRtJ0BMDGX7REoXSly4WzwS6WpEeGuFgnDdoA7yOuVrg&usqp=CAU',
    },
    {
      url: 'data:image/jpeg;base64,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',
    },
  ];

  return (
    <ScrollView>
      <SlideShow dataSource={images} />
      <View style={styles.whiteArea} showsVerticalScrollIndicator={true}>
        <TitleSection>Leite de vaca 100% natural</TitleSection>
        <GrayText>R$ 2,50 (litro)</GrayText>
        <View style={{marginTop: 16}} />
        <TitleSection>Descrição</TitleSection>
        <GrayText>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id tellus
          convallis, sollicitudin lorem nec, malesuada mauris. Orci varius
          natoque
        </GrayText>
        <View style={{marginTop: 16}} />
        <TitleSection>Próxima entrega</TitleSection>
        <GrayText>16 de outubro (terça-feira)</GrayText>
        <View style={{marginTop: 16}} />
        <TitleSection>Forma de entrega</TitleSection>
        <GrayText>Retirada no local</GrayText>
        <View style={{marginTop: 16}} />
        <TitleSection>Selecione a quantidade</TitleSection>
        <ScrollPicker
          dataSource={['1', '2', '3', '4', '5', '6']}
          selectedIndex={1}
          renderItem={(data, index) => {
            //
          }}
          onValueChange={(data, selectedIndex) => {
            //
          }}
          wrapperHeight={180}
          wrapperWidth={150}
          wrapperBackground="#FFFFFF"
          itemHeight={60}
          highlightColor="#d8d8d8"
          highlightBorderWidth={2}
        />
        <TextCard>{24 - value} litros disponíveis</TextCard>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  whiteArea: {
    height: '100%',
    backgroundColor: theme.pallete.white,
    padding: 8,
    alignItems: 'center',
  },
});
