import { ICharacter } from "../models/character.model";

class PlayerService {
	getPlayerCharacters = (): Promise<ICharacter[]> => {
		const characters = require('../mockData/playerCharacters.json').data as ICharacter[];
		return new Promise<ICharacter[]>((resolve) => {
			setTimeout(() => resolve(characters), 1000);
		});
	}
}

export default new PlayerService();