import { View, Text, ActivityIndicator, StyleSheet } from "react-native";
import colors from "../misc/colors";

const LoadingView = (): React.JSX.Element => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={"large"} color={colors.FONT_BLUE_ACTIVE} />
            <Text style={styles.text}>...Loading</Text>
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
    text: {
        marginTop: 15,
        textAlign: "center",
        fontSize: 22,
        fontWeight: "bold",
        color: colors.FONT_BLUE_ACTIVE,
    },
});

export default LoadingView;