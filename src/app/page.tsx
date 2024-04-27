import { Button } from "@nextui-org/react";
import * as action from "@/actions";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <main className="flex  flex-col items-center justify-between p-5">
      <form action={action.signIn}>
        <Button type="submit">Sign in</Button>
      </form>
      <form action={action.signOut}>
        <Button type="submit">Sign out</Button>
      </form>

      {session?.user ? (
        <div>
          <h3>Signed in</h3>
          <p>{JSON.stringify(session.user)}</p>
        </div>
      ) : (
        <div>signed out</div>
      )}
    </main>
  );
}
