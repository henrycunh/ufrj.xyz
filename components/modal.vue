<script lang="ts" setup>
const props = defineProps<{
    modelValue?: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const {
    openModal, isOpenOnCurrentModal
} = useModal()

watchEffect(() => {
    const currentModalState = props.modelValue
    if (!isOpenOnCurrentModal.value)
        emit('update:modelValue', false)
    if (currentModalState === true)
        openModal()
})
</script>

<template>
    <Teleport v-if="isOpenOnCurrentModal" to="#modal-content">
        <slot />
    </Teleport>
</template>
