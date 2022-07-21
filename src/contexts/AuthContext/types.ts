export type GoogleUser = {
  uid: string
  email: string
  displayName: string
  photoURL: string
}

export type User = {
  id: string
  name: string
  email: string
  photoUrl: string
}

export type AuthContextData = {
  user: User | null
  isLoading: boolean
  signIn: () => Promise<void>
  signOut: () => Promise<void>
}
