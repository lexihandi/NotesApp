/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {Firebase} from '../../config';
import {colors, fonts} from '../../utils';

export default class Detail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
    };
  }

  componentDidMount() {
    Firebase.database()
      .ref('Notes/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let notesItem = {...data};

        this.setState({
          notes: notesItem,
        });
      });
  }

  render() {
    const {notes} = this.state;
    return (
      <View style={styles.page}>
        <View style={styles.wrapper}>
          <Text style={styles.title}>{notes.title} </Text>
          <Text style={styles.notes}>{notes.notes} </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.background, padding: 20},
  wrapper: {
    backgroundColor: colors.primary,
    flex: 1,
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 8,
  },
  title: {
    fontSize: 25,
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    marginBottom: 15,
    color: colors.text.white,
    marginTop: 5,
  },
  notes: {
    fontSize: 18,
    fontFamily: fonts.primary.normal,
    textAlign: 'left',
    marginTop: 10,
    color: colors.text.white,
  },
});
