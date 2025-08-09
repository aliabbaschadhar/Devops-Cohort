import { GameManager } from "./store";

export function startLogger() {
  setInterval(() => {
    GameManager.getInstance().logGames();
  }, 2000)
}