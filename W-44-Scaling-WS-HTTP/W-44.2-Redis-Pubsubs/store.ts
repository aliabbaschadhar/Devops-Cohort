interface Game {
  id: string,
  whitePlayer: string,
  blackPlayer: string,
  moves: string[]
}
// export const games: Game[] = [] // Instead of using the in-memory array on which we don't have a lot of control like mutation. 
// We will create a class to manage the game state, which is called as singleton pattern.
// In singleton pattern, we ensure that a class has only one instance and provide a global point of access to it.

export class GameManager {
  private static instance: GameManager;
  private games: Game[] = [];

  private constructor() {
    this.games = []; // Initialize the games array
  }
  // Now outside of the class no one can create an instance of GameManager bcz the constructor is private.

  static getInstance(): GameManager {
    if (!GameManager.instance) {
      GameManager.instance = new GameManager();
    }
    return GameManager.instance;
  }

  addMove(gameId: string, move: string) {
    console.log(`Adding move ${move} to game ${gameId}`);
    const game = this.games.find(game => game.id === gameId);
    if (game) {
      game.moves.push(move);
    }
    console.log(`Move added successfully`);
  }

  addGame(gameId: string, whitePlayer: string = 'Alice', blackPlayer: string = 'Bob', moves: string[] = []) {
    const game: Game = {
      id: gameId,
      whitePlayer: whitePlayer,
      blackPlayer: blackPlayer,
      moves: moves
    };
    this.games.push(game);
  }

  logGames() {
    console.log(this.games)
  }
}