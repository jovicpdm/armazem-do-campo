import { StyleSheet, View } from 'react-native';
import React from 'react';
import {theme} from '../global/styles/theme'
const RowHorizontal = () => {
    return (
      <View style={styles.row}></View>
    )
}
const styles = StyleSheet.create({
   row:{
    marginTop:5,
    height:1.4,
    backgroundColor:theme.pallete.black
   }
})
export default RowHorizontal