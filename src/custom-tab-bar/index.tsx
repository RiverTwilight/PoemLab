import React from "react";
import {
  View,
  Text,
  Navigator,
  CoverView,
  CoverImage,
} from "@tarojs/components";
import { switchTab } from "@tarojs/taro";
import "./index.scss";

const list = [
  {
    pagePath: "/pages/index/index",
    text: "首页",
  },
  {
    pagePath: "/pages/createRoom/index",
    className: "centerItem"
  },
  {
    pagePath: "/pages/me/index",
    text: "我的",
  },
];

const TabBarItem = ({
  item,
  index,
  handleClick,
  isSelected,
}: {
  handleClick: (item, index) => void;
  isSelected: boolean;
  item: any;
  index: any;
}) => {
  return (
    <CoverView
      className={`tabBarItem ${item.className ? item.className : ""}`}
      onClick={() => handleClick(item, index)}
      data-path={item.pagePath}
      key={item.text}
    >
      {item.icon && item.icon}
      <CoverView
        style={{
          color: isSelected ? "rgba(0, 162, 0, 1)" : "rgba(0, 0, 0, 0.6)",
        }}
      >
        {item.text}
      </CoverView>
    </CoverView>
  );
};

const TabBottom = () => {
  return (
    <View
      style={{
        height: "1",
      }}
    />
  );
};
class CustomTabBar extends React.Component {
  state = {
    // 建立一个全局变量储存selectedIndex
    // 创建方法可以按照自己的方法或taro提供的示例
    // 当然没有这个全局变量也可以解决问题
    // selected: global.globalData.selectedIndex,
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  switchTab = (item, index) => {
    const url = item.pagePath;

    // global.globalData.selectedIndex = index;

    this.setState({ selected: index });

    switchTab({ url });
  };

  shouldComponentUpdate = (_nextProps, nextState) => {
    return this.state.selected !== nextState.selected;
  };

  render() {
    return (
      <CoverView className="tabBar">
        <CoverView />

        {list.map((item, index) => {
          const isSelected = this.state.selected === index;
          return (
            <TabBarItem
              item={item}
              index={index}
              isSelected={isSelected}
              handleClick={(item, index) => {
                switchTab({
                  url: item.pagePath
                })
              }}
            />
          );
        })}
        <TabBottom />
      </CoverView>
    );
  }
}

export default CustomTabBar;
