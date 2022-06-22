import axios, { AxiosError } from "axios"
import { environment } from "../app/environment/environment"
import { updateSessionToken, cleanupSessionToken } from "../store/tokenStore"
import { cleanupSessionUser, updateSessionUser } from "../store/userStore"

// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
axios.defaults.headers.common["Content-Type"] = "application/json"

export interface User {
  id: string
  name: string
}

export interface Token {
  token: string
}

export async function register(params: {
  name: string
  password: string
}): Promise<Token> {
  const res = (await axios.post(environment.backendUrl + "/users", params))
    .data as Token
  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser({token: res.token}).then()
  return res
}

export async function login(params: {
  name: string
  password: string
}): Promise<Token> {
  const res = (
    await axios.post(environment.backendUrl + "/login", params)
  ).data as Token

  setCurrentToken(res.token)
  updateSessionToken(res.token)
  void reloadCurrentUser({token: res.token}).then()
  return res
}

export async function logout(): Promise<void> {
  localStorage.removeItem("token")
  localStorage.removeItem("user")

  try {
    await axios.get(environment.backendUrl + "/logout")
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = ""
    return
  } catch (err) {
    return
  } finally {
    cleanupSessionToken()
    cleanupSessionUser()
  }
}

function setCurrentToken(token: string) {
  localStorage.setItem("token", token)
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  axios.defaults.headers.common.Authorization = "Bearer " + token
}

// Valores almacenados en LOCAL STORE
function getCurrentToken(): string | undefined {
  const result = localStorage.getItem("token")
  return result ? result : undefined
}

export async function reloadCurrentUser(params: {
  token: string
}): Promise<User> {
  try {
    const res = (await axios.post(environment.backendUrl + "/users/current", params))
      .data as User
    localStorage.setItem("user", res.name)
    updateSessionUser(res)
    return res
  } catch (err) {
    const axiosError = err as AxiosError
    if (axiosError.response && axiosError.response.status === 401) {
      void logout()
    }
    throw err
  }
}

function getCurrentUser(): User | undefined {
  return localStorage.getItem("user") as unknown as User
}

if (getCurrentToken()) {
  const currentUser = getCurrentUser()
  const currentToken = getCurrentToken()
  if (currentUser !== undefined && currentToken !== undefined) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    axios.defaults.headers.common.Authorization = "Bearer " + currentToken
    updateSessionToken(currentToken)
    updateSessionUser(currentUser)
    void reloadCurrentUser({token: currentToken}).then()
  }
}
