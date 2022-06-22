<script lang="ts" setup>
import { storeToRefs } from 'pinia';
import { Subject } from '~~/composables/grade-store';

const userInput = ref()
const { currentSemesterId } = storeToRefs(useGradeStore())
const { addSubject } = useGradeStore()

watchEffect(() => {
    if (userInput.value) {
        const lines = userInput.value.split('\n')
        const subjects: Subject[] = lines.map((line): Subject => {
            const [, name, hours, credits] = line.match(/[^ ]+ [^ ]+ ([^\d]+) (\d+) ([\d\.]+)/) || []
            return { 
                name,
                hours: Number(hours), 
                credits: Number(credits), 
                id: (name || '').toLowerCase().replace(/ /g, '-'),
                grades: [0]
            }
        })
        for (const subject of subjects)
            addSubject(currentSemesterId.value, subject)
        
        
        userInput.value = ''
    }
})
</script>

<template>
    <div w-full box-border glass
            p-5 font-sans
            resize-none sm:rounded-2 h-24 text-4
            overflow-hidden flex items-center
        >
        <pdf-input />
    </div>
</template>
