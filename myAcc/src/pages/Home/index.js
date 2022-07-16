import Moviments from '../../components/Moviments'
import Actions from '../../components/Actions'
import Header from '../../components/Header'
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList 
} from 'react-native'
import { useEffect, useState } from 'react'
import publicRequest from '../../requestMethods'

export default function Home() {
  const [datalist, setData] = useState({})
  useEffect(() => {
    const getData = async () => {
      await publicRequest.get('/actions/last').then((response) => {
        response?.data.map((filter) => {
          if(filter.value) filter.value = parseFloat(filter.value?.$numberDecimal)
          return
        })
        setData(response.data)
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
  },[])

  return (
    <View style={styles.container}>
      <Header />
      <View>
        <Actions />
      </View>
        <Text style={styles.title}> Últimas movimentações </Text>
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
