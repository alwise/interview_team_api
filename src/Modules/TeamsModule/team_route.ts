import { Router,Request,Response } from "express";
import {handleRequestData} from "../../MiddleWare";
import {TeamMiddleware,TeamController} from '.';
// import { AuthMiddleware } from "../UsersModule";

export default Router()
        .post('/create',TeamMiddleware.validateTeamCreation,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.create))

        .patch('/update',TeamMiddleware.validateTeamUpdate,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.update))

        .delete('/delete',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.delete))

        .get('/:id',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.findByUid))

        .get('/',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamController.findAllByOptions))