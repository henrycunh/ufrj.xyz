<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Subject } from '~~/composables/grade-store'

const { subject } = defineProps<{
    subject: Subject
}>()

const { currentSemesterId } = storeToRefs(useGradeStore())
const { removeSubject, addGrade } = useGradeStore()

const isExpanded = ref(false)

const gradeAverage = computed(() => subject.grades.reduce((acc, curr) => curr + acc, 0) / Math.max(subject.grades.length, 1))

const onToggle = () => isExpanded.value = !isExpanded.value
const onDelete = () => removeSubject(currentSemesterId.value, subject.id) 
const onAddGrade = () => addGrade(currentSemesterId.value, subject.id)
</script>

<template>
    <div 
        p-3 glass rounded-2  
        gap-5 transition
    >
        <div flex items-center gap-5>
            <div>
                <div text-primary-300 text-3 sm:text-4>
                    {{ subject.name }}
                </div>
                <div mt-1 flex gap-3
                    :class="[
                        'children:text-coolgray-500', 'children:text-2', 'children:sm:text-3',
                        'children:b-1', 'children:b-coolgray-300', 'children:px-2', 'children:py-1',
                    ]"
                >
                    <div >
                        {{ subject.hours }} horas
                    </div>
                    <div text-coolgray-500 text-2 sm:text-3>
                        {{ subject.credits }} créditos
                    </div>
                </div>
            </div>
            <div ml-auto flex flex-col items-center>
                <animated-text font-bold :value="gradeAverage.toFixed(2)" />
                <div text-coolgray-400 text-3>
                    Nota
                </div>
            </div>
            <div @click="onToggle" ux-button ml-2 px-1 py-1>
                <div i-carbon-caret-down transition :class="[
                    {[`rotate-180`]: isExpanded},
                ]"/>
            </div>
        </div>
        <div v-if="isExpanded" flex mt-4 items-center>
            <div flex mr-auto gap-2>
                <subject-grade 
                    v-for="grade, idx in subject.grades"
                    :key="idx"
                    :grade="grade"
                    :index="idx"
                    :subject-id="subject.id"
                />
                <div ux-button @click="onAddGrade" px-2>
                    <div i-carbon-add text-4 sm:text-5 text-primary font-bold/>
                </div>
            </div>
            <div flex align-top text-3 sm:text-4>
                <div @click="onDelete" 
                    ux-button
                >
                    <div i-carbon-trash-can />
                    <div ml-1>
                        Deletar
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
