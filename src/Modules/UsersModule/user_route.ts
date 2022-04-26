import { Router,Request,Response } from "express";
import {handleRequestData,} from "../../MiddleWare";
import {AuthMiddleware,UserController} from '.';

export default Router()
        .post('/create',AuthMiddleware.validateUserRegistration,AuthMiddleware.userAlreadyExist,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.create))
        .patch('/update',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.update))

        .delete('/delete',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.delete))

        .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.findByUid))

        .get('/',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.findAllByOptions))