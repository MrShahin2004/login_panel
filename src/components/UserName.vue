<template>
  <div class="username-input bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%]" id="username-input">
    <input dir="rtl" type="text">
    <div class="label-section flex justify-center items-center" id="label-section">
      <label class="text-center text-[16px]" for="text-input">نام کاربری</label>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.username-input {
  padding: 0.5rem;
}

input {
  font-family: "B Nazanin", sans-serif;
  padding: 0.5rem;
  font-size: 16px;
}

input:focus {
  outline: none;
}
</style>

