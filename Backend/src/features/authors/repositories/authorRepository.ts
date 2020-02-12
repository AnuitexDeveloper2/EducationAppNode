import authorModel from "../../shared/db-models/author";
import userModel from "../../shared/db-models/user";


export function create(authorParam: authorModel): Promise<authorModel> {
    const author = new authorModel(authorParam);
        const result = authorModel.create(author);
        return result
}