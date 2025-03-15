import { LoginInput } from "@/app/LoginInput";
import { Link, Text } from "@radix-ui/themes";

const info: {
  title: string;
  desc: string | React.ReactNode;
}[] = [
  {
    title: "What is Logplace?",
    desc: (
      <Text size="2">
        Logplace is a place for you to log anything happen in your life. Just
        like git commits but you can literally create logs for anything. It is
        built on{" "}
        <Link href="https://atproto.com/" target="_blank">
          AT protocol
        </Link>
        .
      </Text>
    ),
  },
  {
    title: "What is AT Protocol?",
    desc: (
      <Text size="2">
        The AT Protocol is an open, decentralized network for building social
        applications. It is the underlying network of Bluesky. To login, you
        need to have a{" "}
        <Link href="https://bsky.app/" target="_blank">
          Bluesky
        </Link>{" "}
        handle first.
        <br />
        Need an account? <Link href="https://bsky.app/">Sign up here</Link>.
      </Text>
    ),
  },
];

export default async function LoginPage() {
  return (
    <div className="flex flex-row justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center lg:w-[30%] p-8 gap-y-2">
        <Text size="4" weight={"medium"}>
          Hi, welcome to Logplace.
        </Text>
        <LoginInput />
        <div className="flex flex-col gap-y-2 mt-4">
          {info.map((data, idx) => {
            const { title, desc } = data;
            return (
              <div className="flex flex-col text-gray-9 gap-y-1" key={idx}>
                <Text size="2" className="text-gray-11">
                  {title}
                </Text>
                {typeof desc === "string" ? <Text size="2">{desc}</Text> : desc}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
