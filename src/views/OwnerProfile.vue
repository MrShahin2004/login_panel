<template>
  <div class="w-screen h-screen overflow-hidden flex justify-center items-center">
    <div class="side-panel w-1/5 h-full relative flex justify-center items-center">
      <div class="card w-4/5 h-[92%] bg-base-100 shadow-xl rounded-lg">
        <div class="card-title rounded-t-[6px] h-[10%] text-2xl font-bold text-center
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
              <p class="text-left w-1/2 break-all">shahin.hash@gmail.com</p>
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
    <!-- Main content area -->
    <div class="main-content w-4/5 h-full relative flex justify-center items-center">
      <div class="w-[95%] h-[92%] bg-base-100 shadow-xl rounded-lg flex flex-col justify-start items-center p-4">
        <!-- Tabs at the top -->
        <div class="w-full flex justify-center items-center border-b-2 border-gray-200 mb-4">
          <button
              :class="{'text-primary border-b-2 border-primary': ActiveTab === 'admins'}"
              class="cursor-pointer flex-1 py-3 text-center text-gray-500 font-bold focus:outline-none transition-colors duration-200"
              @click="ActiveTab = 'admins'">
            ادمین ها
          </button>
          <button
              :class="{'text-primary border-b-2 border-primary': ActiveTab === 'users'}"
              class="cursor-pointer flex-1 py-3 text-center text-gray-500 font-bold focus:outline-none transition-colors duration-200"
              @click="ActiveTab = 'users'">
            کاربران عادی
          </button>
        </div>
        <!-- Tab content area -->
        <div class="w-full h-full flex justify-center items-center">
          <div v-if="ActiveTab === 'admins'" class="w-full h-full flex justify-center items-center">
            <AdminsSection/>
          </div>
          <div v-if="ActiveTab === 'users'" class="w-full h-full flex justify-center items-center">
            <UsersSection/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useRouter} from "vue-router";
import AdminsSection from "@/views/OwnerComps/AdminsSection.vue";
import UsersSection from "@/views/OwnerComps/UsersSection.vue";

export default {
  name: "OwnerProfile",
  components: {
    AdminsSection, UsersSection
  },
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
