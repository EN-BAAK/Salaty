import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import ScreenView from "../components/ScreenView";
import colors from "../misc/colors";
import PrayItem from "../components/Prayitem";
import { useDataContext } from "../context/DataProvider";
import { calcTime, formateTime, formateTime12 } from "../misc/helpers";
import Icon from "react-native-vector-icons/FontAwesome";

const mosqueImage = require("../../assets/images/mos-1.jpg");
const translator = require('../../assets/languages.json')

const HomeScreen = ({ navigation }: { navigation: any }): React.JSX.Element => {
    const CONTEXT = useDataContext();
    const { prays, nextPray, language } = CONTEXT;

    return (
        <ScreenView>
            <View style={styles.container}>
                <Image style={styles.image} source={mosqueImage} />
                <View style={styles.content}>
                    <View style={[styles.header, {flexDirection: language === 'en' ? "row": "row-reverse"}]}>
                        <Text style={styles.headerItem}>{translator[language]['pray']}</Text>
                        <Text style={styles.headerItem}>{translator[language]['date']}</Text>
                        <Text style={styles.headerItem}>{translator[language]['remain']}</Text>
                    </View>
                    {prays.map((pray, index) => (
                        <PrayItem
                            key={index}
                            name={pray.name}
                            fixedDate={formateTime12(pray.fixedDate)}
                            remindMe={formateTime(calcTime(pray.fixedDate))}
                            isEnable={pray.isEnable}
                            nextOne={nextPray === pray.name}
                        />
                    ))}
                </View>
                <Pressable
                    style={styles.floatingIcon}
                    onPress={() => navigation.navigate("Settings")}
                >
                    <Text><Icon name={"gear"} size={24} color={colors.FONT_BLUE} /></Text>
                </Pressable>
                <View style={styles.location}>
                    <Text style={styles.locationText}>{translator[language]['country']}</Text>
                </View>
            </View>
        </ScreenView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'relative',
    },
    image: {
        width: "100%",
        height: 400,
        borderBottomRightRadius: 50,
        borderBottomLeftRadius: 50,
    },
    content: {
        backgroundColor: colors.APP_BG,
        flex: 1,
        margin: 10,
        paddingHorizontal: 2,
        paddingVertical: 10,
        borderRadius: 25,
        justifyContent: "space-between",
    },
    header: {
        alignItems: "center",
    },
    headerItem: {
        flex: 1,
        textAlign: "center",
        fontWeight: "600",
        fontSize: 16,
        color: colors.FONT_BLUE,
    },
    floatingIcon: {
        backgroundColor: colors.APP_BG,
        width: 35,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 15,
        right: 15
    },
    location: {
        backgroundColor: colors.APP_BG,
        width: 200,
        height: 35,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: 15,
        top: 15
    },
    locationText: {
        color: colors.FONT_BLUE,
        fontSize: 20,
    },
});

export default HomeScreen;