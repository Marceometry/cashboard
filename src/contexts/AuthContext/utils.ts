import { GoogleUser } from './types'

export const formatUser = (user: GoogleUser) => {
  return user
    ? {
        id: user.uid,
        email: user.email,
        name: user.displayName,
        photoUrl: user.photoURL,
      }
    : null
}
