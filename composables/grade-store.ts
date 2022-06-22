import { defineStore, acceptHMRUpdate } from 'pinia'

export const useGradeStore = defineStore('grade', {
    persist: true,
    state() {
        return {
            semesters: [],
            currentSemesterId: ''
        } as GradeStoreState
    },
    getters: {
        subjects: state => state.semesters.find(semester => semester.id === state.currentSemesterId)?.subjects || [],
        semesterCR (): number {
            const subjectsGrades = this.subjects.map(subject => ({
                average: subject.grades.reduce((acc, grade) => acc + grade, 0) 
                    / Math.max(subject.grades.length, 1),
                credits: Number(subject.credits)
            }))
            const gradesSum = subjectsGrades.reduce((acc, subject) => acc + subject.average * subject.credits, 0)
            const creditsSum = subjectsGrades.reduce((acc, subject) => acc + subject.credits, 0)
            return gradesSum / Math.max(creditsSum, 1)
        },
        semesterAverage (): number {
            const subjectsGrades = this.subjects.map(subject => ({
                average: subject.grades.reduce((acc, grade) => acc + grade, 0) / Math.max(subject.grades.length, 1),
                credits: subject.credits
            }))
            const gradesSum = subjectsGrades.reduce((acc, subject) => acc + subject.average, 0)
            return gradesSum / Math.max(subjectsGrades.length, 1)
        }
    },
    actions: {
        addSemester (semester: Semester) {
            this.semesters = [...this.semesters, semester]
        },

        addSubject (semesterId: string, subject: Subject) {
            this.semesters = this.semesters.map(semester => {
                if (semester.id === semesterId) {
                    semester.subjects = [...semester.subjects, subject]
                }
                return semester
            })
        },
        removeSubject (semesterId: string, subjectId: string) {
            this.semesters = this.semesters.map(semester => {
                if (semester.id === semesterId) {
                    semester.subjects = semester.subjects.filter(subject => subject.id !== subjectId)
                }
                return semester
            })
        },
        addGrade (semesterId: string, subjectId: string) {
            this.semesters = this.semesters.map(semester => {
                if (semester.id === semesterId) 
                    semester.subjects = semester.subjects.map(subject => {
                        if (subject.id === subjectId)
                            subject.grades = [...subject.grades, 0]
                        return subject
                    })
                return semester
            })
        },
        updateGrade ({ semesterId, subjectId, gradeIndex, value }: UpdateGradeParams) {
            console.log(value ,gradeIndex)
            this.semesters = this.semesters.map(semester => {
                if (semester.id === semesterId) 
                    semester.subjects = semester.subjects.map(subject => {
                        if (subject.id === subjectId)
                            subject.grades = subject.grades.map((grade, idx) => gradeIndex === idx ? value : grade)
                        return subject
                    })
                return semester
            })
        },
        deleteGrade ({ semesterId, subjectId, gradeIndex }: DeleteGradeParams) {
            this.semesters = this.semesters.map(semester => {
                if (semester.id === semesterId) 
                    semester.subjects = semester.subjects.map(subject => {
                        if (subject.id === subjectId)
                            subject.grades = subject.grades.filter((_, idx) => gradeIndex !== idx)
                        return subject
                    })
                return semester
            })
        }
    }
})

export interface Semester {
    id: string,
    name: string,
    subjects: Subject[]
}

export interface Subject {
    id: string
    code?: string
    name: string
    grades: number[]
    credits: number
    hours: number
}

interface GradeStoreState {
    semesters: Semester[]
    currentSemesterId: string
}

interface UpdateGradeParams {
    semesterId: string
    subjectId: string
    gradeIndex: number
    value: number
}

interface DeleteGradeParams {
    semesterId: string
    subjectId: string
    gradeIndex: number
}

if (import.meta.hot)
    import.meta.hot.accept(acceptHMRUpdate(useGradeStore, import.meta.hot))
