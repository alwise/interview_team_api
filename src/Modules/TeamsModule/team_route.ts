import { Router,Request,Response } from "express";
import {handleRequestData,AuthMiddleware} from "../../MiddleWare";
import {TeamMiddleware,TeamController} from '.';

export default Router()
        .post('/create',AuthMiddleware.authenticated,TeamMiddleware.validateTeamCreation,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.create))

        .patch('/update',AuthMiddleware.authenticated,TeamMiddleware.validateTeamUpdate,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.update))

        .delete('/delete',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.delete))

        .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.findByUid))

        .get('/',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.findAllByOptions))