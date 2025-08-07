<template>
  <div class="select-box bg-[#f3f4f6] h-fit grid grid-cols-[3fr_1fr] w-[90%] rounded-t-[6px_6px]">
    <select @change="SendType" v-model="SelectedType"
            class="select-input bg-[#dbeafe] border-0 rounded-[6px] text-[16px] focus:outline-0"
            id="select-input" dir="rtl">
      <option class="bg-[white] border-0" value="انتخاب کنید">انتخاب کنید</option>
      <option class="bg-[white] border-0" value="کاربر ثبات">کاربر ثبات</option>
      <option class="bg-[white] border-0" value="کاربر اداره کل">کاربر اداره کل</option>
    </select>
    <div class="flex justify-center items-center">
      <label class="text-center text-[16px]" for="select-input">انتخاب نقش</label>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      SelectedType: ""
    };
  },
  methods: {
    SendType() {
      this.$emit("SendType", this.SelectedType);
    }
  }
}
</script>

<style scoped>
.select-box {
  padding: 0.5rem;
}

select {
  font-family: "B Nazanin", sans-serif;
  padding: 0.5rem;
}

option {
  font-family: YekanBakh, sans-serif;
}
</style>
