import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>My Homepage</h1>
      <p>Welcome to my homepage!</p>

      <div >
        <Link href="login">
          <button >Login </button>
        </Link>
        <Link href="signup">
          <button>Go to Signup</button>
        </Link>
      </div>
    </div>
  );
}
