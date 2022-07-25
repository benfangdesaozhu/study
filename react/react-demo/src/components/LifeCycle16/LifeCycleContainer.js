import React from 'react'
import LifeCycle from './lifeCycle'
// 定义 LifeCycle 组件的父组件

class LifeCycleContainer extends React.Component {
  // state 也可以像这样用属性声明的形式初始化

  state = {
    text: '父组件的文本',

    hideChild: false
  }

  // 点击按钮，修改父组件文本的方法

  changeText = () => {
    this.setState({
      text: '修改后的父组件文本'
    })
  }

  // 点击按钮，隐藏（卸载）LifeCycle 组件的方法

  hideChild = () => {
    this.setState({
      hideChild: true
    })
  }
  // 初始化渲染时调用

  componentDidMount() {
    console.log('父====componentDidMount方法执行')
  }

  // 组件更新时调用

  shouldComponentUpdate(prevProps, nextState) {
    console.log('父====shouldComponentUpdate方法执行')

    return true
  }

  // 组件更新时调用

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('父====getSnapshotBeforeUpdate方法执行')

    return 'haha'
  }

  // 组件更新后调用

  componentDidUpdate(preProps, preState, valueFromSnapshot) {
    console.log('父====componentDidUpdate方法执行')

    console.log('父====从 getSnapshotBeforeUpdate 获取到的值是', valueFromSnapshot)
  }

  // 组件卸载时调用

  componentWillUnmount() {
    console.log('父====子组件的componentWillUnmount方法执行')
  }

  render() {
    console.log('父====render')
    return (
      <div className="fatherContainer">
        <button onClick={this.changeText} className="changeText">
          修改父组件文本内容
        </button>

        <button onClick={this.hideChild} className="hideChild">
          隐藏子组件
        </button>

        {this.state.hideChild ? null : <LifeCycle text={this.state.text} />}
      </div>
    )
  }
}
export default LifeCycleContainer
