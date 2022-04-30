import { RequestData, ResponseData, successResponse } from "../../MiddleWare/RequestHandler"
import UserOperations from "./user_model"
import {AuthMiddleware} from '.'
const UserController = {

    create:async (userData:RequestData):Promise<ResponseData>=>{
        const data = await UserOperations.create(userData?.body);
        const result = await AuthMiddleware.loginResponse(data);
        return successResponse({message:'Created successfully',data:result });
    },

    update:async (userData:RequestData):Promise<ResponseData>=>{
        const data = await UserOperations.update(userData?.body);
        return successResponse({message:'Updated successfully',data });
    },

    delete:async (userData:RequestData):Promise<ResponseData>=>{
        const data = await UserOperations.delete(JSON.parse(JSON.stringify(userData?.queries)));
        return successResponse({message:'Deleted successfully',data });
    },

    findByUid:async (userData:RequestData):Promise<ResponseData>=>{
        const data = await UserOperations.findOneByID(JSON.parse(JSON.stringify(userData?.queries))?.uid);
        return successResponse({message:'Data retrieved successfully.',data });
    },

    findAllByOptions:async (userData:RequestData):Promise<ResponseData>=>{
        const data = await UserOperations.findManyByOptions(JSON.parse(JSON.stringify(userData?.queries)));
        return successResponse({message:'Data retrieved successfully.',data });
    },
    findForTeam:async (userData:RequestData):Promise<ResponseData>=>{
        const {id} = JSON.parse(JSON.stringify(userData?.queries));
        const ids = [];
        id?.forEach(idVal => {
            ids.push(idVal);
        });
        // console.log(ids);
        
        if(ids.length < 1)return successResponse({message:'Data retrieved successfully.',data:[] });
        const data = await UserOperations.findForTeam(ids);
        return successResponse({message:'Data retrieved successfully.',data });
    },

}

export default UserController;