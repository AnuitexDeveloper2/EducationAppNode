import { PrintingEditionType } from "../shared/enums/printingEditionType";
import { Author } from "../authors/api";
import authorModel from "../../dataAccess/entityModels/author";

export interface PrintingEdition {
    title: string;
    description: string;
    price: number;
    currency: string;
    productType: PrintingEditionType;
    removed_at: boolean;
    author_ids: Array<authorModel>
}
