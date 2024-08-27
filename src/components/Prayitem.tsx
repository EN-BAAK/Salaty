import { View, Text, StyleSheet } from "react-native";
import colors from "../misc/colors";
import { useDataContext } from "../context/DataProvider";
import { useState } from "react";
import { PrayersDateFixer } from "../misc/types";

const translator = require('../../assets/languages.json');
const PrayItem = ({ name, fixedDate: date, remindMe: remain, isEnable: toggle, nextOne }: PrayersDateFixer): React.JSX.Element => {
  const [isEnable, setIsEnable] = useState(toggle);
  const { editData, language } = useDataContext();
  const itemsStyle = [styles.headerItem, nextOne ? styles.current : styles.normal];

  const edit = () => {
    setIsEnable(!toggle);
  };

  return (
    <View style={[styles.header, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
      <Text style={itemsStyle}>{translator[language][name]}</Text>
      <Text style={itemsStyle}>{date}</Text>
      <Text style={itemsStyle}>{remain}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    alignItems: "center",
  },
  headerItem: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
  },
  current: {
    fontWeight: "500",
    color: colors.FONT_ERR
  },
  normal: {
    color: 'black',
  }
});

export default PrayItem;