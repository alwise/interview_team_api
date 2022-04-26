import axios from 'axios';
import MailJet from 'node-mailjet'
import Config from '../Config';
// Email Interfaces

interface FromTo{
    Email:string;
    Name?:string
}

interface EmailInt{
    From:FromTo;
    To:FromTo[];
    Subject:string;
    TextPart?:string;
    HTMLPart?:string
}
export interface EmailMessageInt{
    Messages:EmailInt[]
}


const emailSender = MailJet.connect(Config.email.privateKey, Config.email.publicKey,);

const sendEmail = async ( data:EmailMessageInt  )=>{
    const request = await emailSender
    .post("send", {'version': 'v3.1'})
    .request(
        data
        // {
        // Messages: [data]
        // "Messages":[{
        //     "From": {
        //         "Email": "alwisestudio@gmail.com",
        //         "Name": "School Message"
        //     },
        //     "To": [{
        //         "Email": "kemevoralwise@gmail.com",
        //         "Name": "Elvis Kemevor"
        //     }],
        //     "Subject": "Your email flight plan!",
        //     "TextPart": "Dear passenger 1, welcome to Mailjet! May the delivery force be with you!",
        //     "HTMLPart": "<h3>Dear passenger 1, welcome to <a href=\"https://www.mailjet.com/\">Mailjet</a>!</h3><br />May the delivery force be with you!"
        // }]
    // }
    )

   return request.body;
}


export default sendEmail;
