
import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Alert } from 'react-native';
import { Header, Avatar, Input, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import Storage from 'react-native-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storage = new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: 1000 * 3600 * 24,
    enableCache: true,
    sync: {
    }
});

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    // const username = React.createRef();
    // const password = React.createRef();
    async function loginFunc(e) {
        // console.log(e);
        // Alert.alert(
        //     "เข้าสู่ระบบ",
        //     "เข้าสู่ระบบ ไม่สำเร็จ"
        // );
        // Alert.alert(
        //     "เข้าสู่ระบบ",
        //     "เข้าสู่ระบบ สำเร็จ"
        // );
        console.log("start")
        console.log("username = " + username)
        console.log(username)
        console.log("password = " + password)
        await axios.get('https://bedlesion.komkawila.com/login/' + username + '/' + password).then(res => {
            console.log(res.data)
            if (res.data.length != 0) {
                Alert.alert(
                    "เข้าสู่ระบบ",
                    "เข้าสู่ระบบ สำเร็จ"
                );
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
        // await console.log("1");
        // await console.log("2");
        // await console.log("3");
        // await console.log("4");
        // console.log("end")
    }

    return (
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
                    source={require('../assets/login.png')}
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
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    titleHeader: {
        backgroundColor: "#86BBC2",
        width: '90%',
        alignItems: 'center',
        marginTop: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        borderRadius: 20,
        padding: 6,
        borderWidth: 2,
        borderColor: "#2B575D"

    }
});
export default Login;
