import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const config = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.ewojdev.aora",
  projectId: "66d6ca740025b3703639",
  databaseId: "66d6cc340014d98cc8bc",
  userCollectionId: "66d6cc60001aa0ece1d2",
  videoCollectionId: "66d6cc7f0039fddc13c0",
  storageId: "66d6cd8e002abd86c432",
};

const client = new Client();

client
  .setEndpoint(config.endpoint)
  .setProject(config.projectId)
  .setPlatform(config.platform);

const account = new Account(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

export const createUser = async (
  email: string,
  password: string,
  username: string
) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      username
    );

    if (!newAccount) throw new Error("Account not created");
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);

    const newUser = await databases.createDocument(
      config.databaseId,
      config.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        username,
        avatar: avatarUrl,
      }
    );
    return newUser;
  } catch (error) {
    console.log(error);
    throw new Error(String(error));
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    // Check if there is an existing session
    let currentSession;
    try {
      currentSession = await account.getSession("current");
    } catch (error) {
      console.error("Session not found:", error);
    }

    // If no session exists, create one
    if (!currentSession) {
      const newSession = await account.createEmailPasswordSession(
        email,
        password
      );
      return newSession;
    }

    return currentSession;
  } catch (error) {
    console.error("Sign-in error:", error);
    throw new Error(String(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    // const currentUser = await databases.listDocuments(
    //   config.databaseId,
    //   config.userCollectionId,
    //   [Query.equal("accountId", currentAccount.$id)]
    // );

    // if (!currentUser) throw Error;

    // return currentUser.documents[0];

    return currentAccount;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getAllPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
    );
    return posts.documents;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getLatestPosts = async () => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId
      // [Query.orderDesc("$createdAt"), Query.limit(7)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const searchPosts = async (query: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.search("title", query)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const getUserPosts = async (userId: string) => {
  try {
    const posts = await databases.listDocuments(
      config.databaseId,
      config.videoCollectionId,
      [Query.equal("users", userId)]
    );
    return posts.documents;
  } catch (error) {
    throw new Error(String(error));
  }
};

export const signOut = async () => {
  try {
    const session = await account.deleteSession("current");
    return session;
  } catch (error) {
    throw new Error(String(error));
  }
};