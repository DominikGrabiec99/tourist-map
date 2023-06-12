<template>
  <div class="list">
    <slot name="top" />
    <component
      data-test="list"
      :is="enumerateList ? 'ol' : 'ul'"
      class="list list-outside list-decimal"
      :class="{
        'list-inside list-disc': !enumerateList,
        'list-none': none,
        'list-square': square,
      }"
    >
      <li
        v-for="(item, index) in list"
        :key="`${listName}-item-${index}`"
        class="list-item"
        :class="liClass"
      >
        <slot :item="item" :index="index">
          <span v-html="item" />
        </slot>
      </li>
    </component>
    <slot name="bottom" />
  </div>
</template>

<script setup lang="ts" generic="T">
const props = withDefaults(
  defineProps<{
    listName?: string;
    list?: T[];
    enumerateList?: boolean;
    none?: boolean;
    square?: boolean;
    liClass?: string;
  }>(),
  {
    listName: '',
    list: () => [],
    enumerateList: false,
    none: false,
    square: false,
    liClass: '',
  }
);
</script>
