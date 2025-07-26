<template>
  <div class="profile">
    <h1>داشبورد</h1>
    <p class="text-[white]">خوش آمدید {{ user }}! جلسه شما در {{ remainingTime }} ثانیه منقضی می‌شود.</p>
    <button @click="logout">خروج</button>
  </div>
</template>

<script>
import {jwtDecode} from 'jwt-decode';

export default {
  name: "UserProfile",
  data() {
    return {
      remainingTime: null,
      checkInterval: null,
      user: localStorage.getItem("user"),
      token: localStorage.getItem("token")
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
          console.log('Remaining time: ', this.remainingTime);

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
  },
};
</script>

<style scoped>
.profile {
  font-family: 'B Nazanin', cursive;
  text-align: center;
  margin-top: 60px;
  color: var(--btn-bg, #293da3);
}

h1 {
  font-family: 'B Titr', cursive;
  color: var(--main-title, #dcb417);
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
