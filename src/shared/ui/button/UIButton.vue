<script lang="ts" setup>
interface Props {
  /**
   * Visual style of the button.
   * @default "primary"
   */
  variant?: "primary" | "secondary" | "ghost" | "danger";
  /**
   * Size of the button.
   * @default "md"
   */
  size?: "sm" | "md" | "lg";
  /**
   * Native HTML button type.
   * `submit` submits the form, `reset` clears it, `button` does nothing by default.
   * @default "button"
   */
  type?: "button" | "submit" | "reset";
  /**
   * Disables the button so the user cannot interact with it.
   * Applies both the native `disabled` attribute and the
   * `ui-button--disabled` modifier class.
   * @default false
   */
  disabled?: boolean;
  /**
   * Shows a loading spinner and disables the button.
   * Useful during async operations (e.g. form submission)
   * to prevent duplicate clicks.
   * @default false
   */
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
