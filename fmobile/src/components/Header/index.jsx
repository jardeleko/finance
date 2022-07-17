import React, { useEffect, useState } from 'react'
import {
    View,
    StyleSheet,
    Text,
    StatusBar,
    TouchableOpacity,
}
from 'react-native'
import { Feather } from '@expo/vector-icons'
import { Link } from 'react-router-native'
import publicRequest from '../../requestMethods'
import { MotiText, MotiView } from 'moti'
import { timing } from 'react-native-reanimated'

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;
export default function Header() {
    const [user, setUser] = useState('')
    useEffect(() => {
      const getUser = async () => {
        await publicRequest.get('/users/find/62d04cfeb16aa6a37d733abe').then((reponse) => {
          setUser(reponse.data)
        }).catch((error) => {
          console.log("this errror:" + JSON.stringify(error))
        })
      }
      getUser()
    },[])  

    return (
        <View style={styles.container}>
            <MotiView 
                style={styles.content}
                from={{
                    translateY: -150,
                    opacity: 0,
                }}
                animate={{
                    translateY: 0,
                    opacity: 1,
                }}
                transition={{
                    type: "spring",
                    duration: 800,
                    delay:400
                }}
                >
                <MotiText 
                    style={styles.username}
                    from={{translateX: -300}}
                    animate={{translateX: 0}}
                    transition={{
                        type: "timing",
                        duration: 800,
                        delay:800
                    }}
                >   {user.name}</MotiText>
                    <View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.buttonUser}>
                        <Link to={'/profile'}>
                            <Feather name='user' size={33} color='#fff'/>
                        </Link>
                    </TouchableOpacity>
                    </View>

            </MotiView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: statusBarHeight,
        backgroundColor: '#069acc',
        flexDirection:'row',
        paddingEnd:16,
        paddingBottom:44,
    },
    content: {
        flex:1,
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'space-between'
    },
    username: {
        marginLeft: 8,
        fontSize: 18,
        color: '#fff',
        fontWeight:'bold',
    },
    buttonUser: {
        width: 50,
        height: 50,
        backgroundColor:'rgba(255,255,255,0.5)',
        justifyContent:'center',
        alignItems:'center',
        borderRadius: 22/2,
    }
})