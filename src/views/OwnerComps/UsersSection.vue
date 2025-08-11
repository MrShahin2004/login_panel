<template>
  <div class="w-[100%] h-[100%] flex justify-center items-center">
    <div class="main-container w-[90%] h-[93%] rounded-[6px] border border-black border-solid">
      <div class="title-div w-[100%] h-[10%] flex justify-center items-center">
        <h2 class="text-[24px]">فهرست کاربران عادی <i class="fas fa-user"></i></h2>
      </div>
      <div class="button-div w-[100%] h-[10%] flex justify-center items-center">
        <button
            @click="ShowAllUsers"
            class="h-fit bg-[var(--btn-bg)] rounded-[6px] cursor-pointer"
            style="color: white; padding: 0.5rem"
            :disabled="ButtonDisabled"
        >
          {{ ButtonText }}
        </button>
      </div>
      <div class="content-div w-[100%] h-[80%] flex justify-center items-center overflow-auto">
        <p v-if="AllUsersFromServer.length === 0" class="big-placeholder text-[40px] opacity-50">
          .فعالیتی انجام نشده است
        </p>
        <ul v-else class="w-[90%] text-[20px]">
          <li v-for="user in AllUsersFromServer" :key="user.id" class="py-2">
            {{ user.username || 'کاربر بدون نام' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {computed, reactive, ref} from "vue";

export default {
  setup() {
    // A variable to store all users retrieved from the server
    let AllUsersFromServer = reactive([]);
    // A flag to track if ShowAllUsers has been called
    let HasRun = ref(false);

    // Computed property for button text
    const ButtonText = computed(() => {
      return HasRun.value ? 'نمایش انجام شد' : 'نمایش همه';
    });

    // Computed property for button disabled state
    const ButtonDisabled = computed(() => {
      return HasRun.value;
    });

    // Function to fetch and log users, runs only once
    async function ShowAllUsers() {
      if (!HasRun.value) {
        try {
          // Fetch data from the server
          let response = await fetch("http://localhost:3000/api/mariadb/get-all-users");
          let data = await response.json();
          let usersKey = data.users;

          // Populate the array
          usersKey.forEach((user) => {
            AllUsersFromServer.push(user);
          });

          // Set flag to prevent further runs
          HasRun.value = true;
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      }
    }

    return {AllUsersFromServer, GetAllUsers};
  }
}
</script>

<style scoped></style>
