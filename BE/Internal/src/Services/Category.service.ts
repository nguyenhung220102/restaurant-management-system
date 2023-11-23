import { NextFunction, Request, Response } from 'express';
import {Message} from '../Utils';
import {HttpStatusCode} from '../Constants';
import { container } from '../Configs';
import statusMess from '../Constants/statusMess';
import { ICategoryRepository } from '../Repositories/ICategoryRepository';
import { TYPES } from '../Repositories/type';
import { validationResult } from "express-validator";
/// <reference path="./types/globle.d.ts" />
import {
	ValidationError,
    RecordNotFoundError
} from "../Errors";

export class CategoryService {
    constructor(private categoryRepository = container.get<ICategoryRepository>(TYPES.ICategoryRepository)) {}

    public async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const status: number = HttpStatusCode.Success;
            const data = await this.categoryRepository.all();
            res.status(status).send(data);
            Message.logMessage(req, status);
        }
        catch (err) {
            console.log(err)
			next(err);
        }
    }
    public async createCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const status: number = HttpStatusCode.Success;
            const data = await this.categoryRepository.create(req.body);
            if (!data) {
				throw new RecordNotFoundError("Category do not exist");
			}
            res.status(status).send(statusMess.Success);
            Message.logMessage(req, status);
        }
        catch (err) {
            console.log(err)
			next(err);
        }
    }
    public async deleteCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const status: number = HttpStatusCode.Success;
            const data = await this.categoryRepository.delete(parseInt(req.params.id));
            if (!data) {
				throw new RecordNotFoundError("Category do not exist");
			}
            res.status(status).send(statusMess.Success);
            Message.logMessage(req, status)
        }
        catch (err) {
            console.log(err)
			next(err);
        }
    }
    public async getCategory(req: Request, res: Response, next: NextFunction) {
        try {
            const status: number = HttpStatusCode.Success;
            console.log(req.params.id)
            const data = await this.categoryRepository.findById(parseInt(req.params.id));
            if (!data) {
				throw new RecordNotFoundError("Category do not exist");
			}
            res.status(status).send(data);
            Message.logMessage(req, status);
        }
        catch (err) {
            console.log(err)
			next(err);
        }
    }

    public async getProducts(req: Request, res: Response, next: NextFunction) {
        try {
            const status: number = HttpStatusCode.Success;
            const category = await this.categoryRepository.findById(parseInt(req.params.id));
            if (!category) {
				throw new RecordNotFoundError("Category do not exist");
			}
            res.status(status).send(await category.getProducts());
            Message.logMessage(req, status);
        }
        catch (err) {
            console.log(err)
			next(err);
        }
    }
}
