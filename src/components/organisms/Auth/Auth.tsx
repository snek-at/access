import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Card,
  CardBody,
  Center,
  Container,
  Heading,
  HStack,
  IconButton,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import { BsThreeDotsVertical } from "react-icons/bs";

import { Logo } from "../../atoms/Logo";
import { SignInForm } from "../../molecules/SignInForm";

export interface AuthProps {
  isSignedIn: boolean;
  snekAccessResourceId: string;
  isLoading: boolean;
  me?: {
    users: Array<{
      user: {
        id: string;
        username: string;
        primaryEmail: string;
        resource: {
          id: string;
          name: string;
        };
      };
    }>;
  };

  ongoingAuthentication?: {
    resource: {
      id: string;
      name: string;
    };
  };

  onSignOut: (resourceId?: string) => void;
  onSignIn: (
    username: string,
    password: string,
    resourceId: string,
    isSession?: boolean
  ) => Promise<boolean> | boolean;
}

export const Auth: React.FC<AuthProps> = (props) => {
  const [signInResult, setSignInResult] =
    useState<"success" | "failure" | null>(null);

  const authenticationAlert = () => {
    const resource = props.ongoingAuthentication?.resource;

    if (!props.isSignedIn) {
      if (signInResult === "failure") {
        return (
          <Alert status="error" borderRadius="md" mb={4} py={2} px={4}>
            <AlertIcon boxSize="24px" mr={2} />
            <Text fontSize="sm">
              {resource ? (
                <>
                  Authentication failed for <strong>{resource.name}</strong>.
                </>
              ) : (
                <>Authentication failed.</>
              )}
            </Text>
          </Alert>
        );
      } else if (signInResult === "success") {
        return (
          <Alert status="success" borderRadius="md" mb={4} py={2} px={4}>
            <AlertIcon boxSize="24px" mr={2} />
            <Text fontSize="sm">
              {resource ? (
                <>
                  Authentication succeeded for <strong>{resource.name}</strong>.
                  You will be automatically redirected to the resource.{" "}
                </>
              ) : (
                <>Authentication succeeded.</>
              )}
            </Text>
          </Alert>
        );
      } else {
        return (
          <Alert status="warning" borderRadius="md" mb={4} py={2} px={4}>
            <AlertIcon boxSize="24px" mr={2} />
            <Text fontSize="sm">
              {resource ? (
                <>
                  Please sign in to access <strong>{resource.name}</strong>.
                </>
              ) : (
                <>Please sign in to gain access</>
              )}
            </Text>
          </Alert>
        );
      }
    } else {
      if (resource) {
        <Alert status="info" borderRadius="md" mb={4} py={2} px={4}>
          <Box mr={2}>
            <Spinner size="sm" />
          </Box>
          <Text fontSize="sm">
            You are currently authenticating for{" "}
            <strong>{resource.name}</strong>. Please wait until the
            authentication is complete, and you will be automatically redirected
            to the resource.
          </Text>
        </Alert>;
      }
    }
  };

  const snekAccessUser = props.me?.users.find(
    (user) => user.user.resource.id === props.snekAccessResourceId
  );

  // if (!resourceId && !props.isSignedIn) {
  //   return <Text>Cannot authenticate without a resource ID.</Text>;
  // }

  return (
    <Container
      maxW="lg"
      py={{ base: "12", md: "24" }}
      px={{ base: "0", sm: "8" }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Logo h="16" justifyContent="center" />
          <Stack spacing={{ base: "2", md: "3" }} textAlign="center">
            <Heading size={{ base: "xs", md: "sm" }}>Snek Access</Heading>
            {/* <HStack spacing="1" justify="center">
              <Text color="muted">Don't have an account?</Text>
              <Button variant="link" colorScheme="blue">
                Sign up
              </Button>
            </HStack> */}

            <HStack spacing="1" justify="center">
              <Text color="muted">
                {props.isSignedIn
                  ? "You are currently signed in. Enjoy our full range of services!"
                  : "Please sign in to access all of our services using our SSO."}
              </Text>
            </HStack>
          </Stack>
        </Stack>
        {!props.isLoading && authenticationAlert()}
        <Box
          py={{ base: "0", sm: "8" }}
          px={{ base: "4", sm: "10" }}
          bg={{ base: "transparent", sm: "bg-surface" }}
          boxShadow={{ base: "none", sm: "md" }}
          borderRadius={{ base: "none", sm: "xl" }}
        >
          {props.isLoading ? (
            <Center>
              <Spinner />
            </Center>
          ) : (
            <>
              {props.isSignedIn ? (
                <Stack spacing="6" maxH="lg">
                  <Text>
                    You are currently signed in as:{" "}
                    <strong>{snekAccessUser?.user.username}</strong>
                  </Text>
                  <Stack spacing="4">
                    {props.me?.users.map(({ user }) => (
                      <Card size="sm">
                        <CardBody>
                          <HStack>
                            <Image
                              src="https://bit.ly/sage-adebayo"
                              alt="Segun Adebayo"
                              boxSize="14"
                              borderRadius="full"
                            />
                            <HStack justifyContent={"space-between"} w="full">
                              <Stack spacing="0">
                                <Text>
                                  {user.username} ({user.primaryEmail})
                                </Text>

                                <Text fontSize="sm" color="muted">
                                  On: {user.resource.name}
                                </Text>
                              </Stack>
                              <Menu isLazy>
                                <MenuButton
                                  as={IconButton}
                                  aria-label="Options"
                                  icon={<BsThreeDotsVertical />}
                                  variant="outline"
                                  size="sm"
                                />
                                <MenuList>
                                  <MenuItem icon={<ExternalLinkIcon />}>
                                    Open resource
                                  </MenuItem>
                                  <MenuItem
                                    color="red.500"
                                    onClick={() => {
                                      props.onSignOut(user.resource.id);
                                      setSignInResult(null);
                                    }}
                                  >
                                    Sign out
                                  </MenuItem>
                                </MenuList>
                              </Menu>
                            </HStack>
                          </HStack>
                        </CardBody>
                      </Card>
                    ))}
                  </Stack>
                  <Stack spacing="6">
                    <Button
                      colorScheme="red"
                      onClick={() => {
                        props.onSignOut();
                        setSignInResult(null);
                      }}
                    >
                      Sign out all
                    </Button>
                  </Stack>
                </Stack>
              ) : (
                <SignInForm
                  onSubmit={async (creds) => {
                    const success = await props.onSignIn(
                      creds.login,
                      creds.password,
                      props.snekAccessResourceId,
                      creds.isSession
                    );

                    setSignInResult(success ? "success" : "failure");
                  }}
                />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Container>
  );
};
