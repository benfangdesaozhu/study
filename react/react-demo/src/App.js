import logo from './logo.svg'
import './App.css'
import { useState } from 'react'
import LifeCycleContainer15 from './components/LifeCycle15/LifeCycleContainer'
import LifeCycleContainer16 from './components/LifeCycle16/LifeCycleContainer'
import Test from './components/HooksDemo/test'
import TestFun from './components/HooksDemo/testfun'
function App() {
  const [user, setUser] = useState('dan')
  const changeName = () => {
    setUser('cjm')
  }
  return (
    <div className="App">
      {/* <LifeCycleContainer15></LifeCycleContainer15> */}
      <div>----------------------------------------</div>
      <LifeCycleContainer16></LifeCycleContainer16>
      <button onClick={changeName}>改名字{user}</button>
      <Test user={user}></Test>
      <TestFun user={user}></TestFun>
    </div>
  )
}

export default App
