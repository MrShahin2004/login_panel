<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-evenly items-center">
    <h1 class="text-[24px]">ساخت حساب کاربری</h1>
    <div class="main-body w-[95%] h-[85%] bg-[var(--body-bg)]">
      <button @click="ReturnLogIn">بازگشت به صفحه ورود</button>
    </div>
  </div>
</template>

<script>
import EmailAddress from "@/views/SigninComps/EmailAddress.vue";
import FirmName from "@/views/SigninComps/FirmName.vue";
import FirstName from "@/views/SigninComps/FirstName.vue";
import LastName from "@/views/SigninComps/LastName.vue";
import NationalID from "@/views/SigninComps/NationalID.vue";
import PassWord from "@/views/SigninComps/PassWord.vue";
import TypeSelect from "@/views/SigninComps/TypeSelect.vue";
import UserName from "@/views/SigninComps/UserName.vue";
import {useRouter} from "vue-router";

export default {
  name: "SignIn",
  setup() {
    let Router = useRouter();

    function ReturnLogIn() {
      Router.push("/");
    }

    return {ReturnLogIn, Router}
  }
}
</script>

<style></style>
