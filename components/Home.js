
import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from 'react-native';
import { Avatar, Input, Header, Card, Image, Tile } from 'react-native-elements';
const users = {
    name: 'brynn',
    avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
};
const Home = (data) => {
    const [sensorL1, setL1] = useState(false);
    const [sensorL2, setL2] = useState(true);
    const [sensorL3, setL3] = useState(true);

    const [sensorC1, setC1] = useState(false);
    const [sensorC2, setC2] = useState(false);
    const [sensorC3, setC3] = useState(false);
    const [sensorC4, setC4] = useState(false);
    const [sensorC5, setC5] = useState(false);

    const [sensorR1, setR1] = useState(false);
    const [sensorR2, setR2] = useState(false);
    const [sensorR3, setR3] = useState(false);
    const [count, setCount] = useState(false);
    // setCount(data.data.count);
    // console.log(data.data.count)

    // setL1(parseFloat(data.data.sensor.s1) >= 1.0 ? true : false)
    // const theme = useContext(ThemeContext);
    // console.log(count);
    const messStep = ["","นอนหงาย","ตะแคงซ้าย","ตะแคงขวา"];
    const messNextStep = ["พลิกตัวนอนหงาย","พลิกตัวตะแคงซ้าย","พลิกตัวตะแคงขวา"];
    const jsobj = {
        "user": "user2",
        "pass": "password2",
        "time": "01:11:00",
        "sensor": {
            "s1": 1.0,
            "s2": 1.5,
            "s3": 1.3,
            "s4": 1.3,
            "s5": 1.3,
            "s6": 1.3,
            "s7": 1.3,
            "s8": 1.3,
            "s9": 1.3,
            "s10": 1.3,
            "s11": 1.3
        }
    };
    const [step, setStep] = useState(0);
    useEffect(() => {
        console.log("[Home] data.data.sensor = ");
        console.log(data.data.step);
        setStep(parseInt(data.data.step));
        setL1(parseFloat(data.data.sensor.s1) >= 1.0 ? true : false);
        setC1(parseFloat(data.data.sensor.s2) >= 1.0 ? true : false);
        setR1(parseFloat(data.data.sensor.s3) >= 1.0 ? true : false);
        setL2(parseFloat(data.data.sensor.s4) >= 1.0 ? true : false);
        setC4(parseFloat(data.data.sensor.s5) >= 1.0 ? true : false);
        setC2(parseFloat(data.data.sensor.s6) >= 1.0 ? true : false);
        setC5(parseFloat(data.data.sensor.s7) >= 1.0 ? true : false);
        setR2(parseFloat(data.data.sensor.s8) >= 1.0 ? true : false);
        setL3(parseFloat(data.data.sensor.s9) >= 1.0 ? true : false);
        setC3(parseFloat(data.data.sensor.s10) >= 1.0 ? true : false);
        setR3(parseFloat(data.data.sensor.s11) >= 1.0 ? true : false);

    }, [data])
    return (
        <SafeAreaView style={styles.container}>
            <Header centerComponent={{
                text: 'ตำแหน่งกดทับ',
                style: {
                    color: '#fff',
                    fontSize: 18,
                    paddingTop: 10
                }
            }}
            />
            <View style={{ backgroundColor: '#68A2AC', width: '100%', height: '50%' }}>
                <ImageBackground source={require('../assets/white.jpeg')} resizeMode="cover" style={styles.image}>
                    {/* <Text style={styles.text}>พลิกตัวไปทางซ้าย</Text> */}
                    <View style={{ width: '90%', height: '15%', flexDirection: 'row' }}>
                        {sensorL1 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}

                        <View style={{ flex: 1, width: '15%', height: '100%', margin: 8 }}></View>
                        {sensorC1 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        <View style={{ flex: 1, width: '15%', height: '100%', margin: 8 }}></View>
                        {sensorR1 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                    </View>
                    <View style={{ width: '90%', height: '15%', flexDirection: 'row', marginTop: '7%' }}>
                        {sensorL2 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        {sensorC4 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        {sensorC2 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        {sensorC5 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        {sensorR2 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                    </View>
                    <View style={{ width: '90%', height: '15%', flexDirection: 'row', marginTop: '7%' }}>
                        {sensorL3 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        <View style={{ flex: 1, width: '15%', height: '100%', margin: 8 }}></View>
                        {sensorC3 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                        <View style={{ flex: 1, width: '15%', height: '100%', margin: 8 }}></View>
                        {sensorR3 ? <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#008AFF', margin: 8 }} /> :
                            <View style={{ flex: 1, width: '15%', height: '100%', backgroundColor: '#9CADBD', margin: 8 }} />}
                    </View>
                </ImageBackground>
            </View>
            <View style={{ width: '100%', height: '10%', }}>
                <ImageBackground source={require('../assets/white.jpeg')} resizeMode="cover" style={styles.image}>
                    <Text style={styles.textcenter}>เวลาพลิกตัว : {data.data.count}</Text>
                </ImageBackground>
            </View>
            <View style={{ width: '100%', height: '30%' }}>
                <ImageBackground source={require('../assets/white.jpeg')} resizeMode="cover" style={styles.image}>
                    <Text style={styles.text}>{messStep[step]}</Text>
                </ImageBackground>
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

    }, image: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: "black",
        fontSize: 30,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        // backgroundColor: "#000000c0"
    }, textcenter: {
        color: "white",
        fontSize: 24,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        // borderWidth:5,
        borderRadius: 20,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: "#000000c0",
    }
});
export default Home;
