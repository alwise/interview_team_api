import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Config from "../../Config";
import { UserInt } from "../../Helpers/interfaces";
import {Request,Response} from 'express'
import { failedResponse, successResponse } from "../../MiddleWare/RequestHandler";
import {User} from "./";
import { UserPasswordReset } from "./user_model";
import moment from "moment";
import { emailTemplate, sendEmail } from "../../MessageServices";


const AuthMiddleware = {
      encodePassword: (password: string) => {
        const hash = bcrypt.hashSync(password, 10);
        return hash;
      },
    
      decodePassword: (password: string, passwordHash: string) => {
        return bcrypt.compareSync(password, passwordHash);
      },

      tokenize: (data: Partial<UserInt>) => {
        return jwt.sign(
            data,
            Config.keys.tokenSecrete,
            { expiresIn: "1yr" }
            );
      },

      loginResponse:async(user:Partial<UserInt>)=>{
        const data = {
            uid: user?.uid,
            email: user?.email,
            name: user?.name,
            profilePhoto:user?.profilePhoto,
            registeredWith:Config.s3.options.secretAccessKey,
            accessWithWith:Config.s3.options.accessKeyId,
            token: await AuthMiddleware.tokenize({
              uid: user?.uid,
              email: user?.email,
              name: user?.name,
              profilePhoto:user?.profilePhoto,
            }),
          };
          return data;
      },

      authenticated: async (req: Request, res: Response, next: any)=>{
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader) return res.send(failedResponse({message:'Unauthorized user',statusCode:508,error:[{message:'Authorization token not provided.'}]}));
            
            const token = authHeader; //.split("")[1] || '';
            jwt.verify(token, Config.keys.tokenSecrete, (err:jwt.VerifyErrors,  user: Partial<UserInt>) => {
            if (err) {
                return res.send(
                    failedResponse({statusCode:508, message:'Your session has expired login required',error:err })
                );
            }
            req.body.tokenData = JSON.parse(JSON.stringify(user));
            return next();
            });
        } catch (error) {
            return res.send(
                failedResponse({message:'Unable to complete request',error})
            );
        }

      },

      login: async (req: Request, res: Response) =>{
        try {
            const user:Partial<UserInt> = req.body;
            if(user?.email?.length === 0 || !user?.email.includes('@') || !user?.email.includes('.com')) return res.send(failedResponse({message:'Invalid email provided'}));
            if(user?.password?.length === 0) return res.send(failedResponse({message:'password is required'}));

            // const options = user?.email.length > 0 ? {email :user.email} : {username: user?.username}
            const exist = await User.findOne({where:{email:user?.email}});

            if(!exist?.uid || exist?.uid == null || exist?.uid?.length < 5 || exist?.uid == '') return res.send(failedResponse({message:'wrong login credentials'}))

            const isPasswordMatch = AuthMiddleware.decodePassword(user?.password,exist.password);
            if(isPasswordMatch === false)return res.send(failedResponse({message:'wrong login credentials'}))
            
            const data = await AuthMiddleware.loginResponse({
                uid:exist.uid,
                email:exist?.email,
                name:exist?.name,
                profilePhoto:exist.profilePhoto
                // username:exist?.username
            });
            return res.send(successResponse({message:'Login successfully',data}));
        } catch (error) {
            return res.send(failedResponse({message:'Unable to complete request',error}));
        }
      },

      validateUserRegistration: async (req: Request, res: Response, next: any) =>{
            try {
                const user:Partial<UserInt> = req.body;
                if(!user?.email || user?.email?.length === 0 || !user?.email.includes('@') || !user?.email.includes('.com')) return res.send(failedResponse({message:'Invalid email provided'}));
                if(!user?.password || user?.password?.length < 4) return res.send(failedResponse({message:'password must be at least 4 characters'}));
                user.password = AuthMiddleware.encodePassword(user?.password);
                const newEmail = user?.email?.toLowerCase();
                user.email = newEmail;
                req.body = user;
                return next();
            } catch (error) {
                return res.send(failedResponse({message:'Unable to complete request',error}));
            }
      },

      validateUpdateData: async (req: Request, res: Response, next: any) =>{
            try {
                const user:Partial<UserInt> = req.body;
                if(user?.email && !user?.email.includes('@') && !user?.email.includes('.com')) return res.send(failedResponse({message:'Invalid email provided'}));
                
                if(user?.email){
                  const exist = await User.findOne({where:{email:user?.email}})
                  
                  if(exist?.uid){
                      if(exist?.uid.trim() !== user?.uid?.trim())return res.send(failedResponse({message:'email is already used'}));
                  }
                  const newEmail = user?.email?.toLowerCase();
                  user.email = newEmail;
                }
               
                req.body = user;
                return next();
            } catch (error) {
                return res.send(failedResponse({message:'Unable to complete request',error}));
            }
      },

      userAlreadyExist: async (req: Request, res: Response, next: any) =>{
            try {
                const user:Partial<UserInt> = req.body;
               const exist = await User.findOne({where:{email:user.email}});
               if(!exist?.uid || exist?.uid  == undefined || exist?.uid .length <3 ) return next();

               if(exist.email === user.email) return res.send(failedResponse({message:'email is already used',})); 

            //    if(exist.username === user.username) return res.send(failedResponse({message:'username is already used',})); 
                req.body = user;
                return next();
            } catch (error) {
                return res.send(failedResponse({message:'Unable to complete request',error}));
            }
      },

      requestPasswordReset: async (req:Request,res:Response)=>{
          try {
            const user:Partial<UserInt> = req.body;
            if(user?.email?.length === 0 || !user?.email.includes('@') || !user?.email.includes('.com')) return res.send(failedResponse({message:'Invalid email provided'}));
            if(user?.password?.length === 0)  return res.send(failedResponse({message:'password is required'}));
            if(user?.password?.length < 4)  return res.send(failedResponse({message:'password must be at least 4 characters'}));

            const userExist = await User.findOne({where:{email:user?.email}});
            if(!userExist?.uid || userExist?.uid?.length == undefined) return res.send(failedResponse({message:'No account found with this email'}));
            const expireAt = moment().add(10,'minute').format('YYYY-MM-DD HH:mm:ss')
            const resetData = await UserPasswordReset.create({
                uid:userExist.uid,
                password:AuthMiddleware.encodePassword(user?.password),
                expiry:expireAt
            })

            const result = await  sendEmail({
                Messages:[
               { From:{
                  Email:Config.email.senderMail,
                  Name:Config.email.senderName,
                },
                To:[
                  {
                    Email:userExist?.email,
                    Name:`Hi there,`
                  }
                ],
                Subject:'Password Reset',
                TextPart:`Confirm your password reset using this link ${Config.frontEnd.passwordResetLink}${resetData?.id}`,
                HTMLPart: emailTemplate.inviteTemplate({title:'Confirm reset', groupName:'Password Reset',message:'This is a request made earlier today for your password to be changed. kindly click the button below to confirm this request.',link:`${Config.frontEnd.passwordResetLink}${resetData?.id}`})
               }]
          });
            
            return res.send(successResponse({data:result,message:'Confirmation email have been sent to you. Kindly check your spam if it is not in your inbox. This link is valid for 10 minutes from now.'}))

          } catch (error) {
            return res.send(failedResponse({message:'Unable to complete request',error}));
          }
      },

      resetPasswordReset: async (req:Request,res:Response)=>{
          try {
            const {id} = req.body;
            if(!id || id == undefined ) return res.send(failedResponse({message:'Invalid link'}));
            

            const linkExist = await UserPasswordReset.findByPk(id);
            if(!linkExist?.uid || linkExist?.uid == undefined) return res.send(failedResponse({message:'Invalid link'}));

            const expired = moment(linkExist?.expiry).isBefore(new Date(),'dates');

            if(expired == true) return res.send(failedResponse({message:'Password reset link expired'}));

            const userExist = await User.findByPk(linkExist?.uid);

            if(!userExist?.uid || userExist?.uid?.length == undefined) return res.send(failedResponse({message:'Unauthorized user'}));

           await User.update({
                password:linkExist?.password
            },{where:{uid:linkExist?.uid}})
            const newExpireDate = moment().subtract(10,'minute').format('YYYY-MM-DD HH:mm:ss')
            await UserPasswordReset.update({
                expiry:newExpireDate
            },{where:{id:linkExist?.id}})

            return res.send(successResponse({message:'Password reset successfully'}))

          } catch (error) {
            return res.send(failedResponse({message:'Unable to complete request',error}));
          }
      }

}


export default AuthMiddleware;