<template>
  <div class="flex flex-col justify-between">
    <div class="flex justify-between relative">
      <img class="w-[160px]" src="@/assets/images/khamenei.png" alt="khamenei_image">
      <h1 class="text-[16px] absolute left-[50%] top-[90px] translate-x-[-50%] translate-y-[-100%]
                 text-shadow-[0_4px_10px_black]">پایگاه اطلاعات قراردادهای اداره کل آموزش و پرورش استان خراسان رضوی</h1>
      <img class="w-[160px]" src="@/assets/images/education_logo.png" alt="education_image">
    </div>
    <div class="login-body w-full h-full flex justify-center items-center">
      <div class="w-[500px] h-[500px] bg-[var(--body-bg)]
                  flex flex-col justify-between items-center rounded-[10px]">
        <p class="body-title text-[15px] bg-[var(--title-bg)]
                  w-[90%] box-border h-fit rounded-[6px]" dir="rtl">ورود به سامانه کشوری برون سپاری</p>
        <div class="body-inputs w-full flex flex-col justify-center items-center">
          <RoleSelect @SendRole="AssignRole($event)"/>
          <UserName @SendUser="AssignUser($event)"/>
          <PassWord @SendPass="AssignPass($event)"/>
          <SecurityCode @SendCode="AssignCode($event)"/>
        </div>
        <div class="body-desc text-[16px] flex flex-col justify-center items-center">
          <p>فیلد گذر واژه به کوچکی و بزرگی حروف حساس است</p>
          <p>گذر واژه باید ترکیبی از عدد و حروف باشد</p>
          <p>فیلد کد امنیتی به کوچکی و بزرگی حروف حساس نیست</p>
          <p>به زبان صفحه کلید خود دقت کنید تا روی زبان درست تنظیم شده باشد</p>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <button @click="PostData" class="bg-[var(--btn-bg)] text-[white]
          w-[150px] h-[50px] rounded-[10px] hover:cursor-pointer">ورود به سامانه
          </button>
          <button class="bg-[var(--btn-bg)] text-[white]
           w-[150px] h-[50px] rounded-[10px] hover:cursor-pointer">فراموشی گذر واژه
          </button>
        </div>
      </div>
    </div>
    <hr>
    <div class="login-footer">
      <div class="footer-links flex justify-center items-center gap-x-[1rem]">
        <a class="text-white transition hover:cursor-pointer" href="#">حریم خصوصی</a>
        <a class="text-white transition hover:cursor-pointer" href="#">نظرسنجی‌ها</a>
        <a class="text-white transition hover:cursor-pointer" href="#">پیوندها</a>
        <a class="text-white transition hover:cursor-pointer" href="#">فراخوان‌ها</a>
        <a class="text-white transition hover:cursor-pointer" href="#">آمارها</a>
        <a class="text-white transition hover:cursor-pointer" href="#">صفحه اصلی</a>
      </div>
      <div class="footer-desc flex justify-center items-center">
        <p class="text-[white]">© کلیه حقوق این پایگاه به سپهر داده تعلق دارد</p>
      </div>
    </div>
  </div>
</template>

<script>
import RoleSelect from "@/components/RoleSelect.vue";
import UserName from "@/components/UserName.vue";
import PassWord from "@/components/PassWord.vue";
import SecurityCode from "@/components/SecurityCode.vue";
// import { jwtDecode } from "jwt-decode";

export default {
  name: "LogIn",
  components: {
    RoleSelect,
    UserName,
    PassWord,
    SecurityCode,
  },
  data() {
    return {
      ReceivedRole: "",
      ReceivedUser: "",
      ReceivedPass: "",
      ReceivedCode: "",
    };
  },
  methods: {
    AssignRole(role) {
      this.ReceivedRole = role;
    },
    AssignUser(user) {
      this.ReceivedUser = user;
    },
    AssignPass(pass) {
      this.ReceivedPass = pass;
    },
    AssignCode(code) {
      this.ReceivedCode = code;
    },
    async PostData() {
      try {
        const response = await fetch("http://localhost:3000/api/mariadb/check", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            type: this.ReceivedRole,
            username: this.ReceivedUser,
            password: this.ReceivedPass,
            code: this.ReceivedCode,
          }),
        });
        const data = await response.json();

        if (!data.token || typeof data.token !== "string") {
          console.error("Invalid or missing token: ", data.message || "No token provided.");
          return;
        }

        localStorage.setItem("token", data.token);
        this.$router.push({
          name: 'Profile',
          params: {
            user: this.ReceivedUser,
            token: data.token
          }
        });
      } catch (error) {
        console.error("Failed to fetch. Error: ", error);
      }
    },
  },
};
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
  font-family: "B Nazanin", cursive;
  margin-bottom: 1rem;
}

.body-title {
  padding: 0.5rem 2rem;
  color: white;
  margin-top: 1.5rem;
}

button {
  margin-bottom: 1.5rem;
}

hr {
  color: white;
}

.footer-links {
  margin-bottom: 1rem;
}

a:hover {
  color: blue;
}

.footer-desc {
  margin-bottom: 1rem;
}
</style>
