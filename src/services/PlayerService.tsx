import { ICharacter, ICharacterData } from "../models/character.model";

class PlayerService {
	getPlayerCharacters = (): Promise<ICharacter[]> => {
		const characters = require('../mockData/playerCharacters.json').data as ICharacter[];
		return new Promise<ICharacter[]>((resolve) => {
			setTimeout(() => resolve(characters), 1000);
		});
	}
	getPlayerCharacterData = (id: string): Promise<ICharacterData> => {
		const characters = require('../mockData/characterData.json').data as ICharacterData[];
		return new Promise<ICharacterData>((resolve) => {
			setTimeout(() => resolve(characters.filter(x => x.id === id)[0]), 1000);
		});
	}	
}

export default new PlayerService();