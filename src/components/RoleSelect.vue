<template>
  <div class="select-box" title="select-box">
    <select class="select-input" id="select-input" dir="rtl">
      <option value="Choose">انتخاب کنید</option>
      <option value="Choose">کاربر ثبات</option>
      <option value="Choose">کاربر اداره کل</option>
    </select>
    <div class="label-section" id="label-section">
      <label for="select-input">انتخاب نقش</label>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.select-box {
  background-color: #f3f4f6;
  padding: 0.5rem;
  height: fit-content;
  display: grid;
  grid-template-columns: 3fr 1fr;
  width: 90%;
  border-top-right-radius: 6px;
  border-top-left-radius: 6px;
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
