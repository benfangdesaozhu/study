import React from 'react'
import ReactDOM from 'react-dom'
// 定义子组件
class LifeCycle extends React.Component {
  constructor(props) {
    console.log('进入constructor')
    super(props)
    // state 可以在 constructor 里初始化
    this.state = { text: '子组件的文本' }
  }
  // 初始化渲染时调用
  componentWillMount() {
    console.log('componentWillMount方法执行,render方法前触发')
  }
  // 初始化渲染时调用
  componentDidMount() {
    console.log('componentDidMount方法执行，真是dom的操作。异步请求，数据初始化可以放在这个生命周期操作')
  }
  // 父组件修改组件的props时会调用
  componentWillReceiveProps(nextProps) {
    // 父组件的更新。会触发这个生命周期的执行
    console.log('componentWillReceiveProps方法执行')
  }
  // 组件更新时调用
  shouldComponentUpdate(nextProps, nextState) {
    // 这个生命周期的返回值决定是否执行之后的生命周期，进而决定是否对组件进行re-render（重新渲染）。默认为true。false就不执行之后的生命周期
    console.log('shouldComponentUpdate方法执行')
    return false
  }
  // 组件更新时调用
  componentWillUpdate(nextProps, nextState) {
    console.log('componentWillUpdate方法执行, render前执行')
  }
  // 组件更新后调用
  componentDidUpdate(preProps, preState) {
    console.log('componentDidUpdate方法执行，组件更新完毕后被触发，和componentDidMount类似，这个生命周期经常用来处理dom操作')
  }
  // 组件卸载时调用
  componentWillUnmount() {
    // 如果子组件从父组件中移出，或者子组件的key发生改变。此时组件就要被卸载
    // 里面不能操作state,用来解绑事件，删除定时器
    console.log('子组件的componentWillUnmount方法执行')
  }
  // 点击按钮，修改子组件文本内容的方法
  changeText = () => {
    this.setState({
      text: '修改后的子组件文本'
    })
  }
  render() {
    // render方法在执行过程中，不会去操作真实的dom，返回对应的虚拟dom
    // 真实dom的渲染工作，是在挂载阶段由ReactDom.render来承接的
    console.log('render方法执行')
    return (
      <div className="container">
        <button onClick={this.changeText} className="changeText">
          修改子组件文本内容
        </button>
        <p className="textContent">{this.state.text}</p>
        <p className="fatherContent">{this.props.text}</p>
      </div>
    )
  }
}
export default LifeCycle
