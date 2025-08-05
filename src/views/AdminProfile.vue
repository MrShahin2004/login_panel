<template>
  <div class="w-[100vw] min-h-screen overflow-auto flex justify-center">
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
    GetUnverifiedUsers() {
      fetch("http://localhost:3000/api/mariadb/get-pending-users")
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            let AllUsers = data.users;
            AllUsers.forEach((user) => {
              if (user.verify === 0) {
                this.NotVerifiedUsers.push(user);
              }
            });
          })
          .catch((error) => {
            console.log(error);
          });
    },
    ShowUsers() {
      this.GetUnverifiedUsers();
      let MainContentDiv = document.querySelector(".main-content");
      this.NotVerifiedUsers.forEach((item) => {
        let ItemElement = document.createElement("div");
        ItemElement.innerHTML = `
            <div>
                <p>${item.id}</p>
                <p>${item.username}</p>
                <p>${item.password}</p>
                <p>${item.firstName}</p>
                <p>${item.lastName}</p>
                <p>${item.firm}</p>
                <p>${item.role}</p>
                <p>${item.type}</p>
                <p>${item.createdAt}</p>
                <p>${item.email}</p>
                <p>${item.nationalId}</p>
                <p>${item.verify}</p>
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
