import PropTypes from 'prop-types';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default class Home extends React.Component {
  componentDidMount = () => {
    this.props.navigation.setOptions({
      title: 'Home Screen!',
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.navigate('chat', {
              name: 'John',
            })}
            title="Navigate to ChatScreen"
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
};
