import React from "react";
import * as action from "@/actions";
import { auth } from "@/auth";
import Logo from "@/components/logo/page";
import { Link, Button, Input } from "@nextui-org/react";
import styles from "@/components/styles.module.css";


export default async function () {
  const session = await auth();

  return (
    <main className="bg-blue-900">
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.ul}>
            <li className={styles.li}>
              <Link href="/">
                <Logo />
              </Link>
            </li>
            <li className={styles.li}>
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
              <div className={styles.buttons}>
            <li className="hidden lg:flex">
              
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
                  className={styles.btn_signout}
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
              </div>
              <li className={styles.wel}>
               {session?.user ? (
                <div className={styles.welcome}>
                  <h3>Welcome</h3>
                   <p>{JSON.stringify(session.user.name)}</p> 
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