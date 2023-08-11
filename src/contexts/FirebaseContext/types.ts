import { Unsubscribe, User, UserCredential } from 'firebase/auth'
import { FirebaseDataSnapshot } from '@/hooks'
import {
  AddTransactionModel,
  RecurrentTransaction,
  TransactionModel,
} from '@/types'

export type FirebaseContextData = {
  isOnline: boolean
  onAuthChange: (callback: (user: any) => void) => Unsubscribe
  signInWithGoogle: () => Promise<UserCredential> | undefined
  firebaseSignOut: () => Promise<void> | undefined
  updateCurrentUser: (name: string) => Promise<void>
  deleteCurrentAccount: () => Promise<User | null | undefined>
  onTransactionsValue: (
    callback: (data: FirebaseDataSnapshot<AddTransactionModel>) => void
  ) => () => void
  remoteAddTransactionList: (
    transactions: FirebaseDataSnapshot<TransactionModel>
  ) => Promise<void> | undefined
  remoteAddTransaction: (
    transaction: TransactionModel
  ) => Promise<void> | undefined
  remoteRemoveTransaction: (id: string) => Promise<void> | undefined
  onRecurrencesValue: (
    callback: (data: FirebaseDataSnapshot<RecurrentTransaction>) => void
  ) => () => void
  remoteAddRecurrenceList: (
    recurrences: FirebaseDataSnapshot<RecurrentTransaction>
  ) => Promise<void> | undefined
  remoteAddRecurrence: (
    recurrence: RecurrentTransaction
  ) => Promise<void> | undefined
  remoteRemoveRecurrence: (id: string) => Promise<void> | undefined
}
