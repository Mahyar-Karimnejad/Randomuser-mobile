import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ScrollView,
  RefreshControl,
  Linking,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';


const App = () => {
  const [userList, setUserList] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const RandomGet = async () => {
    const response = await fetch('https://randomuser.me/api/');
    if (response.status === 200) {
      const data = await response.json();
      setUserList(data.results);
    }
  };

  useEffect(() => {
    RandomGet();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    RandomGet();
    setRefreshing(false);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <FlatList
          data={userList}
          renderItem={({ item }) => (
            <View style={styles.mainstyle} key={item.login.uuid}>
              <Image style={styles.image} source={{ uri: item.picture.large }} />
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
                <FontAwesome name="user" size={24} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{`${item.name.first} ${item.name.last}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="envelope" size={24} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{`${item.email}`}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="calendar" size={24} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{moment(item.dob.date).format('YYYY/MM/DD')}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="mobile" size={40} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{item.cell}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="phone" size={30} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{item.phone}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="globe" size={30} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{item.location.country}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 5 }}>
                <FontAwesome name="address-book" size={30} />
                <Text style={styles.colon}>  </Text>
                <Text style={styles.text}>{item.location.city + " , " + item.location.street.name + " , " + "No" + item.location.postcode}</Text>
              </View>
            </View>

          )}
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
          <View style={styles.footer}>
  <Text style={styles.footerText}>
    © 2023 Mahyar Karimnejad. All rights reserved.
  </Text>
  <Text style={styles.footerText}>
    Website designed and developed by Mahyar Karimnejad.
  </Text>
  <Text style={styles.footerText}>
    View the source code on{' '}
    <Text style={styles.link} onPress={() => Linking.openURL('https://github.com/Mahyar-Karimnejad/Randomuser-Web')}>
      GitHub
    </Text>
    .
  </Text>
</View>

      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mainstyle: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,


  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 150,
    marginBottom: 10
  },
  footer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    color: '#333',
    fontSize: 12,
    textAlign: 'center',
  },
  link: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});

export default App;