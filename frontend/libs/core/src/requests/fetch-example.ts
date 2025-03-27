
export type fetchExampleType = {
  userId: number,
  id: number,
  title: string,
  completed: boolean
}

export const fetchExample = async (): Promise<fetchExampleType> => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/1')
  const data = await response.json()

  return data
}
