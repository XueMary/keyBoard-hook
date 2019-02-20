## 简介
添加 虚拟键盘 显示 隐藏事件

### 使用

```
npm i key-board-hook

import 'key-board-hook'
```

### 事件
```
window.addEventListener("keyboardFocus", () => {
  console.log("keyboardFocus");
});
window.addEventListener("keyboardBlur", () => {
  console.log("keyboardBlur");
});
```


### versions

1.0.1 第一版