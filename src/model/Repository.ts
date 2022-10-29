import React from 'react'

export const getStoreJson: <A>(n: string, a: A) => A = <A>(name: string, ifEmpty: A) => {
  const json = localStorage.getItem(name)
  if (json) {
    return JSON.parse(json) as A
  } else {
    return ifEmpty
  }
}

export const storeJson: <A>(n: string, a: A) => void = <A>(name: string, a: A) => {
  localStorage.setItem(name, JSON.stringify(a))
}

export const deleteStore: (n: string) => void = (name) => {
  localStorage.removeItem(name)
}

export type Repository<A> = {
  get: () => A
  set: (a: A) => void
  remove: () => void
}

export const useStoreRepository: <A>(n: string, a: A) => Repository<A> =
  <A>(key: string, ifEmpty: A) => {

    const get = () => getStoreJson<A>(key, ifEmpty)
    const set = (a: A) => storeJson(key, a)
    const remove = () => deleteStore(key)
    return {
      get,
      set,
      remove
    }
  }

export const useStateRepository = <A>(a: A): Repository<A> => {
  console.log(`useStateRepo`, a)
  const [value, setValue] = React.useState<A>(a)

  const get = () => value
  const set = (aa: A) => setValue(p => aa)
  const remove = () => {
    set(a)
  }

  return { get, set, remove }
}