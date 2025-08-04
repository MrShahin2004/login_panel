<template>
  <div class="w-[100vw] min-h-screen overflow-hidden flex justify-center">
    <div class="admin-profile w-[85%] h-[100%] translate-y-[60px]">
      <h1 class="text-[24px]">داشبورد ادمین</h1>
      <div class="main-content w-[100%] h-[100%] rounded-[6px] bg-[var(--body-bg)]
       flex flex-col justify-center items-center">
        <br>
        <h2 class="text-[black] text-[18px]">{{ username }} خوش آمدید</h2>
        <h2 class="text-[black] text-[18px]">نوع کاربری شما: ادمین</h2>
        <div class="btns w-[40%] flex justify-evenly items-center">
          <button @click="logout">خروج</button>
          <button @click="ShowUsers">نمایش کاربران در انتظار</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {jwtDecode} from 'jwt-decode';

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
      PendingUsersArray: [],
      ParsedArray: null
    };
  },
  mounted() {
    let StoredUsers = localStorage.getItem("userData");
    if (StoredUsers) {
      this.PendingUsersArray = JSON.parse(StoredUsers);
    }
    this.GetPendingUsers();

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
    GetPendingUsers() {
      fetch("http://localhost:3000/api/get-pending-users")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            if (Object.keys(data.info).length === 0) {
              console.log("This object is empty.");
            } else {
              this.PendingUsersArray.push(data.info);
              localStorage.setItem("userData", JSON.stringify(this.PendingUsersArray));

              console.log("Updated pending users array: ", this.PendingUsersArray);
            }
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ShowUsers() {
      this.ParsedArray = JSON.parse(localStorage.getItem("userData")) || [];
      let MainContentDiv = document.querySelector(".main-content");

      this.ParsedArray.forEach((item) => {
        let ItemElement = document.createElement("div");
        ItemElement.innerHTML = `
            <div class="w-[100%] h-[100%] flex flex-col justify-evenly items-center">
                <p>${item.first} :نام</p>
                <p>${item.last}</p>نام خانوادگی:
                <p>${item.national}</p>کد ملی:
                 <p>${item.email}</p>آدرس ایمیل:
            </div>
            <div class="w-[100%] h-[100%] flex flex-col justify-evenly items-center">
                <p>${item.user}</p>نام کاربری:
                <p>${item.pass}</p>رمز عبور:
                <p>${item.firm}</p>نام شرکت:
                <p>${item.type}</p>نقش:
            </div>
        `;
        ItemElement.setAttribute("class", "w-[80%] h-[200px] bg-[white]" +
            " flex justify-evenly items-center overflow");
        ItemElement.setAttribute("style", "margin-bottom: 1rem");
        MainContentDiv.append(ItemElement);
      });
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
