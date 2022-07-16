import Balance from '../../components/Balance'
import Header from '../../components/Header'
import { 
  StyleSheet, 
  View, 
} from 'react-native'


export default function Wallet() {
  return (
    <View style={styles.container}>
      <Header />
      <Balance />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: 'black',
    backgroundColor: '#232323'
  },
  title: {
    fontSize:14,
    color: 'white',
    fontWeight:'bold',
    margin:14,
  }, 
  list: {
    marginStart: 14,
    marginEnd: 14,
  }
});
