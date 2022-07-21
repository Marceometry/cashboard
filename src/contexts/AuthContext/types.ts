export type GoogleUser = {
  email: string
  displayName: string
  photoURL: string
}

export type User = {
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
