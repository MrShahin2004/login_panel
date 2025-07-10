<template>
  <div class="select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%] rounded-t-[6px_6px]">
    <select class="select-input" dir="rtl">
      <option value="Choose">انتخاب کنید</option>
      <option value="Choose">کاربر ثبات</option>
      <option value="Choose">کاربر اداره کل</option>
    </select>
    <div class="label-section flex justify-center items-center">
      <label class="text-center text-[16px]" for="select-input">انتخاب نقش</label>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.select-box {
  padding: 0.5rem;
}

select {
  font-family: "B Nazanin", sans-serif;
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
