
import { Request,Response } from 'express';
type responseMessage = 'Updated successfully' | 'Request completed successfully' |'Created successfully' | 'Deleted successfully' | 'Unable to complete request' |'Data retrieved successfully.' | 'One or more field is required' | 'File uploaded successfully' | 'Unauthorized user' | 'Your session has expired login required' |'password must be at least 4 characters' | 'username is required' | 'password is required' | 'email is required' |'email is already used' | 'username is already used' | 'email or username is required' |'wrong login credentials' | 'Login successfully' | 'Team name is required' | 'User already assigned to team' | 'Invalid invitation link' | 'You have successfully accepted invite'
// type responseStatus = true | false
export interface RequestData {
  file?:any;
  params: any;
  queries: any;
  body: any;
}
export interface ResponseData {
  status: boolean;
  message: responseMessage ; // | string | object | number | any[]
  statusCode: 200 | 400 | 500 | 508; // success , error from client , internal error, unauthorized
  data?: string | any[] | object | number;
  error?: string | any[] | object | number;
}

export type callback = (requestData: RequestData)=> Promise<ResponseData>

 const handleRequestData = async (
  req: Request,
  res: Response,
  callBack: callback
) => {
    try {
     const result =  await callBack({
       file:req?.file,
        params:req?.params,
        body:req.body,
        queries:req.query});
        return res.send(result);
    } catch (error) {
      return res.send({
          status:false,
          message:'unable to complete request.',
          statusCode: 500 ,
          error : { message:error?.message, error}}
      );
    }
 };


 export const successResponse = (data:Partial<ResponseData>) : ResponseData =>{
    return {
        status:data?.status || true,
        message:data?.message || 'Request completed successfully',
        statusCode:data?.statusCode || 200,
        data:data?.data || []
    }
 }

 export const failedResponse = (data:Partial<ResponseData>) : ResponseData =>{
    return {
        status:data?.status || true,
        message:data?.message || 'Unable to complete request',
        statusCode:data?.statusCode || 500,
        // data:data?.data || [],
        error:data?.error,
    }
 }


export default  handleRequestData

