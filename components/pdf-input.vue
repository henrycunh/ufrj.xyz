<script lang="ts" setup>
import { storeToRefs } from 'pinia';

const { getSubjectsFromPDF } = usePDF()
const { addSubject } = useGradeStore()
const { currentSemesterId } = storeToRefs(useGradeStore())

const pdfFile = ref<File | null>()

const onFileChange = async(event: Event) => {
    const file = (event.target as HTMLInputElement)?.files[0]
    if (file) 
        pdfFile.value = file

    const subjectList = await getSubjectsFromPDF(file)
    if (subjectList) {
        subjectList.forEach(subject => {
            subject.semesterId = currentSemesterId.value
            addSubject(currentSemesterId.value, subject)
        })
    } 
}
</script>

<template>
    <div flex justify-center text-coolgray-500 items-center mx-auto>
        <label for="file-input" flex flex-col items-center justify-center >
            <div i-carbon-upload text-5 mb-2/>
            <div text-center text-3>
                Envie sua CRID em PDF para carregar suas matérias
            </div>
        </label>
        <input id="file-input" type="file" @change="onFileChange" display-none>

    </div>
</template>
