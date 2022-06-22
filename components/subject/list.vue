<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { subjects } = storeToRefs(useGradeStore())
</script>

<template>
    <div glass p-3 sm:rounded-2 relative>
        <div text-coolgray-600 font-bold mb-2 text-5>
            Matérias do semestre
        </div>
        <div v-if="subjects.length" relative>
            <semester-summary mb-3/>
            <div>
                <subject-item 
                    v-for="subject in subjects" :key="subject.id" 
                    :subject="subject" 
                    mb-2
                />
            </div>
        </div>
        <div v-else>
            <div text-coolgray-500 text-2 sm:text-3>
                Nenhuma matéria cadastrada
            </div>
        </div>
    </div>
</template>
