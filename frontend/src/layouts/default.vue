<template>
  <div class="h-screen overflow-x-hidden">
    <div class="flex h-full flex-col">
      <LayoutPageNavbar class="h-[64px] max-h-[64px]" />
      <div class="flex flex-grow">
        <LayoutPageSidebar class="w-[200px]" />
        <LayoutPageContent class="flex-grow p-6">
          <slot />
        </LayoutPageContent>
      </div>
      <LayoutPageFooter class="h-[52px] md:h-[42px]" />
    </div>
  </div>
</template>
<script setup lang="ts"></script>
