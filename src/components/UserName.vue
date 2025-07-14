<template>
  <div class="username-input bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%]" id="username-input">
    <input @input="SendUser" v-model="InsertedUser"
           class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0" dir="rtl"
           id="user-input" type="text">
    <div class="flex justify-center items-center" id="label-section">
      <label class="text-center text-[16px]" for="user-input">نام کاربری</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InsertedUser: ""
    };
  },
  methods: {
    SendUser() {
      this.$emit("SendUser", this.InsertedUser);
    }
  }
}
</script>

<style scoped>
.username-input {
  padding: 0.5rem;
}

input {
  font-family: "B Nazanin", sans-serif;
  padding: 0.5rem;
}
</style>
