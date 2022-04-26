import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import Config from "../../Config";
import { UserInt } from "../../Helpers/interfaces";
import {Request,Response} from 'express'
import { failedResponse, successResponse } from "../../MiddleWare/RequestHandler";
import {User} from "./";
import { Op } from "sequelize";


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
            token: AuthMiddleware.tokenize({
              uid: user?.uid,
              email: user?.email,
              name: user?.name,
              username: user?.username,
            }),
          };
          return data;
      },

      authenticated: async (req: Request, res: Response, next: any)=>{
        try {
            const authHeader = req.headers.authorization;
            if(!authHeader) return res.send(failedResponse({message:'Unauthorized user',statusCode:508,error:[{message:'Authorization token not provided.'}]}));
            
            const token = authHeader.split(" ")[1] || '';
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
            if(user?.email?.length === 0 && user?.username?.length === 0) return res.send(failedResponse({message:'email or username is required'}));
            if(user?.password?.length === 0) return res.send(failedResponse({message:'password is required'}));

            const options = user?.email.length > 0 ? {email :user.email} : {username: user?.username}
            const exist = await User.findOne({where:{...options}});

            if(!exist?.uid || exist?.uid == null || exist?.uid?.length < 5 || exist?.uid == '') return res.send(failedResponse({message:'wrong login credentials'}))

            const isPasswordMatch = AuthMiddleware.decodePassword(user?.password,exist.password);
            if(isPasswordMatch === false)return res.send(failedResponse({message:'wrong login credentials'}))
            
            const data = AuthMiddleware.loginResponse({
                uid:exist.uid,
                email:exist?.email,
                name:exist?.name,
                username:exist?.username
            });
            return res.send(successResponse({message:'Login successfully',data}));
        } catch (error) {
            return res.send(failedResponse({message:'Unable to complete request',error}));
        }
      },

      validateUserRegistration: async (req: Request, res: Response, next: any) =>{
            try {
                const user:Partial<UserInt> = req.body;
                console.log(' validating data:   ',user);
                
                if(!user?.email) return res.send(failedResponse({message:'email is required'}));
                if(!user?.username) return res.send(failedResponse({message:'username is required'}));
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

      userAlreadyExist: async (req: Request, res: Response, next: any) =>{
            try {
                const user:Partial<UserInt> = req.body;
               const exist = await User.findOne({where:{[Op.or]:[{email:user.email},{username:user.username}]}});
               if(!exist?.uid || exist?.uid  == undefined || exist?.uid .length <3 ) return next();

               if(exist.email === user.email) return res.send(failedResponse({message:'email is already used',})); 

               if(exist.username === user.username) return res.send(failedResponse({message:'username is already used',})); 
                req.body = user;
                return next();
            } catch (error) {
                return res.send(failedResponse({message:'Unable to complete request',error}));
            }
      },

}


export default AuthMiddleware;