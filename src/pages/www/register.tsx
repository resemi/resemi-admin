import Link from 'next/link';

export default function Register() {
  return (
    <div>
      Register<Link href="/dashboard">To Dashboard</Link>
      Register<Link href="/dashboard/settings">To Settings</Link>
    </div>
  );
}
