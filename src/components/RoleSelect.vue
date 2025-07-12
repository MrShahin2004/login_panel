<template>
  <div class="select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%] rounded-t-[6px_6px]">
    <select class="select-input bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
            id="select-input" dir="rtl">
      <option class="bg-[white] border-0" value="Choose">انتخاب کنید</option>
      <option class="bg-[white] border-0" value="Choose">کاربر ثبات</option>
      <option class="bg-[white] border-0" value="Choose">کاربر اداره کل</option>
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
}
</style>
