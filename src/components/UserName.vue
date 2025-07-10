<template>
  <div class="username-input bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%]" id="username-input">
    <input dir="rtl" id="text-input" type="text">
    <div class="label-section" id="label-section">
      <label for="text-input">نام کاربری</label>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.username-input {
  padding: 0.5rem;
}

.label-section {
  display: flex;
  justify-content: center;
  align-items: center;
}

label {
  text-align: center;
  font-size: 16px;
}

input {
  font-family: "B Nazanin", sans-serif;
  background-color: #dbeafe;
  border: 0;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 16px;
}

input:focus {
  outline: none;
}
</style>

