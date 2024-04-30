

import React from 'react';
import Link from 'next/link';
import { Button } from "@nextui-org/react";
import * as action from "@/actions";
import { auth } from "@/auth";
import "./header.css";
import { useState } from 'react';


export default async function  ()  {
  const session = await auth();

  return (
    <main>
    <header className="header">
      <nav>
        <ul>
          <li>
            <Link href="/">
              <h2>Discuss</h2>
            </Link>
          </li>
          <li>
            <Link href="/about">
              <h2>Search</h2>
            </Link>
          </li>
          <li >
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
          </li>
        </ul>
      </nav>
    </header>
    </main>
  );
};



