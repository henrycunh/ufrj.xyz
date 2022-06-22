<script lang="ts" setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' },
  ]
})

onMounted(() => {
    window.oncontextmenu = (event: PointerEvent) => {
        // If not started by a mouse, return false
        return event.pointerType === 'mouse'
    }
})
</script>


<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
html {
  background: #dbdff0;
  -webkit-touch-callout: none !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none !important;
}


* {
  touch-action: manipulation !important;
}
</style>