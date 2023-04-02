<template>
  <div class="w-full bg-gradient-to-r from-sky-400 to-pink-600 pb-px">
    <div class="h-full w-full bg-white">
      <div class="px-4 py-2 drop-shadow-lg">
        <NuxtLink class="flex items-end" to="/">
          <AtomImage class="h-12" src="favicon.png" alt-text="Tourist App" />
          <AtomTitle
            class="pl-1 text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-pink-600"
            tag="h1"
            content="Tourist App"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>