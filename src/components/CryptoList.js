import React from 'react';
import { Text, View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CryptoList = ({itemsList, removeItem}) => {

  renderItem = ({item, index}) => (
    <View style={styles.item}>
      <Text style={styles.itemValue}>{item.value}</Text>
      <Text style={styles.itemCurrency}>{item.currency}</Text>
      <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
        <Icon name="trash-o" size={16} color="#888" />
      </TouchableOpacity>
    </View>
  )

	return (
    <View style={styles.list}>
      <Text style={styles.title}>Owned Currencies List:</Text>
      <View style={styles.separator} />
      <FlatList
        ListEmptyComponent={<Text style={{marginTop: 5}}>Add more currencies in form above.</Text>}
        data={itemsList}
        removeClippedSubviews={false}
        keyExtractor={(item, index) => index}
        renderItem={this.renderItem} />
    </View>
	)
}

export default CryptoList;

const styles = StyleSheet.create({
  removeButton: {
    position: 'absolute',
    right: 10
  },
  title: {
    color: '#bbb',
    fontSize: 12,
    marginBottom: 5,
    fontWeight: 'bold'
  },
  separator: {
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
  },
	list: {
    paddingBottom: 30,
    flex: 1,
    width: '90%',
    marginTop: 20
	},
	item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#efefef',
    borderBottomWidth: 2,
    borderBottomColor: '#ddd'
	},
  itemValue: {

  },
  itemCurrency: {
    marginLeft: 10,
    fontWeight: 'bold'
  }
})
