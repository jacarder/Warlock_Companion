export interface ICharacter {
	id?: string,
	name?: string,
	background?: string,
	userId?: string
}

export interface ICharacterData extends ICharacter {
	community?: string,
	career?: string,
	pastCareers?: string,
	stamina?: number,
	luck?: number,
	skills: ICharacterSkill[]
}

export interface ISkill {
	name: string,
	displayName: string
}

export interface ICharacterSkill extends ISkill {
	level: number,
	isChecked: boolean
}