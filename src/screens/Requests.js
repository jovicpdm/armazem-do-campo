import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import RequestCard from '../components/RequestCard';
import TitleScreen from '../components/TitleScreen';
import TopScreen from '../components/TopScreen';
import WhiteAreaWithoutScrollView from '../components/WhiteAreaWithoutScrollView';

export default function Requests() {
  return (
    <View>
      <TopScreen>
        <TitleScreen>Solicitações</TitleScreen>
      </TopScreen>
      <WhiteAreaWithoutScrollView>
        <RequestCard></RequestCard>
      </WhiteAreaWithoutScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
