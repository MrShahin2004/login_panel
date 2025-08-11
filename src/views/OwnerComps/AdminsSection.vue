<template>
  <div class="w-[100%] h-[100%] flex justify-center items-center">
    <div class="main-container w-[90%] h-[93%] rounded-[6px] border border-black border-solid">
      <div class="title-div w-[100%] h-[10%] flex justify-center items-center">
        <h2 class="text-[24px]">فهرست ادمین ها <i class="fas fa-user-shield"></i></h2>
      </div>
      <div class="button-div w-[100%] h-[10%] flex justify-center items-center">
        <button
            @click="$emit('fetch-admins')"
            class="h-fit bg-[var(--btn-bg)] rounded-[6px] cursor-pointer"
            style="color: white; padding: 0.5rem"
            :disabled="hasRun"
        >
          {{ ButtonText }}
        </button>
      </div>
      <div class="content-div w-[100%] h-[80%] flex justify-center items-center overflow-auto">
        <p v-if="admins.length === 0" class="big-placeholder text-[40px] opacity-50">
          .فعالیتی انجام نشده است
        </p>
        <ul v-else class="w-[90%] text-[20px]">
          <li v-for="user in admins" :key="user.id" class="py-2">
            {{ user.username || 'ادمین بدون نام' }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";

export default {
  props: {
    admins: {
      type: Array,
      default: () => [],
    },
    hasRun: {
      type: Boolean,
      default: false,
    },
  },
  setup(props) {
    // Computed property for button text
    const ButtonText = computed(() => {
      return props.hasRun ? '.نمایش انجام شد' : 'نمایش همه';
    });

    return {ButtonText};
  },
};
</script>

<style scoped>
/* Optional: Style the disabled button */
button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  opacity: 0.6;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  border-bottom: 1px solid #ccc;
}
</style>
