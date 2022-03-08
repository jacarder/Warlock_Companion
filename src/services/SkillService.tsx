import { ISkill } from "../models/character.model";

class PlayerService {
	getSkillList = (): ISkill[] => {
		let skills = require('../data/skillList.json') as ISkill[];
		return skills;
	}
}

export default new PlayerService();