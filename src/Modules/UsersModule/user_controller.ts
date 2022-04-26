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

}

export default UserController;