<template>
  <div id="app">
    <div>{{text}}</div>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <input>
    <input>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import './keyBoard-hook.js'

export default {
  name: "app",
  components: {
    HelloWorld
  },
  data(){
    return{
      text:''
    }
  },
  mounted() {
    window.addEventListener("keyboardFocus", () => {
      this.text = 'focus'
    });
    window.addEventListener("keyboardBlur", () => {
       this.text = 'blur'
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
