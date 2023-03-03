import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  Link,
  Stack,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import { PasswordField } from "../../atoms/PasswordField";

type FormValues = {
  login: string;
  password: string;
  isSession?: boolean;
};

export interface SignInFormProps {
  onSubmit: (values: FormValues) => Promise<void>;
}

export const SignInForm: React.FC<SignInFormProps> = (props) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isDirty },
    control,
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    await props.onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing="6">
        <Stack spacing="5">
          <FormControl isInvalid={!!errors.login}>
            {
              // Username or email address
            }
            <FormLabel htmlFor="login">Username or email address</FormLabel>
            <Input
              id="login"
              type="text"
              {...register("login", {
                required: "Required",
              })}
            />
            <FormErrorMessage>
              {errors.login && errors.login.message}
            </FormErrorMessage>
          </FormControl>
          <PasswordField
            id="password"
            {...register("password", {
              required: "Required",
            })}
          />
        </Stack>
        <HStack justifyContent="space-between">
          <Controller
            control={control}
            name="isSession"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Checkbox
                onBlur={onBlur}
                onChange={onChange}
                checked={value}
                ref={ref}
              >
                Log me out after
              </Checkbox>
            )}
          />
          <Link onClick={() => {}}>Forgot password?</Link>
        </HStack>
        <Stack spacing="6">
          <Button
            variant="primary"
            type="submit"
            isLoading={isSubmitting}
            isDisabled={isSubmitting || !isDirty}
          >
            Sign in
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};
