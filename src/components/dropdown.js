import React from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

export const Dropdown = props => {
  const {uniqueCategories, isDropdownOpen, handleCategoryChange} = props;
  if (!isDropdownOpen) {
    return null;
  }

  return (
    <ScrollView style={styles.dropdown}>
      {Array.from(uniqueCategories).map((category, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => handleCategoryChange(category)}>
          <Text>{category}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  dropdown: {
    position: 'absolute',
    top: 40,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
    maxHeight: 200,
    zIndex: 2,
    overflow: 'scroll',
  },
});
