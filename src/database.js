import fs from 'node:fs/promises'

// informa o caminho até chegar no arquivo aberto
//  console.log(import.meta.url)

// 1) novo do arquivo
// 2) caminho relativo onde quero criar o arquivo
const databasePath = new URL('../db.json', import.meta.url)
// console.log(databasePath)
export class Database {
  #database = {}

  constructor(){
    fs.readFile(databasePath, 'utf8').then(data => {
      this.#database = JSON.parse(data)
    }).catch(() => {
      this.#persist()
    })
  }


  // criando na raiz do projeto
  #persist(){
    fs.writeFile(databasePath, JSON.stringify(this.#database))
  }

  select(table) {
    const data = this.#database[table] ?? []
    return data
  }

  insert(table, data) {
    if(Array.isArray(this.#database[table])){
      this.#database[table].push(data)
    } else {
      this.#database[table] = [data]
    }
    this.#persist()
    return data
  }

  delete(table, id) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table].splice(rowIndex, 1)
      this.#persist()
    }
  }

  update(table, id, data) {
    const rowIndex = this.#database[table].findIndex(row => row.id === id)

    if(rowIndex > -1) {
      this.#database[table][rowIndex] = { id, ...data}
      this.#persist()
    }
  }

}