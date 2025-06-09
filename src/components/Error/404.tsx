import { Wrapper } from "@/components/Wrapper/Content"
import Image from "next/image"
import Link from "next/link"

export default function Page404() {
  return (
    <Wrapper>
      <div className="flex flex-col items-center justify-center min-h-screen bg-white text-center">
        <div className="text-center">
          <Image
            src="/images/404-illustration.webp"
            alt="404 Illustration"
            priority
            width={400}
            height={300}
          />

          <h1 className="text-xl text-gray-900 ">
            The page you are looking for <br /> doesn&apos;t exist...
          </h1>

          <p className="text-gray-500 mt-2">
            We ran into an issue, but don&apos;t worry, we&apos;ll take care of
            it for sure.
          </p>

          <Link
            href="/"
            className="mt-6 inline-block bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-hover transition"
          >
            ← Go Back Home
          </Link>
        </div>
      </div>
    </Wrapper>
  )
}
