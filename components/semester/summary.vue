<script lang="ts" setup>
import { storeToRefs } from 'pinia'

const { semesterCR, semesterAverage } = storeToRefs(useGradeStore())
</script>

<template>
    <div sticky top-6 p-4 glass rounded-2 backdrop-blur flex gap-4 z-10>
        <semester-metric label="CR Semestral" :value="semesterCR"/>
        <semester-metric label="Média Semestral" :value="semesterAverage"/>
    </div>
</template>
