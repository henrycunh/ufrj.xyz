<script lang="ts" setup>
defineProps<{ value: number, label: string }>()
</script>

<template>
    <div flex flex-col items-center bg-primary text-white w-24 p-2 rounded-2>
        <div font-bold text-5>
            <animated-text :value="value.toFixed(2)" />
        </div>
        <div text-3>
            {{ label }}
        </div>
    </div>
</template>