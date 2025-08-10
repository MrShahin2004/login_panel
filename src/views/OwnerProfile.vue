<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center items-center">
    <div class="side-panel w-1/5 h-full relative flex justify-center items-center">
      <div class="card w-4/5 h-[92%] bg-base-100 shadow-xl rounded-lg">
        <div class="card-title rounded-t-[6px] h-[5%] text-2xl font-bold text-center
         py-4 bg-primary text-primary-content flex justify-center items-center">
          <h2 class="h-fit">{{ username }}</h2>
        </div>
        <div class="info-section w-full h-2/3 flex justify-center items-center p-4" dir="rtl">
          <div class="w-full h-full flex flex-col justify-evenly items-center gap-2">
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">نام کاربری</p>
              <p class="text-left">MrShahin2004</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">نام</p>
              <p class="text-left">شاهین</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">نام خانوادگی</p>
              <p class="text-left">هاشمی</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">کد ملی</p>
              <p class="text-left">0123456789</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">آدرس ایمیل</p>
              <p class="text-left w-1/2 break-all">shahin.hashsh@gmail.com</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">تاریخ ثبت</p>
              <p class="text-left">تیر ماه 1404</p>
            </div>
            <div class="flex w-4/5 justify-between">
              <p class="text-right font-bold">نقش</p>
              <p class="text-left">کاربر اداره کل</p>
            </div>
          </div>
        </div>
        <div class="card-actions flex flex-col justify-center items-center p-4">
          <button @click="ReturnToLogin" class="btn btn-primary rounded-[6px]" style="padding: 1rem">قراردادها</button>
        </div>
        <div class="card-actions flex flex-col justify-center items-center p-4">
          <button class="btn btn-primary rounded-[6px]" style="padding: 1rem">تماس با پشتیبانی</button>
        </div>
        <div class="card-actions flex flex-col justify-center items-center p-4">
          <button @click="ReturnToLogin" class="btn btn-primary rounded-[6px]"
                  style="padding: 1rem">بازگشت به صفحه ورود
          </button>
        </div>
      </div>
    </div>
    <div class="main-content w-4/5 h-full relative flex justify-center items-center">
      <div class="w-[95%] h-[92%] bg-base-100 shadow-xl rounded-lg"></div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";

export default {
  name: "OwnerProfile",
  props: {
    username: String
  },
  setup() {
    let Router = useRouter()

    function ReturnToLogin() {
      Router.push({name: "Home"});
    }

    return {ReturnToLogin, Router};
  }
};
</script>

<style>
.side-panel {
  margin-left: 1rem;
}
</style>
