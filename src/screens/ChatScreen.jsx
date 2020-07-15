import PropTypes from 'prop-types';
import React from 'react';
import {
  Button,
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { getMessages, postMessage } from '../services/api';
import background from '../assets/imgs/background.png';
import Compose from '../components/Compose';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    width: '100%',
  },
  listItem: {
    width: '70%',
    margin: 10,
    padding: 10,
    backgroundColor: 'white',
    borderColor: '#979797',
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
  },
  incomingMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#E1FFC7',
  },
});

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      messages: [],
    };
  }

  componentDidMount = () => {
    this.props.navigation.setOptions({
      title: `Chat with ${this.props.route.params.name}`,
    });

    this.unsubscribeGetMessages = getMessages(
      (snapshot) => {
        this.setState({
          messages: Object.values(snapshot.val()),
        });
      },
    );
  };

  componentWillUnmount = () => {
    this.unsubscribeGetMessages();
  };

  getMessageRow = (item) => (
    <View
      style={[
        styles.listItem,
        item.incoming
          ? styles.incomingMessage
          : styles.outgoingMessage,
      ]}
    >
      <Text>{item.message}</Text>
    </View>
  );

  render() {
    return (
      <ImageBackground
        style={styles.container}
        source={background}
      >
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => this.getMessageRow(item)}
          keyExtractor={(item, index) => `message-${index}`}
        />
        <Compose submit={postMessage} />
      </ImageBackground>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
