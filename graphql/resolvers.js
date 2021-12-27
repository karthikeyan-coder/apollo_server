import {bookmodel} from '../mongoDB/models.js'
import _ from 'lodash'
export const resolvers = {
    Query : {
        getBooks: async ()=>{
          return await bookmodel.find()
        }
    },
    Mutation : {
        createBook: (_,args,) => {
            console.log('args', args)
            let add = new bookmodel(args.input)
            return add.save()
        }
    }
}
