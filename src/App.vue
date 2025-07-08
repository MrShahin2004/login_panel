<template>
  <div class="login-container" id="login-container">
    <div class="login-header" id="login-header">
      <img src="@/assets/images/khamenei.png" alt="khamenei_image">
      <h1>پایگاه اطلاعات قراردادهای اداره کل آموزش و پرورش استان خراسان رضوی</h1>
      <img src="@/assets/images/education_logo.png" alt="education_image">
    </div>
    <div class="login-body" id="login-body">
      <div class="login-panel" id="login-panel">
        <p class="body-title" id="body-title" dir="rtl">ورود به سامانه کشوری برون سپاری</p>
        <RoleSelect/>
        <div class="body-desc" id="body-desc"></div>
        <div class="body-buttons" id="body-buttons"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  }
}
</script>

<style>
:root {
  --body-bg: #e5e7eb;
  --title-bg: #48b3bd;
  --input-bg: #dbeafe;
  --btn-bg: #293da3;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

#body {
  width: 100%;
  height: 100%;
}

.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.login-header {
  display: flex;
  justify-content: space-between;
}

img {
  width: 160px;
}

h1 {
  transform: translate(0, 130px);
  font-family: "B Titr", cursive;
  font-size: 16px;
}

.login-body {
  width: 100%;
  height: 500px;
  transform: translate(0, -5%);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
