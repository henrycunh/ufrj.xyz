export const useModal = () => {
    const currentModalId = useState<string>('current-modal-id', () => '')
    const isModalOpen = useState<boolean>('is-modal-open', () => false)

    const componentModalID = ref(Math.random().toString(36).slice(2))

    const openModal = () => {
        currentModalId.value = componentModalID.value
        isModalOpen.value = true
    }

    const closeModal = () => {
        currentModalId.value = ''
        isModalOpen.value = false
    }

    const isOpenOnCurrentModal = computed(() => currentModalId.value === componentModalID.value && isModalOpen.value)

    return {
        openModal,
        closeModal,
        isModalOpen,
        isOpenOnCurrentModal,
        currentModalId
    }
}