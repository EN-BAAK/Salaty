import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../misc/colors";
import React from "react";

const errorImage = require("../../assets/images/Error.jpg");

const ErrorView = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={errorImage} />
            <Text style={styles.text}>You Are Not Connected</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.APP_BG,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    image: {
        width: 350,
        height: 350,
        marginBottom: 5,
    },
    text: {
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: colors.FONT_ERR,
    },
});

export default ErrorView;