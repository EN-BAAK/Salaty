import { View, Text, StyleSheet, TouchableOpacity, PermissionsAndroid } from "react-native";
import ScreenView from "../components/ScreenView";
import colors from "../misc/colors";
import SettingItem from "../components/SettingItem";
import { prays } from "../misc/constants";
import { useDataContext } from "../context/DataProvider";
import LanguagePicker from "../components/LanguagePicker";

const translator = require('../../assets/languages.json')

const SettingScreen = (): React.JSX.Element => {
  const { language } = useDataContext();

  // const requestForegroundServicePermission = async () => {
  //   try {
  //     console.log("reach 1")
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.FOREGROUND_SERVICE
  //       // {
  //       //   title: 'Foreground Service Permission',
  //       //   message: 'This app requires permission to run foreground services.',
  //       //   buttonPositive: 'OK',
  //       //   buttonNegative: "Cancel"
  //       // },
  //     );
  //     console.log("reach 2")
  //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //       editBackgroundPermission(true)
  //     } else {
  //       editBackgroundPermission(false)
  //     }
  //   } catch (error) {
  //     console.warn('Error requesting Foreground Service permission:', error);
  //   }
  // }

  return (
    <ScreenView>
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={[styles.holder, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            <Text style={styles.textLang}>{translator[language]['language-choice']}</Text>

            <LanguagePicker />
          </View>

          <View style={[styles.holder, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            <Text style={styles.textLang}>{translator[language]['background-choice']}</Text>

            {/* <TouchableOpacity
              style={[styles.circleBackground, { backgroundColor: allowBackgroundService ? colors.green : colors.FONT_ERR }]}
              // onPress={requestForegroundServicePermission}
            /> */}
          </View>

          <View style={[styles.header, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
            <Text style={styles.headerItem}>{translator[language]['pray']}</Text>
            <Text style={styles.headerItem}>{translator[language]['edit-date']}</Text>
            <Text style={styles.headerItem}>{translator[language]['remind']}</Text>
          </View>

          {prays.map((pray, index) => {
            return (
              <SettingItem
                key={index}
                name={pray}
              />
            );
          })}
        </View>
        <Text style={styles.headerTop}>{translator[language]['settings']}</Text>
      </View>
    </ScreenView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  content: {
    backgroundColor: colors.APP_BG,
    width: "90%",
    marginTop: 22,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: "space-between",
  },
  header: {
    marginBottom: 22,
    alignItems: "center",
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
    fontWeight: "600",
    fontSize: 22,
    color: colors.FONT_BLUE,
  },
  headerTop: {
    backgroundColor: colors.APP_BG,
    width: 250,
    paddingVertical: 8,
    borderRadius: 25,
    position: "absolute",
    top: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 22,
    color: colors.FONT_BLUE,
  },
  holder: {
    marginBottom: 8,
    paddingVertical: 5,
    paddingHorizontal: 16,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textLang: {
    fontWeight: "600",
    fontSize: 18,
    color: colors.FONT_BLUE
  },
  circleBackground: {
    width: 35,
    height: 35,
    marginRight: 45,
    borderRadius: 50,
  }
});

export default SettingScreen;