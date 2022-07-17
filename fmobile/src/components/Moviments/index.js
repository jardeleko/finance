import {React, useState} from 'react'
import { 
    View, 
    Text, 
    StyleSheet,
    TouchableOpacity, 
    Alert,
} from 'react-native'
import { Entypo } from '@expo/vector-icons'
import format from 'dateformat'
import publicRequest from '../../requestMethods'
import { AnimatePresence, MotiText } from 'moti'

export default function Moviments({data}) {
    const [showValue, setShowValue] = useState(false) 

    const createTwoButtonAlert = async (event) =>{
        Alert.alert(
        "Apagar registro",
        `${event.transaction}`,
        [
            {
            text: "Cancelar",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
            },
            { text: "OK", onPress: async () => {
                await publicRequest.delete(`/actions/${event._id}`).then(() => {
                }).catch((err) => {
                    console.log(err)
                })
            }
            }
        ]
        )
    }
    return (
    <TouchableOpacity style={styles.container} onLongPress={(e) => createTwoButtonAlert(data)}>
        <Text style={styles.createdAt}></Text>
        <View style={styles.content}> 
            <Text style={styles.label}>{data.transaction}</Text>
            <TouchableOpacity onPress={() => setShowValue(!showValue)}>
                {showValue ? (
                <AnimatePresence exitBeforeEnter>
                    <MotiText 
                        style={data.type === true ? styles.value : styles.expenses}
                        from={{translateX:100}}
                        animate={{translateX:0}}
                        transition={{type:"timing", duration:500}}
                    >
                            
                        {data.type === true ? `R$ ${data.value}` : `R$ -${data.value}` }
                    </MotiText>
                </AnimatePresence>
                ) : (
                <AnimatePresence exitBeforeEnter>        
                    <Text style={styles.skeleton}> Display <Entypo name="eye" size={16} color="#343434" /></Text>
                </AnimatePresence>    
                )}
            </TouchableOpacity>
        </View>
        
        <Text style={styles.buyAt}>{format(data.createdAt, "dd/mmm,  yyyy")}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#232323',
        borderRadius: 20,
        flex:1,
        marginBottom: 24,
        borderBottomWidth: 0.5,
        borderBottomColor: 'teal',
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 2,
        marginBottom: 8
    },
    date: {
        color: '#dadada',
        fontWeight:'bold'
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color:'#dadada'
    },
    value: {
        fontSize: 16,
        color: '#2ecc71',
        fontWeight: 'bold'
    },
    expenses: {
        fontSize:16,
        color:'#de6868',
        fontWeight: 'bold'
    },
    skeleton: {
        padding: 6,
        color: '#343434',
        backgroundColor: '#dadada',
        borderRadius: 6,
    },
    buyAt: {
        marginLeft:14,
        color: 'white'
    },
    displayTxt:{
        color: 'black'
    }

})