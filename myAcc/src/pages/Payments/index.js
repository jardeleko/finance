import Moviments from '../../components/Moviments'
import Header from '../../components/Header'
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList 
} from 'react-native'
import { useEffect, useState } from 'react'
import publicRequest from '../../requestMethods'

export default function Payments() {
  const [datalist, setData] = useState({})
  useEffect(() => {
    const getData = async () => {
      publicRequest.get('/actions/stats').then((response) => {
        response?.data.map((data) => {
          if(data.value) data.value = parseFloat(data.value?.$numberDecimal)
          return
        })
        const boletos = response?.data.filter((filter) => {
            if(!filter.type && !filter.super){
                return filter 
            }
            return
        })
        setData(boletos)
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
  },[])
  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}> Últimas pagamentos </Text>
      <FlatList 
        style={styles.list}
        data={datalist}
        keyExtractor={(item) => String(item._id)}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Moviments data={item} />}
      />
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
