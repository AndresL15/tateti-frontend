import axios from "axios"
import { environment } from "../app/environment/environment"

export interface Game {
  char: string
  id: string
}

export interface Winner {
  char: string
}

export interface State {
  status: string
}

export async function create(params: {
  name: string
  player1: string | null
}): Promise<Game> {
  const res = (await axios.post(environment.backendUrl + "/games", params))
    .data as Game
  setChar(res.char)
  setGame(res.id)
  return res
}

export async function join(params: {
  name: string
  player2: string | null
}): Promise<Game> {
  const res = (await axios.post(environment.backendUrl + "/join", params))
    .data as Game
  setChar(res.char)
  setGame(res.id)
  return res
}

export async function fill(params: {
  index: string
  id: string | null
  char: string | null
  player: string | null
}): Promise<Game> {
  const res = (await axios.post(environment.backendUrl + "/fill", params))
  .data as Game
  return res
}

export async function refresh(params: {
  id: string | null
}): Promise<State> {
  const res = (await axios.post(environment.backendUrl + "/refresh", params))
    .data as State
  return res
}

export async function checkWinner(params: {
  id: string | null
}): Promise<Winner> {
  const res = (await axios.post(environment.backendUrl + "/winner", params))
    .data as Winner
  return res
}

function setChar(char: string) {
  localStorage.setItem("char", char)
}

function setGame(id: string) {
  localStorage.setItem("id", id)
}


