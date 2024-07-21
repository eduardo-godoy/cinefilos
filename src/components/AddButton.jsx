import { Pressable, StyleSheet, Text } from "react-native";
import React from "react";
import { colors } from "../global/colors";

export default function AddButton ({ title , onPress = () => {} }) {
    return (
        <Pressable style={styles.button} onPress={onPress}> 
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    button: {
        width: "75%",
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: colors.red,
        justifyContent: "center",
        alignItems: "center",
        padding: 8,
        margin: 10
    },
    text: {
        fontSize: 18,
        color: colors.green300,
        fontFamily: "roboto",
        textAlign: "center",
        color: colors.white
    }
});
