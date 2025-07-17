<template>
  <div class="code-input bg-[#f3f4f6] w-[90%] h-fit grid grid-cols-[3fr_1fr_1.3fr] rounded-b-[6px_6px]">
    <input v-model="InsertedCode" @input="SendCode"
           class="bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
           id="code-input" type="text">
    <div class="flex justify-center items-center">
      <img class="cursor-pointer" v-bind:src="CaptchaLink" alt="captcha" @click="GetCaptcha">
    </div>
    <label class="flex justify-center items-center" for="code-input">کد امنیتی</label>
  </div>
</template>

<script>
export default {
  data() {
    return {
      CaptchaLink: "",
      InsertedCode: ""
    };
  },
  methods: {
    GetCaptcha() {
      this.CaptchaLink = "http://localhost:4000/api/captcha/get?t" + Date.now();
    },
    SendCode() {
      if (+this.InsertedCode.length === 0) {
        console.log("Please insert a value.");
      } else if (isNaN(+this.InsertedCode)) {
        console.log("Security code must be only a number.");
      } else if (+this.InsertedCode.length > 5 || +this.InsertedCode.length < 5) {
        console.log("Security code must be exactly 5 digits.");
      } else {
        console.log("Security code meets the condition.");
        this.$emit("SendCode", this.InsertedCode);
      }
    }
  },
  mounted() {
    this.GetCaptcha();
  }
}
</script>

<style>
.code-input {
  padding: 0.5rem;
}

input {
  font-family: "B Nazanin", sans-serif;
  padding: 0.5rem;
}
</style>
