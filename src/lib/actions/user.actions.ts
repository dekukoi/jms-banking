"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

export const signIn = async ({ email, password }: signInProps) => {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(session);
  } catch (error) {
    console.error("Error signing in:", error);
  }
};

export const signUp = async (userData: SignUpParams) => {
  const { email, password, firstName, lastName } = userData;
  //#region Destructuring syntax
  /*
   const email = userData.email;
   It looks inside the userData object, finds the properties exactly named email, password, firstName, and lastName, 
   and creates four brand new const variables holding those exact values. 
  */
  //#endregion
  try {
    const { account } = await createAdminClient();

    const newUserAccount = await account.create(
      ID.unique(),
      email,
      password,
      `${firstName} ${lastName}`,
    );
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);
    /**
     * Next.js doesn't allow us to return complex objects from server actions, such as the Appwrite user object.
     * This is because the user object contains circular references, which cannot be serialized to JSON.
     * So we used a utility function to remove circular references and return a plain JavaScript object that can be safely serialized and used on the client side.
     */
  } catch (error) {
    console.error("Error signing up:", error);
  }
};

export async function getLoggedInUser() {
  try {
    /**
     * Appwrite intial code returns a user object with circular references, which cannot be serialized to JSON and sent to the client.
     * And we can't send objects from server actions to the client, only JSON-serializable data.
     */
    const { account } = await createSessionClient();
    const user = await account.get();
    return parseStringify(user);
  } catch (error) {
    return null;
  }
}

export const signOut = async () => {
  try {
    const { account } = await createSessionClient();

    cookies().delete("appwrite-session");

    await account.deleteSession("current");
  } catch (error) {
    console.error("Error signing out:", error);
    return null;
  }
};
