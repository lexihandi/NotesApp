/* eslint-disable prettier/prettier */
import React, {Component} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {colors, fonts} from '../../utils';
import {Firebase} from '../../config';
import {CardNotes} from '../../components';

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: {},
      notesKey: [],
    };
  }

  componentDidMount() {
    this.takeData();
  }

  takeData = () => {
    Firebase.database()
      .ref('Notes')
      .once('value', (querySnapShot) => {
        let data = querySnapShot.val() ? querySnapShot.val() : {};
        let notesItem = {...data};

        this.setState({
          notes: notesItem,
          notesKey: Object.keys(notesItem),
        });
      });
  };

  removeData = (id) => {
    Alert.alert(
      'Warning',
      'Are you sure to delete it?',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            Firebase.database()
              .ref('Notes/' + id)
              .remove();
            this.takeData();
            Alert.alert('Success', 'Your note is deleted');
          },
        },
      ],
      {cancelable: false},
    );
  };

  render() {
    const {notes, notesKey} = this.state;
    return (
      <View style={styles.page}>
        <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
          <View style={styles.title}>
            <Text style={styles.textTitle}>Welcome and Lets Productive</Text>
          </View>
          <View style={styles.line} />
          <View style={styles.card}>
            {notesKey.length > 0 ? (
              notesKey.map((key) => (
                <CardNotes
                  key={key}
                  notesItem={notes[key]}
                  id={key}
                  {...this.props}
                  removeData={this.removeData}
                />
              ))
            ) : (
              <Text>Empty List</Text>
            )}
          </View>
        </ScrollView>
        <View style={styles.wrapperBtn}>
          <TouchableOpacity
            style={styles.btnPlus}
            onPress={() => this.props.navigation.navigate('AddNotes')}>
            <FontAwesomeIcon icon={faPlus} size={25} color={'#f8f8ff'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  page: {flex: 1, backgroundColor: colors.background, padding: 15},
  wrapperBtn: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    right: 0,
    margin: 45,
  },
  card: {marginBottom: 20},
  scroll: {flex: 1},
  line: {borderWidth: 1, borderColor: '#000'},
  btnPlus: {
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 90 / 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 8,
    alignItems: 'center',
  },
  textBtn: {color: colors.text.white, fontFamily: fonts.primary[300]},
  textTitle: {
    fontFamily: fonts.primary.bold,
    fontSize: 18,
    color: colors.text.black,
    padding: 10,
  },
});
