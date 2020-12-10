/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {StyleSheet, View, TouchableOpacity, Text, Alert} from 'react-native';
import {colors, fonts} from '../../utils';
import {Input} from '../../components';
import {Firebase} from '../../config';

export default class EditNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      notes: '',
    };
  }

  onChangeText = (nameState, value) => {
    this.setState({
      [nameState]: value,
    });
  };

  componentDidMount() {
    Firebase.database()
      .ref('Notes/' + this.props.route.params.id)
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let notesItem = {...data};

        this.setState({
          title: notesItem.title,
          notes: notesItem.notes,
        });
      });
  }

  onSubmit = () => {
    if (this.state.title && this.state.notes) {
      const notesReference = Firebase.database().ref(
        'Notes/' + this.props.route.params.id,
      );
      const notes = {
        title: this.state.title,
        notes: this.state.notes,
      };

      notesReference
        .update(notes)
        .then((data) => {
          Alert.alert('Success', 'Your notes is updated');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          Alert.alert('Error', error);
        });
    } else {
      Alert.alert('Oops', 'Mohon lengkapi catatan Anda');
    }
  };

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.wrapper}>
          <Input
            title="Title"
            placeholder="Input your title"
            onChangeText={this.onChangeText}
            value={this.state.title}
            nameState="title"
          />
          <Input
            title="Add Notes"
            placeholder="Input your notes"
            textArea={true}
            onChangeText={this.onChangeText}
            value={this.state.notes}
            nameState="notes"
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={() => this.onSubmit()}>
          <Text style={styles.textBtn}>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonCancel}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Text style={styles.textBtnCancel}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  wrapper: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    padding: 10,
    marginTop: 30,
  },
  button: {
    backgroundColor: colors.green,
    borderRadius: 5,
    padding: 10,
    marginTop: 25,
  },
  buttonCancel: {
    backgroundColor: colors.white,
    borderRadius: 5,
    padding: 10,
    marginTop: 15,
  },
  textBtn: {
    color: '#f8f8ff',
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
  textBtnCancel: {
    color: '#000',
    fontFamily: fonts.primary.bold,
    textAlign: 'center',
    alignItems: 'center',
    fontSize: 18,
  },
});
