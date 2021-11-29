// select * from datalog_tb where datalog_time > now() - INTERVAL 7 day order by datalog_time desc
import React, { useState, useEffect, useContext } from 'react';
import { TabBarIOSItem, Text, TextInput, View, StyleSheet, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Header, Avatar, Input, Button, Overlay, Image } from 'react-native-elements';
import axios from 'axios';

import Datalog from './components/Datalog';
import Home from './components/Home';
import Profile from './components/Profile.js';
import Icon from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/MaterialCommunityIcons';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';
const Tab23 = createMaterialBottomTabNavigator();
// import MQTT from 'sp-react-native-mqtt';
// import * as Mqtt from 'react-native-native-mqtt';
import storage from './components/Storage1';
const Tab = createBottomTabNavigator();

import useChat from "./components/useChat";
export default function App() {

    // ###############################################################
    const [login, setLogin] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [count, setCount] = useState(1);
    const ThemeContext = React.createContext(count);
    const [play, setPlay] = useState(false);

    const messNextStep = ["พลิกตัวนอนหงาย","พลิกตัวตะแคงซ้าย","พลิกตัวตะแคงขวา"];
    // ###############################################################
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
    // ###############################################################
    const roomId = "0x11"; // Gets roomId from URL
    const { messages, sendMessage } = useChat(roomId); // Creates a websocket and manages messaging
    // const [newMessage, setNewMessage] = React.useState(""); // Message to be sent

    // const handleNewMessageChange = (event) => {
    //     setNewMessage(event.target.value);
    // };

    // const handleSendMessage = () => {
    //     sendMessage(newMessage);
    //     setNewMessage("");
    // };
    // { 
    //     "user" : "user21", 
    //     "pass" : "password2", 
    //     "time" : "02:00:00",
    //     "position" : 
    //        {
    //  "s1" : 1.3,
    //  "s2" : 1.3,
    //  "s3" : 1.3,
    //  "s4" : 1.3,
    //  "s5" : 1.3,
    //  "s6" : 1.3,
    //  "s7" : 1.3,
    //  "s8" : 1.3,
    //  "s9" : 1.3,
    //  "s10" : 1.3,
    //  "s11" : 1.3,
    //        },
    //  }
    const [timecountdown, setCountdown] = useState("");
    const [sensor, setSensor] = useState([]);
    const [step, setStep] = useState(0);
    useEffect(() => {
        try {
            console.log("[App] messages = ");
            console.log(messages.user);
            // console.log("[App] username = ");
            // console.log(username);
            // console.log("[App] password = ");
            // console.log(password);
            // console.log("[API] username = ");
            // console.log(JSON.parse(messages).user);
            // console.log("[App] password = ");
            // console.log(JSON.parse(messages).pass);
            // const obj = JSON.parse(messages);
            // console.log("[App] obj = ");
            // console.log(obj);
            if (username == messages.user && password == messages.pass) {
                setSensor(messages.sensor);
                setStep(parseInt(messages.step));
                console.log("[App] obj = ");
                console.log(messages.sensor);
                setCountdown(messages.time);
                if (messages.time == "00:00:00") {
                    NotificationSounds.getNotifications('notification').then(soundsList => {
                        playSampleSound(soundsList[6]);
                    });
                    setPlay(true);
                } 
                // else if (messages.time == "02:00:00") {
                //     setPlay(false);
                // }
            }

        } catch {

        }

    }, [messages, username, password]);

    useEffect(() => {
        if (play) {
            const interval = setInterval(() => {
                console.log('This will run every second!');
                NotificationSounds.getNotifications('notification').then(soundsList => {
                    playSampleSound(soundsList[6]);
                    return () => clearInterval(interval);
                });
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [play]);

    function logout() {
        Alert.alert(
            "แจ้งเตือน",
            "ออกจากระบบ",
            [
                {
                    text: "ยกเลิก",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                {
                    text: "ยืนยัน", onPress: () => {
                        setLogin(false);
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
                }
            ]
        );
    }
    async function loginFunc(e) {
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




    // useEffect(() => {
    //     const interval = setInterval(() => {
    //         console.log('App second!', count);
    //         if (count >= 10 ) {
    //             setPlay(true);
    //         } 
    //         // else if (count >= 20) {
    //         //     setPlay(false);
    //         //     setCount(1);
    //         //     return () => clearInterval(interval);
    //         // }
    //         setCount(count + 1);
    //     }, 1000);
    //     return () => clearInterval(interval);
    // }, [count]);

    // useEffect(() => {
    //     if (play) {
    //         const interval = setInterval(() => {
    //             console.log('This will run every second!');
    //             NotificationSounds.getNotifications('notification').then(soundsList => {
    //                 // console.warn('SOUNDS', JSON.stringify(soundsList));
    //                 playSampleSound(soundsList[6]);
    //                 return () => clearInterval(interval);
    //             });
    //         }, 1000);
    //         return () => clearInterval(interval);
    //     } else {
    //         stopSampleSound();
    //     }
    // }, [play]);

    function playFunc() {
        setPlay(true);

    }
    function stopFunc() {
        setPlay(false);
        setCount("");
    }
    if (login) {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    screenOptions={({ route }) => ({
                        tabBarIcon: ({ focused, color, size }) => {
                            let iconName;

                            if (route.name === 'ข้อมูล') {
                                iconName = focused
                                    ? 'table'
                                    : 'table';
                            } else if (route.name === 'ตำแหน่งกดทับ') {
                                iconName = focused ? 'home' : 'home';
                            } else if (route.name === 'ข้อมูลผู้ป่วย') {
                                iconName = focused ? 'user' : 'user';
                            } else if (route.name === 'ออกจากระบบ') {
                                iconName = focused ? 'user' : 'user';
                                return <Icon2 name='logout' size={30} color="black" />;
                            }
                            return <Icon name={iconName} size={30} color="black" />;
                        },
                        tabBarActiveTintColor: '#448FED',
                        tabBarInactiveTintColor: 'gray',
                        headerTitleAlign: 'center',
                        headerShown: false,

                    })}
                >
                    <Tab.Screen name="ข้อมูล" component={Datalog} />
                    <Tab.Screen name="ตำแหน่งกดทับ" children={() => <Home data={{ count: timecountdown, sensor: sensor, step: step }} />}></Tab.Screen>
                    <Tab.Screen name="ข้อมูลผู้ป่วย" component={Profile} />

                    <Tab.Screen name="ออกจากระบบ" component={Profile} options={{
                        tabBarButton: (props) => (<TouchableOpacity  {...props} onPress={() => logout()} />),
                    }} />

                    {/* <Tab.Screen name="Logout" listeners={{
                        tabPress: () => {
                            logout();
                        },
                    }} /> */}

                </Tab.Navigator>
                <Overlay isVisible={play} style={{ margin: 0, padding: 0 }}>
                    <View style={{ margin: 0, padding: 10, alignContent: 'center', alignItems: 'center', backgroundColor: '#EFB8C9' }}>
                        <Image
                            source={(require('./assets/alert.png'))}
                            style={{ width: 200, height: 200, margin: 50 }}
                        />
                        <Text style={{ fontWeight: 'bold', fontSize: 30 }}>{messNextStep[(step > 3) ? 0 : step-1]}</Text>
                        <Button
                            title={'ปิดเสียง'}
                            containerStyle={{
                                width: 200,
                                marginHorizontal: 50,
                                marginVertical: 10,
                                backgroundColor: '#FFB8C9',
                                marginTop: 30
                            }}
                            onPress={() => stopFunc()}
                        />
                    </View>
                </Overlay>
            </NavigationContainer>
        );
    } else {
        return (
            <View style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <Header centerComponent={{
                        text: 'เข้าสู่ระบบ',
                        style: {
                            color: '#fff',
                            fontSize: 18,
                            paddingTop: 10
                        }
                    }}
                    />
                    <View style={{
                        alignContent: 'center',
                        alignItems: 'center',
                        marginTop: 50
                    }}>
                        <Avatar
                            size="xlarge"
                            rounded
                            source={require('./assets/login.png')}
                        />
                        <View style={{ width: '90%', marginTop: 40 }}>
                            <Input
                                placeholder=' Username'
                                leftIcon={
                                    <Icon
                                        name='user'
                                        size={24}
                                        color='black'
                                    />
                                }
                                // ref={username}
                                onChangeText={value => setUsername(value)}
                            />
                            <Input
                                placeholder=' Password'
                                leftIcon={
                                    <Icon
                                        name='lock'
                                        size={24}
                                        color='black'
                                    />
                                }
                                secureTextEntry={true}
                                onChangeText={value => setPassword(value)}
                            // ref={password}
                            />
                            <Button
                                icon={
                                    <Icon
                                        name="arrow-right"
                                        size={15}
                                        color="white"
                                    />
                                }
                                title="  Login"
                                onPress={loginFunc}
                            />
                        </View>
                    </View>


                </SafeAreaView>
            </View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
});
