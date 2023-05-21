<template>
  <nav>
    <template v-if="user">
      <NuxtLink class="flex items-end" to="/global-map">Profil</NuxtLink>
      <NuxtLink class="flex items-end" to="/global-map">Mapa</NuxtLink>
    </template>
    <template v-else>
      <NuxtLink class="flex items-end pr-2" to="">
        <AtomButton class="rounded-full px-6" secondary text="Zaloguj się" />
      </NuxtLink>
      <NuxtLink class="flex items-end" to="">
        <AtomButton class="rounded-full px-6" text="Zarejestruj się" />
      </NuxtLink>
    </template>
  </nav>
</template>

<script setup lang="ts">
const { user: undefined } = defineProps<{ user?: Object | undefined}>();
</script>
