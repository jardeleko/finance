// import { runOnJS } from 'react-native-reanimated' 
import Home from './src/pages/Home'
import Create from './src/pages/Createnew'
import Compras from './src/pages/Compras'
import Wallet from './src/pages/Wallet'
import Payments from './src/pages/Payments'
import Profile from './src/pages/Profile'
import { NativeRouter, Route, Routes } from "react-router-native"

export default function App() {
  return (
    <NativeRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/compras" element={<Compras />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/pay" element={<Payments />} /> 
        <Route path="/profile" element={<Profile />}/>
      </Routes>
    </NativeRouter>
  )
}

