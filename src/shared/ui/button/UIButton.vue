<script lang="ts" setup>
interface Props {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
}

const {
  variant = "primary",
  size = "md",
  type = "button",
  disabled = false,
  loading = false,
} = defineProps<Props>();
</script>

<template>
  <button
    class="ui-button"
    :class="[
      `ui-button--${variant}`,
      `ui-button--${size}`,
      loading && 'ui-button--loading',
      disabled && 'ui-button--disabled',
    ]"
    :type="type"
    :disabled="disabled || loading"
    data-testid="ui-button"
  >
    <span v-if="loading" class="ui-button__loader" />
    <slot />
  </button>
</template>

<style lang="scss" scoped>
@use "./button";
</style>
