<template>
  <div class="username-input" id="username-input">
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
  height: fit-content;
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 90%;
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

