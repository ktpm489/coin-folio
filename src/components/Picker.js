import React, { Component } from 'react';
import { StyleSheet, FlatList, View, Text, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';

const Filter = ({onChangeText}) => (
  <View style={[styles.pickerItem, styles.filter]}>
    <TextInput
      underlineColorAndroid='rgba(0,0,0,0)'
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

  pickerFilter = item => item.text.toLowerCase().includes(this.state.text.toLowerCase());

  renderItem = ({item}) => (
    <TouchableHighlight
      underlayColor="#ddd"
      style={styles.pickerItem}
      onPress={() => this.props.onPressItem(item)}>
      <Text style={{textAlign: 'center'}}>{item.text}</Text>
    </TouchableHighlight>
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
  filter: {
    width: '80%',
    backgroundColor: '#ddd'
  },
  input: {
    width: '100%',
    height: 40,
    fontSize: 14,
    padding: 5,
    paddingLeft: 10,
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
    backgroundColor: '#efefef',
    width: '80%'
  },
  pickerItem: {
    width: '100%',
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#efefef',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd',
    paddingLeft: 5,
    paddingRight: 5
  }
})
