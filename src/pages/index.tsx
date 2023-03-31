import type { HeadFC, PageProps } from "gatsby";
import * as React from "react";

import { isSession, setTokenPair, sq } from "@snek-functions/origin/client";

import { Auth } from "../components/organisms/Auth/index.js";

interface Me {
  users: {
    user: {
      id: string;
      username: string;
      primaryEmail: string;
      resource: {
        id: string;
        name: string;
      };
    };
  }[];
}

export const Page: React.FC<PageProps> = () => {
  const { isLoading, isSignedIn, me, setMe, ongoingAuthentication } =
    useAuthHandler();

  return (
    <Auth
      isLoading={isLoading}
      snekAccessResourceId="7f2734cf-9283-4568-94d1-8903354ca382"
      isSignedIn={isSignedIn}
      me={me}
      onSignIn={async (login, password, resourceId, isSession) => {
        const [user, errors] = await sq.mutate((m) => {
          const u = m.userSignIn({
            login,
            password,
            resourceId,
          });

          return {
            id: u.user.id,
            username: u.user.username,
            primaryEmail: u.user.primaryEmailAddress,
            resource: {
              id: u.user.resource.id,
              name: u.user.resource.name,
            },
            tokenPair: {
              accessToken: u.tokenPair.accessToken,
              refreshToken: u.tokenPair.refreshToken,
            },
          };
        });

        if (!errors && user) {
          // set me without duplicating the user
          setMe((me) => ({
            ...me,
            users: [...me.users.filter((u) => u.user.id !== user.id), { user }],
          }));

          setTokenPair(user.tokenPair, isSession);

          return true;
        }

        return false;
      }}
      onSignOut={async (resourceId) => {
        if (resourceId) {
          setMe((me) => ({
            ...me,
            users: me.users.filter((u) => u.user.resource.id !== resourceId),
          }));
        } else {
          setMe({ users: [] });
        }

        setTokenPair(null);
      }}
      ongoingAuthentication={ongoingAuthentication}
    />
  );
};

export default Page;

export const Head: HeadFC = () => <title>Snek Access</title>;

export const useAuthHandler = () => {
  const [resourceId, setResourceId] = React.useState<string | undefined>();

  React.useEffect(() => {
    const resourceIdFromUrl = new URLSearchParams(window.location.search).get(
      "resourceId"
    );

    if (resourceIdFromUrl) {
      setResourceId(resourceIdFromUrl);
    }
  }, []);

  const [me, setMe] = React.useState<Me>({
    users: [],
  });
  const [ongoingAuthentication, setOngoingAuthentication] =
    React.useState<{
      resource: {
        id: string;
        name: string;
      };
    }>();

  const [isMeLoading, setIsMeLoading] = React.useState(true);
  const [isOngoingAuthenticationLoading, setIsOngoingAuthenticationLoading] =
    React.useState(true);

  React.useEffect(() => {
    const fetchMe = async () => {
      const [r, errors] = await sq.query((q) => {
        const users = q.userMe();

        return {
          users: users.map((user) => ({
            user: {
              id: user.id,
              username: user.username,
              primaryEmail: user.primaryEmailAddress,
              resource: {
                id: user.resource.id,
                name: user.resource.name,
              },
            },
          })),
        };
      });

      if (!errors && r) {
        setMe(r);
      }
    };

    fetchMe().then(() => setIsMeLoading(false));
  }, [resourceId]);

  const isSignedIn = me.users.length > 0;

  React.useEffect(() => {
    const fetchPublicResource = async () => {
      if (!resourceId) {
        return;
      }

      const [resource, errors] = await sq.query((q) => {
        const m = q.resource({
          id: resourceId,
        });

        return {
          id: m.id,
          name: m.name,
        };
      });

      if (!errors && resource) {
        setOngoingAuthentication({ resource });
      }
    };

    fetchPublicResource().then(() => setIsOngoingAuthenticationLoading(false));
  }, [resourceId]);

  React.useEffect(() => {
    // Sign in to the resource and redirect to the resource

    if (ongoingAuthentication && isSignedIn) {
      const resourceAccess = async () => {
        const [data, errors] = await sq.mutate((m) => {
          const access = m.userSSO({
            resourceId: ongoingAuthentication.resource.id,
          });

          const tokenPair = {
            accessToken: access.tokenPair.accessToken,
            refreshToken: access.tokenPair.refreshToken,
          };

          const signInUrl = access.user.resource.config.access?.signInURL;

          return {
            tokenPair,
            signInUrl,
          };
        });

        if (!errors && data) {
          if (data.signInUrl) {
            // isSession should be the same as the one used in the resource

            const access = {
              ...data.tokenPair,
              isSession: isSession(),
            };

            window.location.replace(
              `${data.signInUrl}?access=${JSON.stringify(access)}`
            );
          }
        } else {
          console.error("signed in error", errors);
        }
      };
      console.log("signing in to resource");
      resourceAccess();
    }
  }, [ongoingAuthentication, isSignedIn]);

  console.log("loading state", isMeLoading, isOngoingAuthenticationLoading);

  return {
    isSignedIn,
    ongoingAuthentication,
    me,
    setMe,
    isLoading: isMeLoading || isOngoingAuthenticationLoading,
  };
};
