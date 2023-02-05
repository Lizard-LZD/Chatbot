import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const Header = ({ title }) => {
    return (
        <SafeAreaView style={styles.headerContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{title}</Text>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#f4511e',
        paddingTop: Platform.OS === 'ios' ? 40 : 0,
        height: Platform.OS === 'ios' ? 120 : 80,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4511e',
    },
    headerText: {
        marginTop: 15,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 22,
    },
});

export default Header;
