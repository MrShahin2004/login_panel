<template>
  <div class="w-[100vw] h-[100vh] flex flex-col justify-evenly items-center">
    <h1 class="text-[24px]">ساخت حساب کاربری</h1>
    <div class="main-body w-[95%] h-[85%] bg-[var(--body-bg)] grid grid-rows-[4fr_1fr] rounded-[6px]">
      <div class="fields-container w-[80%] h-[100%] bg-[#f3f4f6]
       grid grid-cols-[1fr_1fr] translate-x-[150px] translate-y-[20px] rounded-[6px]">
        <LastName @LastSent="LastAssign($event)"/>
        <FirstName @FirstSent="FirstAssign($event)"/>
        <EmailAddress @EmailSent="EmailAssign($event)"/>
        <NationalID @NationalSent="NationalAssign($event)"/>
        <PassWord @PassSent="PassAssign($event)"/>
        <UserName @UserSent="UserAssign($event)"/>
        <TypeSelect @TypeSent="TypeAssign($event)"/>
        <FirmName @FirmSent="FirmAssign($event)"/>
      </div>
      <div class="w-[100%] flex justify-center items-center">
        <div class="w-[50%] flex justify-evenly items-center translate-y-[20px]">
          <button @click="ReturnLogIn">بازگشت به صفحه ورود</button>
          <button>ثبت نام</button>
        </div>
      </div>
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
import {ref} from "vue";

export default {
  name: "SignIn",
  components: {
    EmailAddress, FirmName, FirstName, LastName, NationalID, PassWord, TypeSelect, UserName
  },
  setup() {
    let Router = useRouter();
    let ReceivedFirst = ref("");
    let ReceivedLast = ref("");
    let ReceivedNational = ref("");
    let ReceivedEmail = ref("");
    let ReceivedUser = ref("");
    let ReceivedPass = ref("");
    let ReceivedFirm = ref("");

    // let ReceivedType = ref("");

    function FirstAssign(first) {
      ReceivedFirst.value = first;
      console.log(ReceivedFirst.value);
    }

    function LastAssign(last) {
      ReceivedLast.value = last;
      console.log(ReceivedLast.value);
    }

    function NationalAssign(national) {
      ReceivedNational.value = national;
      console.log(ReceivedNational.value);
    }

    function EmailAssign(email) {
      ReceivedEmail.value = email;
      console.log(ReceivedEmail.value);
    }

    function UserAssign(user) {
      ReceivedUser.value = user;
      console.log(ReceivedUser.value);
    }

    function PassAssign(pass) {
      ReceivedPass.value = pass;
      console.log(ReceivedPass.value);
    }

    function FirmAssign(firm) {
      ReceivedFirm.value = firm;
      console.log(ReceivedFirm.value);
    }

    // Return to the login page
    function ReturnLogIn() {
      Router.push("/");
    }

    return {
      ReturnLogIn, Router, FirstAssign, ReceivedFirst,
      ReceivedLast, LastAssign, ReceivedNational, NationalAssign, ReceivedEmail, EmailAssign,
      ReceivedUser, UserAssign, ReceivedPass, PassAssign, ReceivedFirm, FirmAssign
    };
  }
}
</script>

<style>
button {
  font-family: "B Nazanin", cursive;
}
</style>
