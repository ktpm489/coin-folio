import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { map } from 'lodash';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { loadDetailedData, loadDetailedDataSuccess, loadDetailedDataFailure } from '../actions';

class StatusDisplay extends Component {
	constructor(props) {
		super(props)
  }

  numberWithSpaces(x) {
    let parts = x.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    return parts.join(".");
  }

  calculate() {
    let sum = 0;

		this.props.owned.forEach(currency => {
			const singleVal = this.props.convertedPrices
        .find(crypto => crypto.from === currency.currency);

        sum += (singleVal) ? currency.value * singleVal.to[this.props.targetCurrency] : 0;
		});

		return this.numberWithSpaces(sum.toFixed(2));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Current estimated value</Text>
        <Text style={styles.large}>{this.props.convertedPrices.length ? this.calculate() : '0.00'} {this.props.targetCurrency}</Text>
        {this.props.children}
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    owned: state.data.owned,
    targetCurrency: state.data.targetCurrency,
    generalData: state.data.generalData,
    convertedPrices: state.currencies.convertedPrices
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loadDetailedData,
    loadDetailedDataSuccess,
    loadDetailedDataFailure
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(StatusDisplay);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		alignItems: 'center',
		margin: 20,
	},
	large: {
		fontSize: 30
	}
});
