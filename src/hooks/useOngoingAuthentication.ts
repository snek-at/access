import { sq } from "@snek-functions/origin";
import { useEffect, useState } from "react";

export const useOngoingAuthentication = (resourceId: string | null) => {
  const [isLoading, setIsLoading] = useState(!resourceId);
  const [ongoingAuthentication, setOngoingAuthentication] =
    useState<{
      resource: {
        id: string;
        name: string;
      };
    }>();

  useEffect(() => {
    if (!resourceId) return;

    const fetchPublicResource = async () => {
      setIsLoading(true);
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
        setOngoingAuthentication({
          resource,
        });
      }

      setIsLoading(false);
    };

    fetchPublicResource();
  }, [resourceId]);

  return {
    isLoading,
    ongoingAuthentication,
  };
};
