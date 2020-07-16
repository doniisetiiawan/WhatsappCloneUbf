import PropTypes from 'prop-types';
import React from 'react';
import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import background from '../assets/imgs/background.png';
import Compose from '../components/Compose';
import {
  postMessageToServer,
  subscribeToGetMessagesFromServer,
  unSubscribeToGetMessagesFromServer,
} from '../actions';
import { getMessagesSelector } from '../reducers/messagesReducer';

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

class ChatScreen extends React.Component {
  componentDidMount = () => {
    this.props.navigation.setOptions({
      title: `Chat with ${this.props.route.params.name}`,
    });

    this.props.subscribeToGetMessagesFromServer();
  };

  componentWillUnmount = () => {
    this.props.unSubscribeToGetMessagesFromServer();
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
          data={this.props.messages}
          renderItem={({ item }) => this.getMessageRow(item)}
          keyExtractor={(item, index) => `message-${index}`}
        />
        <Compose submit={this.props.postMessageToServer} />
      </ImageBackground>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: getMessagesSelector(state),
  };
}

export default connect(mapStateToProps, {
  postMessageToServer,
  subscribeToGetMessagesFromServer,
  unSubscribeToGetMessagesFromServer,
})(ChatScreen);

ChatScreen.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
