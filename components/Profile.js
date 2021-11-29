
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert } from 'react-native';
import { Avatar, Input, Header, ButtonGroup } from 'react-native-elements';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Icon from 'react-native-vector-icons/FontAwesome';

import storage from './Storage1';
import NotificationSounds, { playSampleSound, stopSampleSound } from 'react-native-notification-sounds';



const Profile = () => {

    const [name, setName] = useState("");
    const [genders, setGender] = useState(0);
    const [names, setNames] = useState("");
    const [age, setAge] = useState("");
    const [weight, setWeight] = useState("");
    const gender = ['ชาย', 'หญิง']
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
                axios.get("https://bedlesion.komkawila.com/user/" + ret.username).then(res => {
                    setGender(res.data[0].user_gender);
                    setNames(res.data[0].user_name);
                    setAge(res.data[0].user_age);
                    setWeight(res.data[0].user_weight);
                }
                );
                // console.log(ret.status);
                // console.log(ret.username);
                // console.log(ret.password);
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

    function selectgender(e) {
        setGender(e);
    }

    // useEffect(() => {
    //     axios.get("https://bedlesion.komkawila.com/user/" + username).then(res => {
    //         setGender(res.data[0].user_gender);
    //         setNames(res.data[0].user_name);
    //         setAge(res.data[0].user_age);
    //         setWeight(res.data[0].user_weight);
    //     }
    //     );
    // }, [username]);
    function saveProfile() {
        axios.put("https://bedlesion.komkawila.com/user/" + username, {
            "user_name": names,
            "user_age": age,
            "user_weight": weight,
            "user_gender": genders
        }).then(res => {
            // console.log(res.data.affectedRows);
            if (res.data.affectedRows != 0) {
                Alert.alert(
                    "แจ้งเตือน",
                    "บันทึกข้อมูลสำเร็จ"
                );
            } else {
                Alert.alert(
                    "แจ้งเตือน",
                    "บันทึกข้อมูลไม่สำเร็จ"
                );
            }
        });
        // console.log("saveProfile()" + "https://bedlesion.komkawila.com/user/" + username);
    }
    // console.log("***************** STATUS *****************");
    // console.log("username = " + username);
    // console.log("password= " + password);
    // console.log("status = " + login);
    // console.log("*******************************************");

    function saveSocket() {

    }

    return (
        <View style={styles.container}>
            <Header centerComponent={{
                text: 'ข้อมูลผู้ป่วย',
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
                marginTop: 20,
                width: '80%'
            }}>
                <Avatar
                    size="xlarge"
                    rounded
                    source={require('../assets/login.png')}
                />
                <Text style={{ marginTop: 10, fontSize: 20, fontWeight: 'bold', color: '#2B5B97' }}>{username}</Text>

            </View>
            {/* <View style={{  width: '100%', height: '100%' }}> */}
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 26 }}>
                <Text style={{ width: '30%', marginLeft: 20, padding: 10, fontSize: 20, color: '#3770B8' }}>ชื่อ-สกุล</Text>
                <TextInput
                    style={styles.input}
                    placeholder='ชื่อ-สกุล'
                    value={names}
                    onChangeText={value => setNames(value)}
                // onSubmitEditing={Keyboard.dismiss}
                />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 26 }}>
                <Text style={{ width: '30%', marginLeft: 20, padding: 10, fontSize: 20, color: '#3770B8' }}>อายุ</Text>
                <TextInput
                    style={styles.input}
                    placeholder='อายุ'
                    keyboardType='decimal-pad'
                    value={age.toString()}
                    onChangeText={value => setAge(value)}
                />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 26 }}>
                <Text style={{ width: '30%', marginLeft: 20, padding: 10, fontSize: 20, color: '#3770B8' }}>น้ำหนัก</Text>
                <TextInput
                    style={styles.input}
                    placeholder='น้ำหนัก'
                    keyboardType='decimal-pad'
                    value={weight.toString()}
                    onChangeText={value => setWeight(value)}

                />
            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 26 }}>
                <Text style={{ width: '30%', marginLeft: 20, padding: 10, fontSize: 20, color: '#3770B8' }}>เพศ</Text>
                <ButtonGroup
                    onPress={selectgender}
                    selectedIndex={genders}
                    buttons={gender}
                    containerStyle={{ height: '90%', width: '60%' }}
                />
            </View>
            <Button
                title={'บันทึกข้อมูล'}
                containerStyle={{
                    width: 200,
                    marginHorizontal: 50,
                    marginVertical: 10,
                    backgroundColor: '#147db4',
                    marginTop: 30
                }}
                onPress={saveProfile}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
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

    },
    input: {
        padding: 10,
        borderWidth: 0.5,
        borderRadius: 30,
        width: '60%',
        borderColor: '#6589B2',
        backgroundColor: '#ABBCCF'
    },
});
export default Profile;
