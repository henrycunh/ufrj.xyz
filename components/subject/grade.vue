<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const { subjectId, grade, index } = defineProps<{ grade: number, index: number, subjectId: string }>()

const { currentSemesterId } = storeToRefs(useGradeStore())
const { updateGrade, deleteGrade } = useGradeStore()
const { closeModal } = useModal()

const isInputOpen = ref(false)

const onOpenModal = () => isInputOpen.value = true
const incrementGrade = (value: number) => updateGrade({
    semesterId: currentSemesterId.value,
    subjectId,
    gradeIndex: index,
    value: grade + value
})

const onDeleteGrade = () => {
    deleteGrade({
        semesterId: currentSemesterId.value,
        subjectId,
        gradeIndex: index
    })
    isInputOpen.value = false
    closeModal()
}
</script>

<template>
    <div>
        <div 
            ux-button flex-col font-bold px-2 sm:px-4
            @click="onOpenModal"
        >
            <div text-primary-300 text-3 sm:text-4>
                {{ grade.toFixed(1) }}
            </div>
            <div text-2 sm:text-3 text-coolgray-400>
                P{{index + 1}}
            </div>
        </div>
        <modal v-model="isInputOpen">
            <div>
                <div text-coolgray-600 font-bold mb-2>
                    Alterar nota
                </div>
                <div 
                    w-full 
                    text-center text-6 text-primary font-bold
                    b-1 b-coolgray-200 
                    py-2 rounded bg-coolgray-100
                    shadow
                >
                    {{ grade.toFixed(1) }}
                </div>
                <div flex justify-between mt-4 text-10px sm:text-4 max-w-420px mx-auto>
                    <div
                        v-for="step in [-1, -0.5, -0.1, 0.1, 0.5, 1]"
                        ux-button @click="incrementGrade(step)"
                        items-center text-coolgray-500
                    >
                        <div text-primary relative top-1px>
                            <div v-if="step < 0" i-carbon-subtract />
                            <div v-else i-carbon-add />
                        </div>
                        {{ Math.abs(step) }}
                    </div>
                </div>
                <div ux-button mt-4 b-red-200 text-red @click="onDeleteGrade">
                    <div i-carbon-delete />
                    Deletar
                </div>
            </div>
        </modal>
    </div>
</template>
