<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { semesters, currentSemesterId } = storeToRefs(useGradeStore())
</script>

<template>
    <select 
        glass px-2 py-2 b-1 
        b-coolgray-200 font-bold text-coolgray-700
        rounded-2
        v-model="currentSemesterId"
    >
        <option v-for="semester in semesters" :value="semester.id">
            {{ semester.name }} semestre
        </option>
    </select>
</template>
