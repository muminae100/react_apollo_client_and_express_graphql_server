import { useQuery } from "@apollo/client";
import { ALL_AUTHORS_QUERY } from "../GraphQl/Queries";

export const useAllAuthors = () =>{
    const { data, error, loading } = useQuery(ALL_AUTHORS_QUERY);

    return{
        data, 
        error,
        loading
    }
}