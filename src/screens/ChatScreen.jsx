import PropTypes from 'prop-types';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
} from 'react-native';
import { getMockData } from '../services/api';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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

    getMockData().then((messages) => {
      this.setState({
        messages,
      });
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text>Chat with John</Text>
        </View>
        <FlatList
          data={this.state.messages}
          renderItem={({ item }) => (
            <View>
              <Text>{item.message}</Text>
            </View>
          )}
          keyExtractor={(item, index) => `message-${index}`}
        />
        <Button
          onPress={() => this.props.navigation.goBack()}
          title="Navigate to Home Screen"
        />
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
