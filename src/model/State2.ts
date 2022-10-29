import {lens} from "lens.ts";

export type State<A> = {
  value: A
  set: (f: (a: A) => A) => void
  focus: <B extends keyof A>(b: B) => State<A[B]>
}

export const state = <A>(a: A): State<A> => {

  const l = lens<A>()

  const s: State<A> = {
    value: a,
    set: f => {
      const b = f(a)
    },
    focus: (b) => {
      throw new Error('')
    }
  }

  return s
}