import { View, Text, Pressable, StyleSheet } from "react-native";
import colors from "../misc/colors";
import { useEffect, useState } from "react";
import { getSpecificData } from "../misc/helpers";
import { useDataContext } from "../context/DataProvider";
import Icon from 'react-native-vector-icons/FontAwesome';

const translator = require('../../assets/languages.json')

const SettingItem = ({ name }: { name: string }): React.JSX.Element => {
  const [editingTime, setEditingTime] = useState(0);
  const [remind, setRemind] = useState(-10);

  const { editData, language } = useDataContext();

  const loadData = async () => {
    const editingTime: number | undefined = await getSpecificData(name, "date");
    const remind: number | undefined = await getSpecificData(name, "remind");

    if (editingTime === undefined || remind === undefined) return;

    setEditingTime(editingTime);
    setRemind(remind);
  };

  const decreaseDate = () => {
    if (editingTime <= -59) return;
    setEditingTime(editingTime - 1);
    editData(name, "date", editingTime - 1);
  };
  const increaseDate = () => {
    if (editingTime >= 59) return;
    setEditingTime(editingTime + 1);
    editData(name, "date", editingTime + 1);
  };

  const decreaseRemind = () => {
    if (remind <= -59) return;
    const newValue = remind - 1;
    setRemind(newValue);
    editData(name, "remind", newValue);
  };
  const increaseRemind = () => {
    if (remind >= -1) return;
    const newValue = remind + 1;
    setRemind(newValue);
    editData(name, "remind", newValue);
  };

  useEffect(() => {
    loadData()
  }, []);

  return (
    <View style={[styles.header, { flexDirection: language === 'en' ? "row" : "row-reverse" }]}>
      <Text style={styles.itemName}>{translator[language][name]}</Text>
      <View style={styles.item}>
        <Pressable onPress={decreaseDate}>
          <Icon
            name="arrow-circle-o-left"
            size={24}
            color={colors.FONT_BLUE_ACTIVE}
          />
        </Pressable>
        <Text style={styles.textItem}>{editingTime}</Text>
        <Pressable onPress={increaseDate}>
          <Icon
            name="arrow-circle-o-right"
            size={24}
            color={colors.FONT_BLUE_ACTIVE}
          />
        </Pressable>
      </View>
      <View style={styles.item}>
        <Pressable onPress={increaseRemind}>
          <Icon
            name="arrow-circle-o-left"
            size={24}
            color={colors.FONT_BLUE_ACTIVE}
          />
        </Pressable>
        <Text style={styles.textItem}>{-remind}</Text>
        <Pressable onPress={decreaseRemind}>
          <Icon
            name="arrow-circle-o-right"
            size={24}
            color={colors.FONT_BLUE_ACTIVE}
          />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 22,
    alignItems: "center",
  },
  item: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: 'row',
  },
  itemName: {
    flex: 1,
    textAlign: "center",
    fontWeight: "400",
    fontSize: 20,
    color: 'black',
  },
  textItem: {
    marginHorizontal: 8,
    fontWeight: "400",
    fontSize: 20,
    color: 'black',
  },
});

export default SettingItem;