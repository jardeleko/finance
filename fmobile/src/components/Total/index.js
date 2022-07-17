import { 
    View, 
    Text, 
    StyleSheet 
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { AntDesign } from '@expo/vector-icons'
import publicRequest from '../../requestMethods'

export default function Total() {
    const [saldo, getSaldo] = useState('')
    const [gastos, getGastos] = useState('')

    useEffect(() => {
        const getValues = async () => {
            await publicRequest.get('/actions/stats').then((response) => {
                const inp = response.data.filter((filter) => {
                    if(filter.value && filter.type){
                        return filter.value 
                    }
                    return
                })
                const out = response?.data.filter((filter) => {
                    if(filter.value && !filter.type){
                        return filter.value 
                    }
                    return
                })
                
                const setterIn = inp?.map((item) => {
                    return parseFloat(item.value.$numberDecimal)
                })

                const setterOut = out?.map((item) => {
                    return parseFloat(item.value.$numberDecimal)
                })
                let sum = 0
                for (let i = 0; i < setterIn.length; i++) {
                    sum = sum + setterIn[i]

                }
                let dec = 0
                for (let i = 0; i < setterOut.length; i++) {
                    dec = dec + setterOut[i]

                }
                getSaldo((sum-dec).toFixed(2))
                getGastos((dec).toFixed(2))

            }).catch((err) => {
                console.log(JSON.stringify(err))
            })
        }
        getValues()
    },[])
    return (
        <View style={styles.container}>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Saldo <AntDesign name='rocket1' size={23} color={'coral'}/></Text>
                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.balance}>{saldo}</Text>
                </View>
            </View>

            <View style={styles.item}>
                <Text style={styles.itemTitle}>Gastos <AntDesign name='dislike1' size={23} color={'purple'}/></Text>
                <View style={styles.content}>
                    <Text style={styles.currencySymbol}>R$</Text>
                    <Text style={styles.expenses}>{gastos}</Text>
                </View>
            </View>
            
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor:'#dadada',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:18,
        paddingEnd:18,
        margin: 14,
        borderRadius:4,
        paddingTop:22,
        paddingBottom:80,
        zIndex:99,
    },
    itemTitle: {
        marginTop: 20,
        fontSize:20,
        color:'black',
        
    },
    content: {
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center'
    },
    currencySymbol: {
        color: 'gray',
        marginRight: 6,
    },
    balance: {
        fontSize:22,
        color:'#4a913f'
    },
    expenses: {
        fontSize: 22,
        color: '#de6868'
    }
})