import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import BackIcon from '../components/BackIcon';
import FavoriteIcon from '../components/FavoriteIcon';
import CalendarIcon from '../components/CalendarIcon';

export default function DetailsScreen({ route, navigation }) {
  const { item } = route.params;
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  useFocusEffect(
    React.useCallback(() => {
      const parentNavigator = navigation.getParent();
      if (parentNavigator) {
        parentNavigator.setOptions({ tabBarStyle: { display: 'none' } });
      }

      return () => {
        if (parentNavigator) {
          parentNavigator.setOptions({
            tabBarStyle: {
              backgroundColor: 'black',
              borderTopColor: '#FCDC2A',
              borderTopWidth: 2,
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              height: 70,
              paddingBottom: 10,
              display: 'flex',
            },
          });
        }
      };
    }, [navigation])
  );

  return (
    <View style={styles.container}>
      <View style={styles.imageHeader}>
        <Image source={{ uri: item.image }} style={styles.backgroundImage} />
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackIcon />
          </TouchableOpacity>
          <View style={styles.coinContainer}>
            <Image source={require('../assets/Coin.png')} style={styles.coinIcon} />
            <Text style={styles.coinText}>14,000</Text>
          </View>
          <TouchableOpacity>
            <MaterialIcons name="notifications-none" size={24} color="white" />
          </TouchableOpacity>
        </View>
        <View style={styles.favoriteIcon}>
          <FavoriteIcon onPress={toggleFavorite} color="black" />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.userContainer}>
          <View style={styles.userIconContainer}>
            <MaterialIcons name="person" size={40} color="#1c1c1c" style={styles.userIcon} />
          </View>
          <View>
            <Text style={styles.username}>{item.username}</Text>
            <Text style={styles.location}>소프트웨어과 119기</Text>
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.coinInfoContainer}>
              <Image source={require('../assets/Coin.png')} style={styles.smallCoinIcon} />
              <Text style={styles.infoText}>{item.price.toLocaleString()}원</Text>
            </View>
            <View style={styles.dateContainer}>
              <CalendarIcon style={styles.smallCalendarIcon} />
              <Text style={styles.infoText}>{item.date}까지</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorLine} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <View style={styles.tagContainer}>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
          </View>
          <Text style={styles.description}>{item.content}</Text>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.chatButton} onPress={() => Alert.alert('채팅 시작')}>
        <Text style={styles.chatButtonText}>채팅하기</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1c',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    zIndex: 10,
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
  },
  coinContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 4,
    marginRight: 'auto',
  },
  coinIcon: {
    width: 24,
    height: 24,
  },
  smallCoinIcon: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
  coinText: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginLeft: 3,
    fontFamily: 'Pretendard',
    lineHeight: 22,
    textAlign: 'center',
  },
  scrollContainer: {
    paddingBottom: 150, 
  },
  imageHeader: {
    width: '100%',
    height: 300,
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favoriteIcon: {
    position: 'absolute',
    bottom: 10,
    right: 20,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#1c1c1c',
    paddingHorizontal: 20,
  },
  userIconContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  userIcon: {
    borderRadius: 20,
  },
  username: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FCFCFC',
    fontFamily: 'Pretendard',
    lineHeight: 20,
    fontStyle: 'normal',
  },
  location: {
    fontSize: 12,
    fontWeight: '600',
    color: '#CCC',
    fontFamily: 'Pretendard',
    lineHeight: 16,
    fontStyle: 'normal',
    marginTop: 4,
  },
  infoContainer: {
    marginLeft: 'auto',
    alignItems: 'flex-end',
    flexDirection: 'column',
  },
  coinInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 14,
    color: 'white',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  smallCalendarIcon: {
    marginRight: 4,
    width: 20,
    height: 20,
  },
  separatorLine: {
    height: 1,
    backgroundColor: '#FFD700',
    marginHorizontal: 0,
    marginBottom: 16,
  },
  detailsContainer: {
    padding: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
    color: '#FFF',
    fontFamily: 'Pretendard',
    lineHeight: 22,
    fontStyle: 'normal',
    marginBottom: 8,
  },
  tagContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#FFD700',
    color: '#333',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginRight: 4,
  },
  description: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  chatButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFD700',
    height: 70,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopColor: '#000',
    borderLeftColor: '#000',
    borderRightColor: '#000',
    borderTopWidth: 2,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    zIndex: 20,
  },
  chatButtonText: {
    color: '#333',
    fontSize: 32,
    fontWeight: '600',
    textAlign: 'center',
    fontFamily: 'Pretendard',
    lineHeight: 22,
  },
});
