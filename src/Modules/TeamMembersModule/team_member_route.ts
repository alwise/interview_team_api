import { Router,Request,Response } from "express";
import {handleRequestData,AuthMiddleware} from "../../MiddleWare";
import {TeamMemberController, TeamMemberMiddleware} from '.';


export default Router()
        .post('/create',TeamMemberMiddleware.validateCreate,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.create))

        .delete('/delete',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.delete))

        .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.findByUid))

        .get('/',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.findAllByOptions));