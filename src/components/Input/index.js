/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, StyleSheet, TextInput} from 'react-native';
import {colors, fonts} from '../../utils';

const Input = ({
  title,
  placeholder,
  textArea,
  onChangeText,
  nameState,
  value,
}) => {
  if (textArea) {
    return (
      <>
        <Text style={styles.label}>{title}</Text>
        <TextInput
          multiline={true}
          numberOfLines={10}
          style={styles.textInputArea}
          placeholder={placeholder}
          textArea={textArea}
          value={value}
          onChangeText={(text) => onChangeText(nameState, text)}
        />
      </>
    );
  }

  return (
    <>
      <Text style={styles.label}>{title}</Text>
      <TextInput
        style={styles.textInput}
        placeholder={placeholder}
        textArea={textArea}
        value={value}
        onChangeText={(text) => onChangeText(nameState, text)}
      />
    </>
  );
};

export default Input;

const styles = StyleSheet.create({
  textInput: {
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.white,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
  },
  textInputArea: {
    textAlignVertical: 'top',
    fontSize: 16,
    fontFamily: fonts.primary.normal,
    color: colors.text.white,
    marginBottom: 20,
    borderWidth: 0.5,
    borderColor: colors.gray,
    borderRadius: 5,
    padding: 10,
  },
  label: {
    color: colors.text.white,
    fontSize: 18,
    fontFamily: fonts.primary[600],
    marginBottom: 5,
  },
});
