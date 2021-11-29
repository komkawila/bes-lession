import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { Tab, TabView, Header, Avatar, Input, Button } from 'react-native-elements';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
// const Tab1 = createBottomTabNavigator();
import Datalog from './components/Datalog';
import Home from './components/Home';
import Profile from './components/Profile.js';
// import Login from './components/Login.js';

// import Storage from 'react-native-storage';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const storage = new Storage({
//   size: 1000,
//   storageBackend: AsyncStorage,
//   defaultExpires: 1000 * 3600 * 24,
//   enableCache: true,
//   sync: {
//   }
// });
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab23 = createMaterialBottomTabNavigator();

import storage from './components/Storage1';

export default function App() {
  const [index, setIndex] = useState(0);
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    storage
      .load({
        key: 'loginState',
        autoSync: true,
        syncInBackground: true,
        syncParams: {
          extraFetchOptions: {
          },
          someFlag: true
        }
      })
      .then(ret => {
        setLogin(ret.status);
        setUsername(ret.username);
        setPassword(ret.password);
        console.log(ret.status);
        console.log(ret.username);
        console.log(ret.password);
      })
      .catch(err => {
        console.warn(err.message);
        switch (err.name) {
          case 'NotFoundError':
            break;
          case 'ExpiredError':
            break;
        }
      });
  }, []);

  async function loginFunc(e) {
    // console.log("start")
    // console.log("username = " + username)
    // console.log(username)
    // console.log("password = " + password)
    await axios.get('https://bedlesion.komkawila.com/login/' + username + '/' + password).then(res => {
      console.log(res.data)
      if (res.data.length != 0) {
        Alert.alert(
          "เข้าสู่ระบบ",
          "เข้าสู่ระบบ สำเร็จ"
        );
        setLogin(true);
        storage.save({
          key: 'loginState',
          data: {
            status: true,
            username: username,
            password: password
          },
          expires: 1000 * 3600
        });
      } else {
        Alert.alert(
          "เข้าสู่ระบบ",
          "เข้าสู่ระบบ ไม่สำเร็จ"
        );
        storage.save({
          key: 'loginState',
          data: {
            status: false,
            username: '',
            password: ''
          },
          expires: 1000 * 3600
        });
      }
    });
  }
  // storage.save({
  //   key: 'loginState',
  //   data: {
  //     status: false,
  //     username: '',
  //     password: ''
  //   },
  //   expires: 1000 * 3600
  // });


  function logoutFunc() {
    setLogin(false);
    setUsername('');
    setPassword('');
    storage.save({
      key: 'loginState',
      data: {
        status: false,
        username: '',
        password: ''
      },
      expires: 1000 * 3600
    });
    // console.log("logoutFunc");
  }
  // load
  // console.log("login = " + login);
  return(
    <Tab.Navigator>
          <Tab.Screen name="Datalog" component={Datalog} />
          <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>);
  // if (login) {
  //   return (
  //     <SafeAreaView style={{ backgroundColor: 'green', position: 'absolute', width: '100%', height: '100%' }}>
  //       {index == 0 ? <Header centerComponent={{ text: 'ข้อมูล', style: { color: '#fff', fontSize: 18, paddingTop: 10 } }} /> : null}
  //       {index == 1 ? <Header centerComponent={{ text: 'ตำแหน่งกดทับ', style: { color: '#fff', fontSize: 18, paddingTop: 10 } }} /> : null}
  //       {index == 2 ? <Header
  //         centerComponent={{ text: 'ข้อมูลผู้ป่วย', style: { color: '#fff', fontSize: 18, paddingTop: 10 } }}
  //         rightComponent={<TouchableOpacity onPress={logoutFunc}>
  //           <Icon1 name="logout" size={30} color="white" />
  //         </TouchableOpacity>}
  //       // rightComponent={ <TouchableOpacity></TouchableOpacity>icon: 'logout', color: '#fff', style: { paddingTop: 30 } } 
  //       /> : null}

  //       <TabView value={index} >
  //         <TabView.Item style={styles.datalogScreen}>
  //           <Datalog />
  //         </TabView.Item>

  //         <TabView.Item style={styles.homeScreen}>
  //           <Home />
  //         </TabView.Item>

  //         <TabView.Item style={styles.userScreen}>
  //           <Profile />
  //         </TabView.Item>
  //       </TabView>
  //       <View
  //         // style={{position:'absolute'}}
  //         style={{ backgroundColor: 'red' }}
  //       >

  //         <Tab
  //           value={index}
  //           onChange={setIndex}
  //         >
  //           <Tab.Item icon={
  //             <Icon name="table" size={30} color="black" />
  //           } />
  //           <Tab.Item icon={
  //             <Icon name="home" size={30} color="black" />
  //           } />
  //           <Tab.Item icon={
  //             <Icon name="user" size={30} color="black" />
  //           } />
  //         </Tab>
  //       </View>

  //     </SafeAreaView>
  //   );
  // } else {
  //   return (
  //     <View style={styles.container}>
  //       <SafeAreaView style={styles.container}>
  //         <Header centerComponent={{
  //           text: 'เข้าสู่ระบบ',
  //           style: {
  //             color: '#fff',
  //             fontSize: 18,
  //             paddingTop: 10
  //           }
  //         }}
  //         />
  //         <View style={{
  //           alignContent: 'center',
  //           alignItems: 'center',
  //           marginTop: 50
  //         }}>
  //           <Avatar
  //             size="xlarge"
  //             rounded
  //             source={require('./assets/login.png')}
  //           />
  //           <View style={{ width: '90%', marginTop: 40 }}>
  //             <Input
  //               placeholder=' Username'
  //               leftIcon={
  //                 <Icon
  //                   name='user'
  //                   size={24}
  //                   color='black'
  //                 />
  //               }
  //               // ref={username}
  //               onChangeText={value => setUsername(value)}
  //             />
  //             <Input
  //               placeholder=' Password'
  //               leftIcon={
  //                 <Icon
  //                   name='lock'
  //                   size={24}
  //                   color='black'
  //                 />
  //               }
  //               secureTextEntry={true}
  //               onChangeText={value => setPassword(value)}
  //             // ref={password}
  //             />
  //             <Button
  //               icon={
  //                 <Icon
  //                   name="arrow-right"
  //                   size={15}
  //                   color="white"
  //                 />
  //               }
  //               title="  Login"
  //               onPress={loginFunc}
  //             />
  //           </View>
  //         </View>


  //       </SafeAreaView>
  //     </View>
  //   );
  // }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  containermain: {

    backgroundColor: '#ff0',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  datalogScreen: {
    // backgroundColor: '#f00',
    width: '100%',
    // height: '100%'
  }, homeScreen: {
    // backgroundColor: '#0f0',
    width: '100%',
    // height: '100%'
  }, userScreen: {
    // backgroundColor: '#00f',
    width: '100%',
    // height: '100%'
  }
});
