/* eslint-disable prettier/prettier */
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEdit, faTimes} from '@fortawesome/free-solid-svg-icons';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {colors, fonts} from '../../utils';

const CardNotes = ({id, notesItem, navigation, removeData}) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate('Detail', {id: id})}>
      <View>
        <Text style={styles.notesText}>{notesItem.title}</Text>
      </View>
      <View style={styles.icon1}>
        <FontAwesomeIcon
          icon={faEdit}
          color={'yellow'}
          size={25}
          onPress={() => navigation.navigate('EditNotes', {id: id})}
        />
      </View>
      <View style={styles.icon2}>
        <FontAwesomeIcon
          icon={faTimes}
          color={'red'}
          size={25}
          onPress={() => removeData(id)}
        />
      </View>
    </TouchableOpacity>
  );
};

export default CardNotes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.green,
    borderRadius: 5,
    marginTop: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 7.11,
    elevation: 5,
    marginBottom: 5,
  },
  notesText: {
    fontFamily: fonts.primary.bold,
    fontSize: 20,
    color: colors.text.white,
  },
  icon1: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 20,
  },
  icon2: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginRight: 10,
  },
});
