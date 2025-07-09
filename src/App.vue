<template>
  <div class="h-screen w-screen flex flex-col justify-between">
    <div class="flex justify-between">
      <img class="w-[160px]" src="@/assets/images/khamenei.png" alt="khamenei_image">
      <h1 class="translate-x-[0] translate-y-[150px] text-[16px]
                 text-shadow-[0_4px_10px_black]">پایگاه اطلاعات قراردادهای اداره کل آموزش و پرورش استان خراسان رضوی</h1>
      <img class="w-[160px]" src="@/assets/images/education_logo.png" alt="education_image">
    </div>
    <div class="login-body w-full">
      <div class="login-panel">
        <p class="body-title" dir="rtl">ورود به سامانه کشوری برون سپاری</p>
        <div class="body-inputs">
          <RoleSelect/>
          <UserName/>
          <PassWord/>
        </div>
        <div class="body-desc"></div>
        <div class="body-buttons"></div>
      </div>
    </div>
  </div>
</template>

<script>
import RoleSelect from "@/components/RoleSelect.vue";
import UserName from "@/components/UserName.vue";
import PassWord from "@/components/PassWord.vue";

export default {
  components: {
    RoleSelect, UserName, PassWord
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --main-title: #dcb417;
  --body-bg: #e5e7eb;
  --title-bg: #48b3bd;
  --input-bg: #dbeafe;
  --btn-bg: #293da3;
}

#body {
  background: #0059E7;
  background: radial-gradient(circle,
  rgba(0, 89, 231, 1) 0%,
  rgba(43, 16, 88, 1) 100%);
}

h1 {
  font-family: "B Titr", cursive;
  color: var(--main-title);
}

.login-body {
  height: 500px;
  transform: translate(0, -5%);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  font-family: "B Nazanin", cursive;
}

.login-panel {
  width: 500px;
  height: 500px;
  background-color: var(--body-bg);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.body-title {
  font-size: 15px;
  padding: 0.5rem 2rem;
  color: white;
  background-color: var(--title-bg);
  width: 90%;
  box-sizing: border-box;
  margin-top: 1.3rem;
  height: fit-content;
  border-radius: 6px;
}

.body-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
