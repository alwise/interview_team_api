import { Router,Request,Response } from "express";
import {handleRequestData} from "../../MiddleWare";
import {InviteMiddleware,InviteController} from '.';
import { AuthMiddleware } from "../UsersModule";
export default Router()
        .post('/create',InviteMiddleware.validateInviteData,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.create))
        .get('/validate',InviteMiddleware.isValidLinkAnUserExist)
        .get('/accept',InviteMiddleware.isValidLink,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.acceptInvite))
        .get('/:id',async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.findByUid))
        .get('/',async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.findAllByOptions))