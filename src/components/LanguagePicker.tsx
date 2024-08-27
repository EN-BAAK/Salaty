import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from "react-native";
import colors from "../misc/colors";
import { useDataContext } from "../context/DataProvider";

const translator = require('../../assets/languages.json');

const LanguagePicker = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { language, editLanguage } = useDataContext();
  const validLanguages = [
    { id: 'en', name: 'English' },
    { id: 'ar', name: 'العربية' },
  ];

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.square}>
          <Text style={styles.text}>{translator[language]['language']}</Text>
        </View>
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          {validLanguages.map((lang) => (
            <TouchableOpacity
              key={lang.id}
              style={styles.languageItem}
              onPress={() => {
                editLanguage(lang.id);
                setModalVisible(false);
              }}
            >
              <Text style={styles.textLang}>{lang.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    backgroundColor: 'lightblue',
    width: 120,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.FONT_BLUE_ACTIVE,
  },
  modalContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  languageItem: {
    backgroundColor: colors.APP_BG,
    width: 100,
    marginBottom: 25,
    paddingVertical: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  textLang: {
    fontSize: 22,
    color: colors.FONT_BLUE_LIGHT
  }
});

export default LanguagePicker;