import { Router,Request,Response } from "express";
import {handleRequestData,AuthMiddleware} from "../../MiddleWare";
import {InviteMiddleware,InviteController} from '.';

export default Router()
        .post('/create',InviteMiddleware.validateInviteData,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.create))
        .get('/validate',InviteMiddleware.isValidLinkAnUserExist)
        .get('/accept',InviteMiddleware.isValidLink,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.acceptInvite))
        .get('/:id',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.findByUid))
        .get('/',AuthMiddleware.authenticated,async (req: Request, res: Response) =>
        await handleRequestData(req, res, InviteController.findAllByOptions))