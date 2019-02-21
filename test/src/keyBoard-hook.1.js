(function () {
  class keyboardHook {
    constructor() {
      this.winHeight = window.innerHeight;
      this.navHeight = screen.availHeight - this.winHeight
      this.keyboardFocus = new Event("keyboardFocus");
      this.keyboardBlur = new Event("keyboardBlur");

      this.isShowKeyBoard = false;
      this.isOrienta = false
      this.init();
    }

    init() {
      this.initResize();
      this.initOrientation();
    }

    initOrientation() {
      let _this = this;
      window.addEventListener("orientationchange", function () {
        _this.winHeight = window.innerHeight;
        _this.navHeight = screen.availHeight - _this.winHeight
        _this.isOrienta = true
      });
    }

    initResize() {
      this.resizeF = this.resizeF(this, this.resiFn);
      window.addEventListener("resize", this.resizeF);
    }

    resizeF(_this, fn) {
      return function () {
        if (_this.isOrienta) {
          _this.isOrienta = false
          return;
        }
        fn.call(_this);
      }
    }

    resiFn() {
      if (this.isShowKeyBoard) {
        this.resizeBlur()
      }
      else {
        this.resizeFocus()
      }
    }

    resizeFocus() {
      let curHeight = window.innerHeight;
      if (Math.abs(curHeight - this.winHeight) > this.navHeight) {
        this.isShowKeyBoard = true;
        window.dispatchEvent(this.keyboardFocus);
      }
    }
    resizeBlur() {
      let curHeight = window.innerHeight;
      if (Math.abs(curHeight - this.winHeight) < this.navHeight) {
        this.isShowKeyBoard = false;
        window.dispatchEvent(this.keyboardBlur);
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