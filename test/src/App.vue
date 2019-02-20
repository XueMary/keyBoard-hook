<template>
  <div id="app">
    <input>
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
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
  mounted() {
    window.addEventListener("keyboardFocus", () => {
      console.log("keyboardFocus");
    });
    window.addEventListener("keyboardBlur", () => {
      console.log("keyboardBlur");
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
