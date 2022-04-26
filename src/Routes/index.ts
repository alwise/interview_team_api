import { UserRoute } from "../Modules/UsersModule";
import { TeamRoute } from "../Modules/TeamsModule";
import { TeamMemberRoute } from "../Modules/TeamMembersModule";
import { InviteRoute } from "../Modules/InviteModule";
import { Router } from 'express';
import FileRoute from '../Helpers/file_manager'
import { failedResponse } from '../MiddleWare/RequestHandler';
export default Router().use('/users',UserRoute)
                        .use('/teams',TeamRoute)
                        .use('/invites',InviteRoute)
                        .use('/team-members',TeamMemberRoute)
                        .use('/file',FileRoute)
                        
                        