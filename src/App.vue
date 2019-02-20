<template>
  <div id="app">
    <input type="text">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";

class keyboardHook {
  constructor() {
    this.winHeight = window.innerHeight;
    this.tagNames = ["input", "textarea"];
    this.types = ["text", "password", "number"];
    this.keyboardFocus = new Event("keyboardFocus");
    this.keyboardBlur = new Event("keyboardBlur");

    this.isShowKeyBoard = false;
    this.isResize = false;
    this.orientation = false;
    this.init();
  }

  init() {
    this.initFocus();
    this.initBlur();
    this.initOrientation();
    this.initClick();
  }

  initOrientation() {
    let _this = this;
    window.addEventListener("orientationchange", function() {
      _this.orientation = true;
    });
  }

  initFocus() {
    this.resizeF = this.resizeFn(this, this.resizeFocus);
    window.addEventListener("resize", this.resizeF);
  }

  initBlur() {
    this.resizeB = this.resizeFn(this, this.resizeBlur);
    window.addEventListener("resize", this.resizeB);
  }

  initClick() {
    let _this = this;
    let clickFn = function(e) {
      let isInput = _this.isInput(e);
      if (!isInput) return;
      setTimeout(function() {
        if (!_this.isResize) {
          clickFn = function(e) {
            let isInput = _this.isInput(e);
            if (isInput) {
              _this.clickFocus();
            } else {
              _this.clickBlur();
            }
          };
          _this.clickFocus();
          window.addEventListener("click", clickFn);
          window.removeEventListener("resize", _this.resizeF);
          window.removeEventListener("resize", _this.resizeB);
        }
      }, 500);
    };
    window.addEventListener("click", clickFn, { once: true });
  }

  resizeF() {}
  resizeB() {}
  resizeFn(_this, fn) {
    return function() {
      if (_this.orientation) {
        _this.orientation = false;
        return;
      }
      fn.call(_this);
    };
  }

  isInput(e) {
    function isThunks(arrs) {
      return function(arr) {
        arr = arr.toLowerCase();
        if (arrs.indexOf(arr) !== -1) {
          return true;
        }
        return false;
      };
    }
    
    const isTag = isThunks(this.tagNames);
    const isType = isThunks(this.types);

    const event = e || window.event;
    const target = event.target;
    
    const tagName = target.tagName.toLowerCase();
    const type = target.type;

    if (!isTag(tagName)) {
      return false;
    } else if (tagName === "input" && !isType(type)) {
      return false;
    }
    return true;
  }

  clickFocus() {
    if(this.isShowKeyBoard) return;
    this.isShowKeyBoard = true;
    window.dispatchEvent(this.keyboardFocus);
  }
  clickBlur() {
    if(!this.isShowKeyBoard) return;
    this.isShowKeyBoard = false;
    window.dispatchEvent(this.keyboardBlur);
  }

  resizeFocus() {
    let curHeight = window.innerHeight;
    if (Math.abs(curHeight - this.winHeight) > 80) {
      if (!this.isShowKeyBoard) {
        this.isShowKeyBoard = true;
        this.isResize = true;
        window.dispatchEvent(this.keyboardFocus);
      }
    }
  }
  resizeBlur() {
    let curHeight = window.innerHeight;
    if (Math.abs(curHeight - this.winHeight) < 80) {
      if (this.isShowKeyBoard) {
        this.isShowKeyBoard = false;
        this.isResize = true;
        window.dispatchEvent(this.keyboardBlur);
      }
    }
  }
}

export default {
  name: "app",
  components: {
    HelloWorld
  },
  mounted() {
    new keyboardHook();
    window.addEventListener("keyboardFocus", () => {
      // alert("focus");
    });
    window.addEventListener("keyboardBlur", () => {
      alert("blur");
    });
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
