<template>
  <div class="login-container" id="login-container">
    <div class="login-header" id="login-header">
      <img class="img-1" src="@/assets/images/khamenei.png" alt="khamenei_image">
      <img class="img-2" src="@/assets/images/education_logo.png" alt="education_ministry">
    </div>

    <div class="login-body" id="login-body"></div>
  </div>
</template>

<script>
export default {
  components: {},
  data() {
  },
  methods: {}
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#body {
  width: 100%;
  height: 100%;
  font-family: "JetBrains Mono", monospace;
}

img {
  width: 160px;
}

.img-2 {
  width: 160px;
}

.login-container {
  width: 100vw;
  height: 100vh;
}

.login-header {
  display: flex;
  justify-content: space-between;
}
</style>
