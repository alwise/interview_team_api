import multerS3 from 'multer-s3';
import  aws from 'aws-sdk';
import Config from '../Config';
import multer from 'multer';
import handleRequestData, { RequestData, ResponseData } from '../MiddleWare/RequestHandler';
import { Router,Response,Request } from 'express';
const  s3 = new aws.S3({...Config.s3.options});
const currentTime = new Date().getTime();

const  upload = () => { 
   
    return multer({
    storage: multerS3({
        s3,
        bucket: `teamsprofile/photos`,
        acl:Config.s3.options.ACL,
        metadata (req, file, cb) {
        cb(null, {fieldName: file?.fieldname});
        },
        key (req, file, cb) {
           cb(null, `${new Date().getTime()}.jpg`)
        }
  })})};


const handleFileUpLoad = async (request:RequestData):Promise<ResponseData> =>{
   
    try {
        return {
            data:{url:request.file?.location},
            statusCode:200,
            message:'File uploaded successfully',
            status:true
        }
        
    } catch (error) {
        return {
            statusCode:500,
            message:'Unable to complete request',
            status:false
        }
    }
   
}

export default Router()
            .post('/upload',upload().single('file'), async (req:Request,res:Response) =>
                 await handleRequestData(req,res,handleFileUpLoad))