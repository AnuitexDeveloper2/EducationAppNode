import axios from "axios"

export async function getPrintingEdition() {

   const result = await axios.post('http://localhost:8000/admin/printing-edition'
     
   )

        return result.data
}