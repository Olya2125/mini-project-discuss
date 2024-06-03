"use server"

import { redirect } from "next/navigation";


export  async function search(formData: FormData) {
    const id = formData.get('id');

    if (typeof id !== 'string' || !id){
        redirect('/');
    }

    redirect(`/search?term=${id}`);
}