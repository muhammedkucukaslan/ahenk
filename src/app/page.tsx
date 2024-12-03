import Link from 'next/link';

export default function Home() {
  return (
    <div>
      <div className='flex flex-col items-center  '>
        <h1>My Homepage</h1>
        <p>Welcome to my homepage!</p>
        <Link href='login'>
          <button>Login </button>
        </Link>
        <Link href='signup'>
          <button>Go to Signup</button>
        </Link>
      </div>
    </div>
  );
}
