import {atomWithStorage} from "jotai/utils";
import {Transaction} from "../data/Model";
import {atom} from "jotai";

export const transactionsAtom = atomWithStorage<Array<Transaction>>('transactions', [])
export const filteredTransactionsAtom = atom<Array<Transaction>>([])

export const excludeBeforeDateAtom = atom<string>('2023-05')
export const excludeAfterDateAtom = atom<string>('2024-06')
export const excludedCategoriesAtom = atomWithStorage<Array<string>>('excluded-categories', [])