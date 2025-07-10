<template>
  <div class="select-box">
    <select class="select-input" dir="rtl">
      <option value="Choose">انتخاب کنید</option>
      <option value="Choose">کاربر ثبات</option>
      <option value="Choose">کاربر اداره کل</option>
    </select>
    <div class="label-section">
      <label for="select-input">انتخاب نقش</label>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.select-box {
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

select {
  font-family: "B Nazanin", sans-serif;
  background-color: #dbeafe;
  border: 0;
  border-radius: 6px;
  padding: 0.5rem;
  font-size: 16px;
}

select:focus {
  outline: none;
}

option {
  background-color: white;
  border: 0;
  border-radius: 4px;
}
</style>
