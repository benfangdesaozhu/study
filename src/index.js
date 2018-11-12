import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import './index.css';

class Title extends Component {
  render () {
    return (
      <div>React 小书</div>
    )
  }
}

class Header extends Component {
  render () {
    return <div className='m-header'>
      react小书
    </div>
  }
}
class Main extends Component {
  render () {
    return <div className='m-main'>
      内容部分
    </div>
  }
}
class Bottom extends Component {
  render () {
    return <div className="m-bottom">
      底部
    </div>
  }
}
class LikeButton extends Component {
 constructor () {
   super()
   this.state = {isLiked: false}
 }
 handleClick () {
   console.log(this.state.isLiked)
   this.setState({
     isLiked: !this.state.isLiked
   })
   console.log(this.state.isLiked)
 }
 render () {
   return <button onClick = {this.handleClick.bind(this)}>
     {this.state.isLiked ? '取消' : '点赞'} 👍
   </button>
 }
}

class Content extends Component {
  // constructor(props) {
  //   super(props);
  //   this.handleClickOnTitle = this.handleClickOnTitle.bind(this);
  // }
  handleClickOnTitle (e) {
    console.log(e.target)
    console.log('Click on title.', this)
  }
  render () {
    console.log(this)
    console.log(Component)
    return <div>
      <Title/>
      <Header/>
      <Main/>
      <Bottom/>
      <LikeButton/>
      <button onClick={this.handleClickOnTitle.bind(this)}>
        Click me
      </button>
    </div>
  }
}
ReactDOM.render(<Content />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
