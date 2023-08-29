declare module 'id-validator' {
  export default class {
    isValid(id: string): string
    getInfo(id: string): {
      sex: number
    }
  }
}
