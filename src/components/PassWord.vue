<template>
  <div class="password-input bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%]" id="password-input">
    <input @input="SendPass" v-model="InsertedPass"
           class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0" dir="rtl"
           id="pass-input" type="password">
    <div class="flex justify-center items-center" id="label-section">
      <label class="text-center text-[16px]" for="pass-input">گذر واژه</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      InsertedPass: ""
    };
  },
  methods: {
    SendPass() {
      let Regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!#$%&*_?/^])[A-Za-z\d!#$%&*_?/^]{8,64}$/;
      let IsValid = Regex.test(this.InsertedPass);
      if (!IsValid) {
        console.log("Password doesn't follow the rules.");
      }

      this.$emit("SendPass", this.InsertedPass);
    }
  }
}
</script>

<style scoped>
.password-input {
  padding: 0.5rem;
}

input {
  font-family: "B Nazanin", sans-serif;
  padding: 0.5rem;
}
</style>
