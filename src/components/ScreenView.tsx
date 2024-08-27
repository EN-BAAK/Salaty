import { ImageBackground, View, StatusBar, StyleSheet } from "react-native";
import colors from "../misc/colors";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const background = require("../../assets/images/background.jpg");

const ScreenView = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ImageBackground
                style={styles.container}
                source={background}
                resizeMode="cover"
            >
                <View style={styles.layout}>{children}</View>
                <StatusBar
                    backgroundColor={colors.FONT_BLUE_LIGHT}
                    barStyle="dark-content"
                />
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.APP_BG,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    layout: {
        backgroundColor: colors.LAYOUT,
        width: "100%",
        height: "100%",
    },
});

export default ScreenView;