import { 
    View, 
    Text, 
    SafeAreaView, 
    TextInput, 
    StyleSheet 
} from 'react-native'
import { useEffect, useState } from 'react'
import publicRequest from '../../requestMethods'
import { useNavigate } from 'react-router-native'

export default function User() {
    const [name, setName] = useState('')
    const [email, setMail] = useState('')
    const [phone, setPhone] = useState('')
    const [user, setUser] = useState({})
    const history = useNavigate()
    if(name == ('')) {
        setName(user.name) 
    }
    if(email == ('')) { 
        setMail(user.email)
    }
    if(phone == ('')) {
        setPhone(user.phone)
    }
    const result = {name, email, phone}

    const submitForm = async () => {
        await publicRequest.put('/users/62d04cfeb16aa6a37d733abe', result).then((response) => {
            history('/')
        }).catch((err) => {
            console.log(err)
        })
    }
    
    useEffect(() => {
        const getUser = async () => {
            await publicRequest.get('/users/find/62d04cfeb16aa6a37d733abe').then((res) => {
                setUser(res.data)
            }).catch((err) => {
                console.log(err)
            })
        }
        getUser()
    },[])
    return (
        <View style={styles.wrapper}>
        <Text style={styles.legend}>Atualização de cadastro</Text>
            <SafeAreaView style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder={user.name}
                    placeholderTextColor="#fafafa" 
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setMail}
                    placeholder={user.email}
                    placeholderTextColor="#fafafa" 
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setPhone}
                    placeholder={user.phone}
                    placeholderTextColor="#fafafa" 
                />
                <View style={styles.buttonCreate}>
                    <Text style={styles.buttonResize} onPress={submitForm}> Enviar </Text> 
                </View>
            </SafeAreaView>
        </View>
    )
}


const styles = StyleSheet.create({
    wrapper: {
        marginTop: 20,
        marginLeft: 14,
        marginRight: 14,
        marginBottom: 0,
        paddingHorizontal: 10,
        paddingBottom: 10,
        borderRadius: 4,
        borderWidth: 0.2,
    },
    legend:{
        fontSize:16,
        position: 'absolute',
        top: -10,
        left: 20,
        fontWeight: 'bold',
        color:'coral',
        backgroundColor: '#232323'
    },
    container:{
        marginTop:10,
        height: 500,
        backgroundColor: '#232323'
    },
    input: {
        height: 40,
        margin: 15,
        borderWidth: 1,
        padding: 10,
        color:'#fafafa',
        borderTopColor: '#232323',
        borderLeftColor: '#232323',
        borderRightColor: '#232323',
        borderBottomColor: 'coral'
  },

  editText:{
    fontSize:20,
    textAlign:'center',
    color: 'coral', 
  },
  buttonCreate:{
    margin: 14,
    marginTop:30
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

