<script lang="ts" setup>
import {
  nextTick,
  onBeforeUnmount,
  useTemplateRef,
  watch,
} from "vue";

import { UIButton } from "@/shared/ui/button";
import { UIIcon } from "@/shared/ui/icon";

interface Props {
  open: boolean;
  title: string;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const dialog = useTemplateRef<HTMLDialogElement>("dialog");

let previousBodyOverflow: string | null = null;

function lockPageScroll() {
  if (
    typeof document === "undefined" ||
    previousBodyOverflow !== null
  ) {
    return;
  }

  previousBodyOverflow = document.body.style.overflow;
  document.body.style.overflow = "hidden";
}

function unlockPageScroll() {
  if (
    typeof document === "undefined" ||
    previousBodyOverflow === null
  ) {
    return;
  }

  document.body.style.overflow = previousBodyOverflow;
  previousBodyOverflow = null;
}

function requestClose() {
  emit("close");
}

function handleBackdropClick(event: MouseEvent) {
  const currentDialog = dialog.value;

  if (!currentDialog || event.target !== currentDialog)
    return;

  const rect = currentDialog.getBoundingClientRect();
  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) requestClose();
}

watch(
  () => props.open,
  async (isOpen) => {
    await nextTick();

    if (!dialog.value) return;

    if (isOpen) {
      if (!dialog.value.open) dialog.value.showModal();
      lockPageScroll();
      return;
    }

    if (dialog.value.open) dialog.value.close();
    unlockPageScroll();
  },
  { immediate: true },
);

onBeforeUnmount(() => {
  if (dialog.value?.open) dialog.value.close();
  unlockPageScroll();
});
</script>

<template>
  <dialog
    ref="dialog"
    class="ui-drawer"
    @cancel.prevent="requestClose"
    @click="handleBackdropClick"
    @keydown.esc.prevent.stop="requestClose"
  >
    <header class="ui-drawer__header">
      <h2 class="ui-drawer__title">{{ title }}</h2>

      <UIButton
        type="button"
        variant="secondary"
        size="icon-lg"
        aria-label="Закрити модальне вікно"
        @click="requestClose"
      >
        <UIIcon name="close" :size="24" />
      </UIButton>
    </header>

    <div class="ui-drawer__content">
      <slot />
    </div>
  </dialog>
</template>

<style lang="scss" scoped>
@use "./drawer";
</style>
