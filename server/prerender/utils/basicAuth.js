import auth from "basic-auth"

export const realm = "Ecomp"

export const authHeader = ["WWW-Authenticate", `Basic realm="${realm}"`]

export const validCredentials = {
  whitescape: "uploadcareftw",
}

export const checkCredentials = credentials => {
  if (!credentials) {
    return false
  }

  const {name, pass} = credentials

  if (validCredentials[name] === pass) {
    return true
  }

  return false
}

export default function checkAuth(req) {
  return checkCredentials(auth(req))
}
