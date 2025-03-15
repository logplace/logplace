import { getUserSession, isSessionValid } from "./auth";
import { redirect } from "next/navigation";

interface AuthUserProps {
  did: string;
}

export type WithAuthRequiredProps<T = undefined> = T extends undefined
  ? AuthUserProps
  : T & AuthUserProps;

export async function withAuthRequired<T extends object>(
  Component: React.ComponentType<T & AuthUserProps>
) {
  // handle session exprired or unauthenticated user
  const isAuth = await isSessionValid();
  if (!isAuth) {
    redirect("/login");
  }
  const ses = await getUserSession();

  const WrappedComponent = async (props: T) => {
    return <Component {...props} did={ses.did} />;
  };
  return WrappedComponent;
}
