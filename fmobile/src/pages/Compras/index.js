import Moviments from '../../components/Moviments'
import Header from '../../components/Header'
import { 
  StyleSheet, 
  Text, 
  View, 
  FlatList,
  RefreshControl
} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import publicRequest from '../../requestMethods'
import { useNavigate } from 'react-router-native'

export default function Compras() {
  const [datalist, setData] = useState({})
  const [refreshing, setRefreshing] = useState(false);
  const history = useNavigate()
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
      history(0)
    }, 1000);
  }, []);

  useEffect(() => {
    const getData = async () => {
      publicRequest.get('/actions/stats').then((response) => {
        response?.data.map((data) => {
          if(data.value) data.value = parseFloat(data.value?.$numberDecimal)
          return
        })
        const compras = response?.data.filter((filter) => {
            if(filter.super){
                return filter.super 
            }
            return
        })
        setData(compras)
      }).catch((err) => {
        console.log(err)
      })
    }
    getData()
    if(refreshing) getData()
  },[refreshing])

  return (
    <View style={styles.container}>
      <Header />
      <Text style={styles.title}> Últimas Compras </Text>
      <FlatList 
        style={styles.list}
        data={datalist}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
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
    marginLeft: 20,
    marginStart: 14,
    marginEnd: 14,
  }
});
