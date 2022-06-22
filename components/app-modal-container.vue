<script lang="ts" setup>

const { isModalOpen, closeModal } = useModal()
const onOverlayClick = () => {
    if (isModalOpen.value) {
        closeModal()
    }
}
</script>

<template>
    <div>
        <div :class="[
                'bg-coolgray-800/80', 
                {[`op100 z-99999`]: isModalOpen}
            ]" 
            op-0
            fixed top-0 bottom-0 left-0 right-0 transition
            z--1
            @click="onOverlayClick"
        />
        <div 
            ref="container"
            :class="[
                '--limit-width',
                {[`op100 z-999999`]: isModalOpen}
            ]"
            op-0
            fixed bottom-0 left-0 right-0 bg-white
            rounded-t-3 z--1 transition
            py-4
        >
            <div id="modal-content" p-6/>
        </div>
    </div>
</template>

<style scoped>
.--limit-width {
    --app-margin: max(0px, calc(((100vw - var(--app-max-width)) / 2)));
    left: var(--app-margin);
    right: var(--app-margin);
}
</style>
