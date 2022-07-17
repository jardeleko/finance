import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    BackHandler
} from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import { Link, useNavigate } from 'react-router-native'

export default function Actions() {
  const navigate = useNavigate()
  
  BackHandler.addEventListener('hardwareBackPress', function () {
    navigate(-1)  
    return true
  })
  return (
    <ScrollView style={styles.container} horizontal={true} showsHorizontalScrollIndicator={false}>
      
      <TouchableOpacity style={styles.actionButton}>
        <Link to={'/create'}>
          <View style={styles.areaButton}>
              <AntDesign name="addfolder" size={26} color="#000"/>
          </View>
        </Link>
        <Text style={styles.labelButton}>Entradas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Link to={'/compras'}>
          <View style={styles.areaButton}>
              <AntDesign name="tagso" size={26} color="#000"/>
          </View>
        </Link>
        <Text style={styles.labelButton}>Compras</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
        <Link to={'/wallet'}>
          <View style={styles.areaButton}>
              <AntDesign name="creditcard" size={26} color="#000"/>
          </View>
        </Link>
        <Text style={styles.labelButton}>Carteira</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.actionButton}>
      <Link to={'/pay'}>
        <View style={styles.areaButton}>
            <AntDesign name="barcode" size={26} color="#000"/>
        </View>
      </Link>

        <Text style={styles.labelButton}>Boletos</Text>
      </TouchableOpacity>
    
    </ScrollView>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor:'#364d63',
      padding:10,
      paddingEnd:18,
      marginTop: -24,
      marginStart: 14,
      marginEnd:14,
      borderRadius:10,
      paddingTop:10,
      paddingBottom:12,
      zIndex:99,
      maxHeight: 100,
    },
    actionButton: {
      justifyContent:'center',
      borderRadius: 3,
      alignItems:'center',
      marginRight:32
    },
    areaButton: {
      opacity: 0.9,
      backgroundColor: "#fafafa",
      height:50,
      width:50,
      borderRadius: 30,
      justifyContent: 'center',
      alignItems: 'center'
    },
    labelButton: {
      marginTop:4,
      color:'white',
      textAlign:'center'
    }
})