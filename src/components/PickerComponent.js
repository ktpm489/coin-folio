import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput } from 'react-native';


const Filter = ({onChangeText}) => (
  <View style={[styles.pickerItem, {width: '80%'}]}>
    <TextInput
      style={styles.input}
      placeholder='Filter items...'
      onChangeText={onChangeText} />
  </View>
)

class Picker extends Component {
  constructor(props) {
    super(props)

    this.state = {text: ''}
  }

  keyExtractor = (item, index) => index;

  pickerFilter = item => item.FullName.toLowerCase().includes(this.state.text.toLowerCase());

  renderItem = ({item}) => (
     <View style={styles.pickerItem}>
      <Text>{item.FullName}</Text>
    </View>
  )

  render() {
    return (
      <View style={styles.wrapper}>
        {this.props.filter && (<Filter onChangeText={text => this.setState({text})} />)}
        <FlatList
          getItemLayout={(data, index) => (
            {length: 60, offset: 60 * index, index}
          )}
          removeClippedSubviews={false}
          style={styles.flatList}
          data={this.props.items.filter(this.pickerFilter.bind(this))}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem} />
      </View>
    )
  }
}

export default Picker;

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    fontSize: 14,
    padding: 5
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 50,
    zIndex: 1
  },
  flatList: {
    width: '80%'
  },
  pickerItem: {
    width: '100%',
    minHeight: 60,
    borderWidth: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  }
})
