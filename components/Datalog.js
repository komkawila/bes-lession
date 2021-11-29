
// select datalog_id,datalog_time from datalog_tb where datalog_time > now() - INTERVAL 7 day and user_username = 'user1' GROUP BY datalog_time order by datalog_time desc
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { Header } from 'react-native-elements';
import axios from 'axios';
import { DataTable } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import storage from './Storage1';

const optionsPerPage = [2, 3, 4];
const Datalog = () => {
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
    // const [log, setLog] = useState([]);
    // useEffect(() => {
    //     axios.get("https://bedlesion.komkawila.com/datalog/" + username + "/7").then(res => {
    //         setLog(res.data);
    //         console.log("DATALOG");
    //         console.log(res.data);
    //     });
    // }, []);
    const [page, setPage] = React.useState(0);
    const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

    React.useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    // const [items, setItems] = useState([
    //     { label: 'Apple', value: 'apple' },
    //     { label: 'Banana', value: 'banana' }
    // ]);
    const [items, setItems] = useState([]);
    useEffect(() => {
        axios.get("https://bedlesion.komkawila.com/datedatalog/" + username).then(async res => {
            var aaa = [];
            await (res.data).map(res2 => {
                const date = new Date(res2.label)
                const resultdate = date.toLocaleDateString('th-TH', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                })
                const resulttime = date.toLocaleTimeString('th-TH', {
                    hour: 'long',
                    minute: 'long',
                    second: 'long'
                })
                aaa.push(
                    {
                        value: res2.value,
                        label: resultdate + " " + resulttime
                    }
                )
            });
            await setItems(aaa);
        })
    }, [username])
    const [table1, setTable1] = useState([]);
    useEffect(() => {
        // console.log("%%%%%%%% value = " + value);
        // console.log("https://bedlesion.komkawila.com/iddatalog/" + value);
        axios.get("https://bedlesion.komkawila.com/iddatalog/" + value).then(res => setTable1(res.data));
    }, [value]);
    // useEffect(() => {
    //     if (table1.length != 0) {
    //         console.log("######### table1 = ");
    //         // console.log(table1[0]);
    //     }

    // }, [table1]);

    return (
        <SafeAreaView style={styles.container}>
            <Header centerComponent={{
                text: 'ข้อมูล',
                style: {
                    color: '#fff',
                    fontSize: 18,
                    paddingTop: 10
                }
            }}
            />
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                placeholder='กรุณาเลือกวันที่และเวลา'
                autoScroll={true}
                translation={{
                    PLACEHOLDER: "Select an item"
                  }}
            />

            <DataTable style={{ marginTop: 20 }}>
                <DataTable.Header>
                    <DataTable.Title numeric style={styles.titlecol1}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>เซนเซอร์</Text></DataTable.Title>
                    <DataTable.Title numeric style={styles.titlecol2}><Text style={{ fontWeight: 'bold', fontSize: 18 }}>น้ำหนัก</Text></DataTable.Title>
                </DataTable.Header>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 1</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor1 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 2</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor2 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 3</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor3 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 4</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor4 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 5</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor5 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 6</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor6 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 7</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor7 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 8</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor8 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 9</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor9 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 10</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor10 : null}</DataTable.Cell>
                </DataTable.Row>
                <DataTable.Row>
                    <DataTable.Cell numeric style={styles.tabelcol1}>SENSOR 11</DataTable.Cell>
                    <DataTable.Cell numeric style={styles.tabelcol2}>{(table1.length != 0) ? table1[0].datalog_sensor11 : null}</DataTable.Cell>
                </DataTable.Row>

            </DataTable>

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

    },
    tabelcol1: {
        backgroundColor: '#82AAD8',
        justifyContent: 'center'
    },
    tabelcol2: {
        backgroundColor: '#B0C5DC',
        justifyContent: 'center'
    },
    titlecol1: {
        backgroundColor: '#82AAD8',
        justifyContent: 'center'
    },
    titlecol2: {
        backgroundColor: '#B0C5DC',
        justifyContent: 'center'
    }
});
export default Datalog;
