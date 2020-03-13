import Users from '../../../dataAccess/entityModels/user'
import { Role } from '../enums/role'
import bcrypt from "bcrypt";
import userModel from '../../../dataAccess/entityModels/user';
import authorModel from '../../../dataAccess/entityModels/author';
import Authors from '../../../dataAccess/entityModels/author';
import printingEditionModel from '../../../dataAccess/entityModels/printing-edition';
import  PrintingEditions  from '../../../dataAccess/entityModels/printing-edition';
import { PrintingEdition } from '../../printing-editions/api';
import { PrintingEditionType } from '../enums/printingEditionType';


export class Init {

    admin: Users;
    author: Authors; 
    printingEdition: PrintingEditions;
    private  checkModel = userModel;

   constructor () {
       this.admin = new Users();
       this.author = new Authors()
       this.printingEdition = new PrintingEditions();
   }
    
   public async Check() {
       this.initAdmin();
       this.initAuthor();
       this.initProdiuct();
    }
    
     private async initAdmin(): Promise<userModel> {

        let result = await userModel.find();
        if (result.length == 0) {
            const admin: userModel = new Users({
                userName: 'Morgenshtern88',
                firstName: 'Vladimir',
                lastName: 'Goncharuk',
                email: 'morgenshtern1988@gmail.com',
                role: Role.Admin,
                passwordHash: '25012005'
            })
            
            var salt = bcrypt.genSaltSync(10);
            admin.passwordHash = bcrypt.hashSync('25012005',salt);
            admin.save();
            return admin;
        }
        return this.admin
    }

    private async initAuthor(): Promise<authorModel> {
        let result = await authorModel.find();
        if (result.length == 0) {
            const author: authorModel = new Authors({
                name: ' Terry Pratchett'
            })
            author.save();
            return author;
                }
        return this.author;
    }

    private async initProdiuct(): Promise<printingEditionModel> {

        let result = await printingEditionModel.find();

        if (result.length == 0) {
            const printingEdition: printingEditionModel = new PrintingEditions ({
                title: 'The Colour of Magic',
                description: 'The Colour of Magic is a 1983 comic fantasy novel by Terry Pratchett',
                cover_image: 'http/:',
                type: PrintingEditionType.Book,
                price: 25,
                currency: 'USD',
                author_ids: '5e3d1c71c818e21204ac2b8b'
            })          
            printingEdition.save();
            return printingEdition;
        }

        return this.printingEdition

    }
}



