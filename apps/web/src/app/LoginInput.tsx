"use client";
import { useRouter } from "next/navigation";
import { Button, Text, TextField } from "@radix-ui/themes";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorMessage } from "@hookform/error-message";

const loginFormSchema = z.object({
  handle: z.string().min(1, "Handle can't be empty"),
});
type LoginForm = z.infer<typeof loginFormSchema>;

export function LoginInput(props: { onSettled?: () => void }) {
  const { onSettled } = props;
  const router = useRouter();
  const { register, handleSubmit, formState } = useForm<LoginForm>({
    resolver: zodResolver(loginFormSchema),
    mode: "onTouched",
  });

  return (
    <div className="flex flex-col">
      <form
        className="flex flex-row items-center"
        onSubmit={handleSubmit((data) => {
          router.push("/api/oauth/login?handle=" + data.handle);
          onSettled?.();
        })}
      >
        <TextField.Root
          placeholder="Enter your bluesky handle..."
          className="flex-grow"
          {...register("handle")}
        />
        <Button type="submit" className="my-2 ml-2 text-gray-2 flex min-w-fit">
          Sign in
        </Button>
      </form>
      <ErrorMessage
        errors={formState.errors}
        name="handle"
        render={(error) => (
          <Text size="1" className="text-red-9">
            {error.message}
          </Text>
        )}
      />
    </div>
  );
}
