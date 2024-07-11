<script lang="ts" setup>
import { getManagerProductsRoute } from '@/shared/const/routes';

const menu = [
  { name: 'Products', link: `/${getManagerProductsRoute()}` },
  // { name: 'Menu', link: 'manager/menu' },
  // { name: 'Orders', link: 'manager/orders' },
  // { name: 'Settings', link: 'manager/settings' },
];
</script>

<template>
  <aside id="default-sidebar" class="h-full" aria-label="Sidebar">
    <div class="h-full w-full overflow-y-auto bg-gray-50 px-3 py-4 dark:bg-gray-800">
      <ul class="space-y-2 font-medium">
        <li v-for="item in menu" :key="item.link">
          <NuxtLink
            :to="item.link"
            class="group flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
          >
            <span class="ms-3">{{ item.name }}</span>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </aside>
</template>
