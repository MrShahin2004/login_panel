<template>
  <div class="w-[100vw] min-h-screen overflow-auto flex justify-center">
    <div class="admin-profile w-[85%] h-[100%] translate-y-[60px]">
      <h1 class="text-[24px]">داشبورد ادمین</h1>
      <div class="main-content w-[100%] h-[100%] rounded-[6px] bg-[var(--body-bg)] flex flex-col items-center">
        <br>
        <h2 class="text-[black] text-[18px]">{{ username }} خوش آمدید</h2>
        <h2 class="text-[black] text-[18px]">نوع کاربری شما: ادمین</h2>
        <div class="btns w-[40%] flex justify-evenly items-center">
          <button class="outline-[0]" @click="logout">خروج</button>
          <button class="outline-[0]" @click="ShowUnverifiedUsers">نمایش کاربران در انتظار</button>
        </div>
        <div class="data-container w-[80%] h-[400px] overflow-auto relative">
          <div
              v-for="user in NotVerifiedUsers"
              :key="user.username"
              class="w-[50%] h-[150px] rounded-[6px] bg-[white] grid grid-cols-[3fr_1fr] translate-x-[50%]"
              style="margin-bottom: 1rem;">
            <div class="flex justify-center items-center">
              <h2>{{ user.username }}</h2>
            </div>
            <div class="flex justify-center items-center">
              <button
                  @click="EditUser(user)"
                  class="cursor-pointer w-[80%] h-fit outline-[0]"
                  style="margin-top: 1.5rem;">
                <i class="fas fa-edit"></i> ویرایش کاربر
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
        style="background-color: rgba(0, 0, 0, 0.3); display: none"
        class="modal-container z-[10] absolute top-[0] left-[0] w-[100%] h-[100%]">
    </div>
  </div>
</template>

<script>
import {jwtDecode} from "jwt-decode";

export default {
  name: "AdminProfile",
  props: {
    username: String,
    token: String
  },
  data() {
    return {
      remainingTime: null,
      checkInterval: null,
      NotVerifiedUsers: []
    };
  },
  mounted() {
    const token = this.token || localStorage.getItem('token');
    if (token) {
      try {
        const parsedToken = jwtDecode(token);
        const expireTime = parsedToken.exp;

        this.checkInterval = setInterval(() => {
          const now = Date.now() / 1000;
          this.remainingTime = expireTime - Math.floor(now);

          if (this.remainingTime <= 0) {
            clearInterval(this.checkInterval);
            console.log('Token is expired');
            alert('جلسه شما منقضی شده است!');
            localStorage.removeItem('token');
            this.$router.push({name: 'Home'});
          }
        }, 1000);
      } catch (error) {
        console.error('Token decode error: ', error.message);
        this.$router.push({name: 'Home'});
      }
    } else {
      console.error('No token provided');
      this.$router.push({name: 'Home'});
    }
  },
  beforeUnmount() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push({name: 'Home'});
    },
    async ShowUnverifiedUsers() {
      // Fetch data
      let Response = await fetch('http://localhost:3000/api/mariadb/get-pending-users');
      let Data = await Response.json();

      // Filter unverified users
      this.NotVerifiedUsers = Data.users.filter((user) => {
        return user.verify === 0
      });
    },
    EditUser(user) {
      // Selecting the modal element
      let ModalContainerEl = document.querySelector(".modal-container");

      // Creating the modal content
      let ModalContent = document.createElement("div");
      ModalContent.innerHTML = `
          <div style="margin-right: 1rem" class="w-[40%] h-[50%] flex flex-col justify-evenly items-center rounded-[6px] border-[1px]">
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.id}</p> ID
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.username}</p> نام کاربری
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.firstName}</p> نام
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.lastName}</p> نام خانوادگی
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.firm}</p> نام شرکت
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.role}</p> نوع کاربری
              </div>
          </div>
          <div style="margin-left: 1rem" class="w-[40%] h-[50%] flex flex-col justify-evenly items-center rounded-[6px] border-[1px]">
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.type}</p> نقش
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.createdAt}</p> تاریخ ثبت
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.email}</p> آدرس ایمیل
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.nationalId}</p> کد ملی
              </div>
              <div class="w-[80%] h-fit flex justify-between items-center">
                  <p>${user.verify === 0 ? "تأیید نشده" : "تأیید شده"}</p> وضعیت
              </div>
          </div>
          <button
          style="padding: 1rem"
          class="close-modal text-[24px] absolute top-[6px] right-[20px] cursor-pointer">&times;</button>
      `;
      ModalContent.className = `w-[80%] h-[80%] bg-[white]
       flex justify-center items-center rounded-[6px] z-[20] relative`;
      ModalContent.style.marginBottom = "1rem";
      ModalContainerEl.style.display = "flex";
      ModalContainerEl.classList.add("justify-center", "items-center");
      ModalContainerEl.append(ModalContent);

      // Function to close the modal
      const CloseModal = () => {
        ModalContainerEl.innerHTML = "";
        ModalContainerEl.style.display = "none";
        ModalContainerEl.classList.remove("justify-center", "items-center");
        // Remove event listeners to avoid duplicates
        ModalContainerEl.removeEventListener("click", outsideClickHandler);
        window.removeEventListener("keydown", escapeKeyHandler);
      };

      // Handle click on close button
      let CloseModalBtn = ModalContent.querySelector(".close-modal");
      CloseModalBtn.addEventListener("click", CloseModal);

      // Handle click outside modal
      const outsideClickHandler = (event) => {
        if (event.target === ModalContainerEl) {
          CloseModal();
        }
      };
      ModalContainerEl.addEventListener("click", outsideClickHandler);

      // Handle Escape key press
      const escapeKeyHandler = (event) => {
        if (event.key === "Escape") {
          CloseModal();
        }
      };
      window.addEventListener("keydown", escapeKeyHandler);
    }
  }
};
</script>

<style scoped>
.admin-profile {
  font-family: 'B Nazanin', cursive;
  text-align: center;
  color: var(--btn-bg, #293da3);
}

h1 {
  font-family: 'B Titr', cursive;
  color: var(--main-title, #dcb417);
  margin-bottom: 1rem;
}

.btns {
  margin-top: 1rem;
}

button {
  padding: 10px 20px;
  background-color: var(--btn-bg, #293da3);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #1b2a6b;
}
</style>