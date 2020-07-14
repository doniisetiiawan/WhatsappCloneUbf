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
      title: `Chat with ${this.props.route.params.name}`,
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            onPress={() => this.props.navigation.navigate('home')}
            title="Navigate to Home Screen"
          />
        </View>
      </View>
    );
  }
}

Home.propTypes = {
  navigation: PropTypes.objectOf(PropTypes.any).isRequired,
  route: PropTypes.objectOf(PropTypes.any).isRequired,
};
