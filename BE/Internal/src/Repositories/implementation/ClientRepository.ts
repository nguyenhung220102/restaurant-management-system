import { injectable } from "inversify";
import "reflect-metadata";
import { IClientRepository } from "../IClientRepository";
import { BaseRepository } from "./BaseRepository";
import { Client } from "../../Models";
import Token from "../../Models/Token";
import { REFRESH_TOKEN } from "../../Constants";
import { Op } from "sequelize";

@injectable()
export class ClientRepository
	extends BaseRepository<Client>
	implements IClientRepository {
	constructor() {
		super(Client, ["id", "firstname", "lastname", "phone", "email", "gender","type", "birthday", "source", "score", "createdAt", "updatedAt"]);
	}

    public async findByEmail(email: string): Promise<Client | null> {
        return await this._model.findOne({ where: { email: email } });
    }

    public async findByProfit(profit: number) {
        return await this._model.findAll({
            where: { profit: { [Op.gt]: profit } },
        });
    }

	public async findByType(type: string) {
        return await this._model.findAll({
            where: { type: type },
        });
    }

    public async removeToken(token: string, user: Client): Promise<Client> {
        let tokens = await user.getTokens();
        tokens = tokens.filter((tokenObj: Token) => tokenObj.value !== token);

        return await user.save();
    }

	public async checkExist(phone: string, email: string) {
		return await this._model.findAll({
			where: {
				phone: phone,
				email: email
			}
		})
	}

	public async findByCond(cond: any) {
		return await this._model.findAll(cond)
	}

	public async updateBaseCond(value: any, cond:any){
		return await this._model.update(value, cond)
	}
}
