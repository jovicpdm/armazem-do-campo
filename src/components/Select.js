import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import {theme} from '../global/styles/theme';

const Select = ({options, onChangeSelect, text}) => {
  const [txt, setTxt] = useState(text);
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setModalVisible(true)}>
        <Text style={{color: theme.pallete.primary}} numberOfLines={1}>
          {' '}
          {txt}{' '}
        </Text>
        <Icon name={'chevron-down'} size={20} color={theme.pallete.primary} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View>
          <TouchableOpacity onPress={() => setModalVisible(false)}>
            <Icon
              name={'chevron-left'}
              size={20}
              color={theme.pallete.primary}
            />
          </TouchableOpacity>
        </View>
        <FlatList data={['leite', 'castanha', 'queijo', 'frango']} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: theme.pallete.primary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
    height: 30,
    width: 292,
    paddingHorizontal: 12,
  },
});

export default Select;
