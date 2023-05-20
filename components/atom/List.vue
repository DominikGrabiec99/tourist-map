<template>
  <div class="list">
    <slot name="top" />
    <component
      :is="enumerateList ? 'ol' : 'ul'"
      class="list list-outside list-decimal"
      :class="{
        'list-inside list-disc': !enumerateList,
        'list-none': none,
        'list-square': square,
      }"
    >
      <li
        v-for="(item, index) in list?.length ? list : Object.keys($slots)"
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

<script setup lang="ts">
const props = defineProps({
  listName: {
    type: String,
    require: true,
  },
  list: {
    type: Array,
    default: () => [],
  },
  enumerateList: {
    type: Boolean,
    default: false,
  },
  none: {
    type: Boolean,
    default: false,
  },
  square: {
    type: Boolean,
    default: false,
  },
  liClass: {
    type: String,
    require: '',
  },
});
</script>
