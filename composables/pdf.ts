import * as pdfjs from 'pdfjs-dist'
import { TextItem, TypedArray } from 'pdfjs-dist/types/src/display/api'
import { Subject } from './grade-store'

const extractPDFContent = async(buffer: TypedArray) => {
    return new Promise<Subject[]>(async (resolve, reject) => {
        const doc = await pdfjs.getDocument(new Uint8Array(buffer)).promise
        const page = await doc.getPage(1)
        const textContent = await page.getTextContent()
        const textItems = textContent.items
        resolve(parseSubjects(textItems as TextItem[]))
    })
}

const parseSubjects = (textItems: TextItem[]) => {
    const groupByHeight = textItems.reduce((acc, curr) => {
        const height = curr.transform[4]
        const width = curr.transform[5]
        const item = { text: curr.str, width, height }
        acc[height] = height in acc ? [...acc[height], item] : [item]
        return acc
    }, {})
    const subjects = Object.values(groupByHeight)
        .map((line: any[]) => line
            .sort((a, b) => a.width - b.width)
            .map((item: any) => item.text)
            .filter((text: string) => text.trim().length > 0)
        )
        .filter((line: string[]) => line[0].match(/^\d+$/))
        .map(([id, code, name, hours, credits]) => ({
            code, name, hours, credits, id, grades: [0]
        })) as Subject[]
    return subjects
}

export const usePDF = () => {
    const getSubjectsFromPDF = (file: File) => {
        pdfjs.GlobalWorkerOptions.workerSrc = "//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.14.305/pdf.worker.js"
        return new Promise<any[]>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = (e) => {
                const buffer = e.target?.result as ArrayBuffer
                if (!buffer) {
                    reject('No buffer')
                    return
                }
                const bufferView = new Uint8Array(buffer)
                extractPDFContent(bufferView).then(resolve).catch(reject)
            }
            reader.readAsArrayBuffer(file)
        })
    }

    return { getSubjectsFromPDF, extractPDFContent }
}