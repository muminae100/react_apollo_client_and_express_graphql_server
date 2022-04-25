import { useQuery } from "@apollo/client";
import { ALL_BOOKS_QUERY } from "../GraphQl/Queries";

export const useAllBooks = () =>{
    const { data, error, loading } = useQuery(ALL_BOOKS_QUERY);

    return{
        data, 
        error,
        loading
    }
}