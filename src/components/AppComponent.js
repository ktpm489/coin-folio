import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setTargetCurrency, loadGeneralData, loadGeneralDataSuccess, loadGeneralDataFailure } from '../actions';
import Picker from './PickerComponent';

class AppComponent extends React.Component {

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

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.props.targetCurrency}</Text>
        <Picker filter={true} items={this.props.generalData} />
      </View>
    )
  }
}

function mapStateToProps(state) {
  return {
    targetCurrency: state.data.targetCurrency,
    generalData: state.data.generalData,
    loading: state.data.loadingGeneralData
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setTargetCurrency,
    loadGeneralData,
    loadGeneralDataSuccess,
    loadGeneralDataFailure
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(AppComponent);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
