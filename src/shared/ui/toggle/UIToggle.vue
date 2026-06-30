<script lang="ts" setup>
interface Props {
  label: string;
  /**
   * @default "md"
   */
  size?: "sm" | "md";
}

const { label, size = "md" } = defineProps<Props>();

const modelValue = defineModel<boolean>();

const emit = defineEmits<{
  toggle: [checked: boolean];
}>();

function onToggle(checked: boolean) {
  modelValue.value = checked;
  emit("toggle", modelValue.value);
}
</script>

<template>
  <button
    class="ui-toggle"
    :class="[
      `ui-toggle--${size}`,
      modelValue && 'ui-toggle--checked',
    ]"
    type="button"
    :aria-pressed="modelValue"
    @click="onToggle(!modelValue)"
  >
    {{ label }}
  </button>
</template>

<style lang="scss" scoped>
@use "./toggle.scss";
</style>
