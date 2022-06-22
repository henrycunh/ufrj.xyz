<script lang="ts" setup>
import { storeToRefs } from 'pinia';

useHead({
  meta: [{ name: 'og:title', content: `UFRJ XYZ` }],
  title: 'UFRJ XYZ',
})

const { semesters, currentSemesterId } = storeToRefs(useGradeStore())
const { addSemester } = useGradeStore()

onMounted(() => {
  if (semesters.value.length === 0) {
    ['Primeiro', 'Segundo', 'Terceiro', 'Quarto', 'Quinto', 'Sexto', 'Sétimo', 'Oitavo', 'Nono', 'Décimo'].forEach(semester => {
      addSemester({
        id: semester.toLowerCase(),
        name: semester,
        subjects: []
      })
    })

    currentSemesterId.value = semesters.value[0].id
  } 
})

</script>

<template>
  <div>
    <app-subject-input mt-6 />
    <subject-list mt-6/>
  </div>
</template>

<style>
:root {
  --primary: rgb(205, 15, 123);
  font-family: sans-serif;
}

.title {
  font-size: 32px;
  text-align: center;
  font-weight: bold;
  color: var(--primary);
}

button {
  background: var(--primary);
  color: white;
  padding: 8px 16px;
  font-weight: bold;
  border-radius: 6px;
}

textarea {
  box-shadow: 0 10px 16px -8px #00000055;
}

.input-container {
  display: flex;
  align-items: center;
  justify-content: center;
}

.lista-de-materias {
  margin: 40px auto;
  width: 560px;
  position: relative;
}

.lista-de-materias .cr {
  position: sticky;
  top: 40px;
  background: white;
  padding: 24px;
  box-shadow: 0 10px 16px -8px #00000055;
  border: 1px solid #f1f1f1;
  border-radius: 8px;
  text-align: right;
  color: var(--primary);
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 24px;
}


.lista-de-materias .materia {
  border-bottom: 4px solid var(--primary);
  padding: 8px;
}

.lista-de-materias .materia .acoes {
  display: flex;
}

.lista-de-materias .materia .nome {
  color: var(--primary);
  font-weight: bold;
}

.lista-de-materias .materia .info {
  display: flex;
  gap: 12px;
  margin-top: 8px;
  flex-grow: 1;
}

.lista-de-materias .materia .info > * {
  background: var(--primary);
  color: white;
  padding: 6px 12px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-weight: bold;
}

.lista-de-materias .materia .info > * .label {
  font-size: 10px;
  margin-top: 4px;
  text-transform: uppercase;
}

.materia  input {
  border: 1px solid var(--primary);
  padding: 8px 12px;
  border-radius: 6px;
  width: 60px;
} 
</style>