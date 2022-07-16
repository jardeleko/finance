import React from 'react'
import Header from '../../components/Header'
import { 
    View,
    Text,
    SafeAreaView, 
    StyleSheet, 
    TextInput, 
    Button
} from "react-native"
import { Picker } from '@react-native-picker/picker'
import CheckBox from "expo-checkbox"
import publicRequest from '../../requestMethods'
import { useNavigate } from 'react-router-native'


export default function Create() {
  const [nameTarget, setText] = React.useState('')
  const [priceTarget, setValue] = React.useState('')
  const [selectedValue, setSelectedValue] = React.useState(false)
  const [agree, setAgree] = React.useState(false)
  const history = useNavigate()  
  const submitForm = async () => {
    await publicRequest.post('/actions/create', 
      {
        transaction:nameTarget, 
        value:priceTarget, 
        type:selectedValue, 
        super:agree
      }
    ).then((res) => {
      console.log(res.data)
      history('/')
    }).catch((err) => {
      console.log(err)
    })
  }

  return (<>
    <Header />
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Agua, luz, outros.."
          placeholderTextColor="#fafafa" 
          onChangeText={setText}
        />
        <TextInput
          style={styles.input}
          onChangeText={setValue}
          placeholder="Valor 199.00"
          placeholderTextColor="#fafafa" 
          />
          <View style={styles.boxSelection}>
              <Picker
                  selectedValue={selectedValue}
                  style={{ height: 50, width: 150, color:'white'}}
                  onValueChange={(itemValue) => setSelectedValue(itemValue)}
              >
                  <Picker.Item label="Tipo" selectedValue/>
                  <Picker.Item label="Entradas" value={true} />
                  <Picker.Item label="Pagamentos" value={false} />
              </Picker>
              <Text style={styles.editText}>Super</Text>
              <CheckBox style={styles.checkbox}
                  value={agree}
                  onValueChange={() => setAgree(!agree)}
                  color={agree ? "#4630EB" : undefined}
              />
          </View>   
          <View style={styles.buttonCreate}>
            <Text style={styles.buttonResize} onPress={submitForm}> Adicionar </Text>
          </View>
       
      </SafeAreaView>
    </View>
    </>)
}

const styles = StyleSheet.create({
    wrapper: {
      flex: 1,
      backgroundColor: '#232323',
    },  
    container: {
      margin: 14,
    },
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        color:'#fafafa',
        borderTopColor: '#232323',
        borderLeftColor: '#232323',
        borderRightColor: '#232323',
        borderBottomColor: 'coral'
  },
  boxSelection: {
    display: 'flex',
    flexDirection:'row',
    fontSize:10
  },
  checkbox:{
    marginTop:20,
    marginLeft:20,
  },
  editText:{
    margin: 20,
    color: 'white'
  },
  buttonResize: {
    padding: 8,
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 16,
    color:'black',
    backgroundColor: '#ebab34',
  }
});

