import { Router,Request,Response } from "express";
import {handleRequestData,} from "../../MiddleWare";
import {UserController} from '.';
import AuthMiddleware from "./user_middle_ware";

export default Router()
        .post('/create',AuthMiddleware.validateUserRegistration,AuthMiddleware.userAlreadyExist,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.create))

        .post('/login',AuthMiddleware.login)
        .post('/request-reset',AuthMiddleware.requestPasswordReset)
        .patch('/reset-password',AuthMiddleware.resetPasswordReset)
        .patch('/update',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.update))

        .delete('/delete',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.delete))

        // .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        // await handleRequestData(req, res, UserController.findByUid))

        .get('/',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.findAllByOptions))

        .get('/for-team',async (req: Request, res: Response) =>
        await handleRequestData(req, res, UserController.findForTeam))