"use server";
import * as auth from "@/auth";


export async function signIn(params:type) {
    return auth.signIn ("github")    
}

export async function signOut(params:type) {
    return auth.signOut()    
}


