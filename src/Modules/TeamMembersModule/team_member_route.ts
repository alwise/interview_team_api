import { Router,Request,Response } from "express";
import {handleRequestData} from "../../MiddleWare";
import { AuthMiddleware } from "../UsersModule";
import {TeamMemberController, TeamMemberMiddleware} from '.';


export default Router()
        .post('/create',TeamMemberMiddleware.validateCreate,async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.create))

        .delete('/delete',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.delete))

        .get('/:id',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.findByUid))

        
        .get('/',async (req: Request, res: Response) =>
        await handleRequestData(req, res, TeamMemberController.findAllByOptions));