import { Component } from "react";
import { cloud } from "@tarojs/taro"
import "./app.scss";

class App extends Component {
  componentDidMount() { }

  componentDidShow() { }

  componentDidHide() { }

  onLaunch = () => {
    cloud.init({
      env: cloud.DYNAMIC_CURRENT_ENV
    })
  }

  componentDidCatchError() { }

  // this.props.children 是将要会渲染的页面
  render() {
    return this.props.children;
  }
}

export default App;
