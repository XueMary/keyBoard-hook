(function () {
  class keyboardHook {
    constructor() {
      this.winHeight = window.innerHeight;
      this.tagNames = ["input", "textarea"];
      this.types = ["text", "password", "number"];
      this.keyboardFocus = new Event("keyboardFocus");
      this.keyboardBlur = new Event("keyboardBlur");

      this.isShowKeyBoard = false;
      this.isResize = false;
      this.isClick = false
      this.clickTimeOut = null
      this.init();
    }

    init() {
      this.initClick();
      this.initFocus();
      this.initBlur();
      this.initOrientation();
    }

    initOrientation() {
      let _this = this;
      window.addEventListener("orientationchange", function () {
        _this.winHeight = window.innerHeight;
      });
    }

    initFocus() {
      this.resizeF = this.resizeF(this, this.resizeFocus);
      window.addEventListener("resize", this.resizeF);
    }

    initBlur() {
      this.resizeB = this.resizeB(this, this.resizeBlur);
      window.addEventListener("resize", this.resizeB);
    }

    initClick() {
      let _this = this;
      function changeClick() {
        _this.isClick = true
        clearTimeout(_this.clickTimeOut)
        _this.clickTimeOut = setTimeout(() => {
          _this.isClick = false
        }, 500);
      }
      let clickFn = function (e) {
        changeClick();
        let isInput = _this.isInput(e);
        if (!isInput) return;
        setTimeout(function () {
          window.removeEventListener("click", clickFn);
          if (!_this.isResize) {
            clickFn = function (e) {
              changeClick()
              let isInput = _this.isInput(e);
              if (isInput) {
                _this.clickFocus();
              } else {
                _this.clickBlur();
              }
            };
            _this.clickFocus();
            window.removeEventListener("resize", _this.resizeF);
            window.removeEventListener("resize", _this.resizeB);
          }
          else {
            clickFn = function () {
              changeClick()
            };
          }
          
          window.addEventListener("click", clickFn);
        }, 500);
      };
      window.addEventListener("click", clickFn);
    }

    resizeF(_this, fn) {
      return function () {
        if (_this.isClick) {
          fn.call(_this);
        }
      }
    }
    resizeB(_this, fn) {
      return function () {
        fn.call(_this);
      }
    }

    isInput(e) {
      function isThunks(arrs) {
        return function (arr) {
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
      if (this.isShowKeyBoard) return;
      this.isShowKeyBoard = true;
      window.dispatchEvent(this.keyboardFocus);
    }
    clickBlur() {
      if (!this.isShowKeyBoard) return;
      this.isShowKeyBoard = false;
      window.dispatchEvent(this.keyboardBlur);
    }

    resizeFocus(e) {
      const event = e || window.event
      let curHeight = window.innerHeight;
      if (Math.abs(curHeight - this.winHeight) > 80) {
        if (!this.isShowKeyBoard) {
          this.isShowKeyBoard = true;
          this.isResize = true;
          clearTimeout(this.clickTimeOut)
          this.isClick = false
          window.dispatchEvent(this.keyboardFocus);
          event.stopImmediatePropagation()
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

  function isMobile() {
    return /(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)
  }

  if (isMobile()) {
    new keyboardHook()
  }
})()