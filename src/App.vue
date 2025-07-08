<template>
  <div class="login-container" id="login-container">
    <div class="login-header" id="login-header">
      <img src="@/assets/images/khamenei.png" alt="khamenei_image">
      <h1>پایگاه اطلاعات قراردادهای اداره کل آموزش و پرورش استان خراسان رضوی</h1>
      <img src="@/assets/images/education_logo.png" alt="education_image">
    </div>
    <div class="login-body" id="login-body"></div>
  </div>
</template>

<script>
export default {
  components: {
  }
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

.login-container {
  width: 100vw;
  height: 100vh;
}

.login-header {
  display: flex;
  justify-content: space-between;
}

img {
  width: 160px;
}

h1 {
  transform: translate(0, 140px);
  font-size: 16px;
}
</style>
