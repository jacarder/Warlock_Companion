import { where } from "firebase/firestore";
import { ICharacter, ICharacterData } from "../models/character.model";
import FirebaseService from "./FirebaseService";

class PlayerService {
	getPlayerCharacters = async (userId: string): Promise<ICharacterData[]> => {
		const conditions = [
			where("userId", "==", userId)
		];
		const data = FirebaseService.getData('character', conditions);
		return (await data).docs.map(data => data.data() as ICharacterData);
	}
	getPlayerCharacterData = async (userId: string, id: string): Promise<ICharacterData> => {
		const conditions = [
			where("userId", "==", userId), 
			where("id", "==", id)
		];
		const data = FirebaseService.getData('character', conditions);
		return (await data).docs.map(data => data.data() as ICharacterData)[0]
	}
	savePlayerCharacter = (userId: string, id: string, data: ICharacterData) => {
		FirebaseService.saveToDatabase(userId, 'character', id, data);
	}	
}

export default new PlayerService();