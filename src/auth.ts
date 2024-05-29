// import NextAuth from "next-auth";
// import GitHub from "@auth/core/providers/github";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { db } from "@/db";


// const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
// const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

// if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
// throw new Error("Missing GitHub credentials!")
// }

// export const {handlers: {GET, POST}, signIn, signOut, auth} = NextAuth({
//     adapter: PrismaAdapter(db),
// providers: [
//     GitHub ({
// clientId: GITHUB_CLIENT_ID,
// clientSecret: GITHUB_CLIENT_SECRET,
//     })
// ],
// callbacks: {
//     async session({session, user}: any){
//         if ( session && user ) {
//             session.user.name = user.name
//         }
//         return session;
//     }
// }
// })
import NextAuth from "next-auth";
import GitHub from "@auth/core/providers/github";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/db";

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

if (!GITHUB_CLIENT_ID || !GITHUB_CLIENT_SECRET) {
  throw new Error("Отсутствуют учетные данные GitHub!");
}

export const { handlers: { GET, POST }, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [
    GitHub({
      clientId: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (session && user) {
        session.user = {
          ...session.user,
          id: user.id,  // Добавьте идентификатор пользователя в объект сессии
        };
      }
      return session;
    },
  },
});
