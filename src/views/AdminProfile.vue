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

      // Creating the modal content (with daisyUI list components)
      let ModalContent = document.createElement("div");
      ModalContent.innerHTML = `
        <div class="flex justify-center items-center gap-4 w-[70%] h-[70%] border-[1px] rounded-[6px]">
          <ul class="list-none w-[40%] bg-base-100 rounded-lg shadow p-4">
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.id}</span>
              <span>ID</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.username}</span>
              <span>نام کاربری</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.firstName}</span>
              <span>نام</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.lastName}</span>
              <span>نام خانوادگی</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.firm}</span>
              <span>نام شرکت</span>
            </li>
            <li class="flex justify-between items-center p-2 h-[40px]">
              <span class="font-semibold">${user.role}</span>
              <span>نوع کاربری</span>
            </li>
          </ul>
          <ul class="list-none w-[40%] bg-base-100 rounded-lg shadow p-4">
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.type}</span>
              <span>نقش</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.createdAt}</span>
              <span>تاریخ ثبت</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.email}</span>
              <span>آدرس ایمیل</span>
            </li>
            <li class="flex justify-between items-center p-2 border-b h-[40px]">
              <span class="font-semibold">${user.nationalId}</span>
              <span>کد ملی</span>
            </li>
            <li class="flex justify-between items-center p-2 h-[40px]">
              <span class="font-semibold">${user.verify === 0 ? "تأیید نشده" : "تأیید شده"}</span>
              <span>وضعیت</span>
            </li>
          </ul>
          <button
            class="close-modal btn btn-circle btn-ghost absolute top-2 right-2"
            style="padding: 0.5rem">&times;</button>
        </div>
      `;
      ModalContent.className = `w-[80%] h-[80%] bg-base-100 flex justify-center items-center rounded-lg z-[20] relative`;
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
        ModalContainerEl.removeEventListener("click", OutsideClickHandler);
        window.removeEventListener("keydown", EscapeKeyHandler);
      };

      // Handle click on close button
      let CloseModalBtn = ModalContent.querySelector(".close-modal");
      CloseModalBtn.addEventListener("click", CloseModal);

      // Handle click outside modal
      const OutsideClickHandler = (event) => {
        if (event.target === ModalContainerEl) {
          CloseModal();
        }
      };
      ModalContainerEl.addEventListener("click", OutsideClickHandler);

      // Handle Escape key press
      const EscapeKeyHandler = (event) => {
        if (event.key === "Escape") {
          CloseModal();
        }
      };
      window.addEventListener("keydown", EscapeKeyHandler);
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