import React from 'react';
import { StyleSheet, Text, Modal, View, Button, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTargetCurrency, loadGeneralData, loadGeneralDataSuccess, loadGeneralDataFailure, fetchDetailedData, removeOwnedCurrency } from '../actions';
import Picker from './Picker';
import CryptoCurrencyForm from './CryptoCurrencyForm';
import CryptoList from './CryptoList';
import StatusDisplay from './StatusDisplay';
import { MAIN_COLOR } from '../constants'

class AppComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {showPopup: false}
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.loadGeneralData();
    fetch('https://www.cryptocompare.com/api/data/coinlist/')
      .then(res => res.json())
      .then(this.props.loadGeneralDataSuccess)
      .catch(this.props.loadGeneralDataFailure);
  }

  pickerItemClick = item => {
    this.props.setTargetCurrency(item.code);
    this.setState({showPopup: false});
    if (this.props.owned.length) this.props.fetchDetailedData();
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.header}>
            <Text style={styles.headerTitle}>COINFOLIO</Text>
        </View>

        <StatusDisplay>
          <View style={styles.currentCurrency}>
            <TouchableOpacity onPress={() => this.setState({showPopup: true})}>
              <Text style={styles.changeTargetText}>(Change target currency)</Text>
            </TouchableOpacity>
          </View>
        </StatusDisplay>

        <Modal visible={this.state.showPopup} transparent={true}>
          <Picker
            filter={true}
            items={this.props.realCurrencyList.map(item => {
              return {...item, text: `${item.name} (${item.code})`}
            })}
            onPressItem={this.pickerItemClick} />
        </Modal>

        <CryptoCurrencyForm />
        <CryptoList
          removeItem={this.props.removeOwnedCurrency}
          itemsList={this.props.owned} />

      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    targetCurrency: state.data.targetCurrency,
    generalData: state.data.generalData,
    realCurrencyList: state.data.realCurrencyList,
    loading: state.data.loadingGeneralData,
    owned: state.data.owned
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    removeOwnedCurrency,
    setTargetCurrency,
    loadGeneralData,
    loadGeneralDataSuccess,
    loadGeneralDataFailure,
    fetchDetailedData
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

const styles = StyleSheet.create({
  changeTargetText: {
    color: MAIN_COLOR,
    fontSize: 10
  },
  header: {
    backgroundColor: MAIN_COLOR,
    flexDirection: 'row',
    width: '100%',
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    color: 'white',
    letterSpacing: 2
  },
  currentCurrency: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
});
