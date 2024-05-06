import React from "react";
import * as action from "@/actions";
import { auth } from "@/auth";
import Logo from "@/components/logo/page";
import { Link, Button, Input } from "@nextui-org/react";
import "..//header/header.css";

export default async function () {
  const session = await auth();

  return (
    <main className="bg-blue-900">
      <header className="header">
        <nav>
          <ul>
            <li>
              <Link href="/">
                <Logo />
              </Link>
            </li>
            <li>
              <Link href="">
                <Input
                  classNames={{
                    base: "max-w-full sm:max-w-[10rem] h-10",
                    mainWrapper: "h-full",
                    input: "text-small",
                    inputWrapper:
                      "h-full font-normal text-default-500 bg-default-500/40 dark:bg-default-800/20",
                  }}
                  placeholder="Type to search..."
                  size="sm"
                  type="search"
                />
              </Link>
            </li>
            <div className="btn_block">
            <li className="hidden lg:flex buttons">
              
              <form action={action.signIn}>
                <Button
                  color="primary"
                  variant="solid"
                  size="md"
                  radius="sm"
                  type="submit"
                >
                  Sign in
                </Button>
              </form>
              <form action={action.signOut}>
                <Button
                  className="btn-signout"
                  color="primary"
                  size="md"
                  radius="sm"
                  variant="ghost"
                  type="submit"
                >
                  Sign out
                </Button>
              </form>
              </li>
              <li>
               {session?.user ? (
                <div className="welcome">
                  <h3>Welcome</h3>
                  {/* <p>{JSON.stringify(session.user)}</p> */}
                </div>
              ) : (
                <div>signed out</div>
              )} 
</li>
            </div>
          </ul>
        </nav>
      </header>
    </main>
  );
}
