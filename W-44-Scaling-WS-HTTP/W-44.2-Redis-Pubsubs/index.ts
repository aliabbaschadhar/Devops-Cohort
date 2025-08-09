import { GameManager } from "./store";
import { startLogger } from "./logger";

const gameManager = GameManager.getInstance();

startLogger()

setInterval(() => {
  gameManager.addGame(Math.random().toString());
}, 2000)