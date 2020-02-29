<template>
  <q-card flat class="fit flex flex-center">
    <q-card-section class="text-center q-gutter-y-md">
      <div class="text-h4">Data is empty ↙</div>
      <div class="text-indigo-7 text-subtitle1">
        <slot name="subtitle"></slot>
      </div>
      <div>
        <slot name="addBtn"></slot>
      </div>
    </q-card-section>
  </q-card>
</template>
