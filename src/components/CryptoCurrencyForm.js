import React, { Component } from 'react';
import { View, TextInput, Modal, Text, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addOwnedCurrency, fetchDetailedData } from '../actions';
import Picker from './Picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MAIN_COLOR } from '../constants';

class CryptoCurrencyForm extends Component {
	constructor(props) {
		super(props);

		this.state = {
			text: '',
			currency: 'BTC',
      showPopup: false
		}
	}

	pickerItems = (item, i) => (<Picker.Item key={i} label={item.CoinName} value={item.Name} />)

	buttonClicked() {
    if (this.state.text == '') return false;

		Keyboard.dismiss();

		this.props.addOwnedCurrency({
			currency: this.state.currency,
			value: (+this.state.text).toFixed(6)
		});

    this.props.fetchDetailedData();
		this.textInput.clear();
		this.setState({text: ''});
	}

	render() {
		return (
			<View style={styles.container}>
        <View style={styles.formWrap}>
          <TextInput
            underlineColorAndroid='rgba(0,0,0,0)'
            ref={component => this.textInput = component}
            keyboardType = 'numeric'
            style={styles.input}
            placeholder='Set quantity'
            onChangeText={(text) => { this.setState({text})} } />
          <TouchableOpacity
            style={styles.currencyPicker}
            onPress={() => this.setState({showPopup: true})}>
            <Text style={styles.currencyPickerText}>{this.state.currency}</Text>
            <Icon name="caret-down" size={12} color="black" />
          </TouchableOpacity>
        </View>

        <Modal visible={this.state.showPopup} transparent={true}>
          <Picker
            filter={true}
            items={this.props.cryptoList.map(item => {
              return {...item, text: item.FullName}
            })}
            onPressItem={item => this.setState({currency: item.Name, showPopup: false})} />
        </Modal>

				<TouchableOpacity
          style={styles.button}
					onPress={this.buttonClicked.bind(this)}>
					<Text style={styles.buttonText}>SUBMIT</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

function mapStateToProps(state) {
  return {
    cryptoList: state.data.generalData
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addOwnedCurrency,
    fetchDetailedData
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CryptoCurrencyForm);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
    width: '90%',
		justifyContent: 'center'
	},
  currencyPicker: {
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#efefef',
    height: 50,
    width: '30%',
    justifyContent: 'center',
		alignItems: 'center'
  },
  currencyPickerText: {
    marginRight: 10
  },
	button: {
		marginTop: 15,
		width: '100%',
		height: 40,
		display: 'flex',
    borderRadius: 3,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: MAIN_COLOR,
	},
  buttonText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  },
	picker: {
		width: '40%',
		height: 50
	},
  formWrap: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
  },
	input: {
		fontSize: 16,
		width: '65%',
		height: 50,
    borderRadius: 3,
    backgroundColor: '#efefef',
		padding: 5,
    paddingLeft: 10,
	}
});
