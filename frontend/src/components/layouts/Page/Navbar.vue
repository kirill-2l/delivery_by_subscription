<script lang="ts" setup>
import { useUserStore } from '@/stores/user/user.store';

const userStore = useUserStore();
</script>

<template>
  <header
    class="flex w-full flex-none border-b border-gray-950/10 bg-white/[0.5] backdrop-blur-md backdrop-filter transition-colors duration-300 lg:z-50 dark:border-gray-50/[0.2] dark:bg-gray-950/[0.5]"
  >
    <!-- content -->
    <div class="mx-auto flex max-w-screen-2xl flex-1 items-center justify-between px-4">
      <!-- title -->
      <div>
        <slot name="title">
          <NuxtLink to="/" class="text-primary-500 text-lg font-bold">
            <span class="capitalize">Home</span>
          </NuxtLink>
        </slot>
      </div>
      <div class="flex items-center space-x-4">
        <!--      <div class="flex items-center space-x-4" :class="{ 'divide-x divide-gray-500': menus.length > 0 }">-->
        <div class="flex space-x-3 pl-4 text-xl"></div>
      </div>
      <BaseAvatar v-if="userStore.isLoggedIn" />
    </div>
    <!-- misc -->
    <!-- drawer -->
  </header>
</template>
