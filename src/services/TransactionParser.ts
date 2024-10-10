import {Transaction} from "../data/Model";
import Papa from "papaparse";
import {Errors, Validation} from "io-ts";
import * as E from 'fp-ts/Either'
import * as M from 'fp-ts/Monad'
import * as F from 'fp-ts/Functor'
import * as t from 'io-ts'
import _ from 'lodash'

const DollarString = new t.Type<number, string, unknown>(
  'DollarString',
  (u): u is number => typeof u === 'number' ,
  (u, c) =>
    E.either.chain(t.string.validate(u, c), (s) => {
      if(s.startsWith('$')) {
        return t.success(_.toNumber(s.slice(1).replace('.', '')))
      } else {
        return t.failure(u, c)
      }
    }),
  (a) => `$`
)

const parseDollarAmount = (inflow: any, outflow: any): t.Validation<number> => {

  const numbers = E.chain<Errors, number, [number, number]>(inNum =>
    E.map<number, [number, number]>(outNum => [inNum, outNum])(DollarString.decode(outflow))
  )(DollarString.decode(inflow))

  return E.map<[number, number], number>(nums => {
    const [inNum, outNum] = nums
    return inNum >= outNum ? inNum : -outNum
  })(numbers)
}

const parseYNAB = (row: any): Validation<Transaction> => {
  return E.chain(amount =>
    Transaction.decode({
      account: row.Account,
      category: row.Category,
      group: row['Category Group'] || 'Empty',
      date: row.Date,
      payee: row.Payee,
      amountInCents: amount
    })
  )(parseDollarAmount(row.Inflow, row.Outflow))
}

export const parseTransactions = (file: File): Promise<Readonly<Array<Transaction>>> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      complete: function(results) {
        console.log(results)
        E.fold<Errors, Readonly<Array<Transaction>>, void>(
          reject,
          resolve
        )(E.traverseArray(parseYNAB)(results.data))
      },
      error(error: Error) {
        reject(error)
      }
    })
  })
}