
import { redirect } from "next/navigation";


interface SearchPageProps {
    searchParams: {
        id:string;
    }
}

export default async function SearchPage({searchParams}:SearchPageProps) {
    const {id} = searchParams;

    if (!id) {
        redirect('/');
    }

    return (
        <div>

        </div>
    )
    
}