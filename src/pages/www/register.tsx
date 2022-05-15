import Link from 'next/link';

export default function Register() {
  return (
    <div>
      Register<Link href="/">To Dashboard</Link>
      Register<Link href="/admin/settings">To Settings</Link>
    </div>
  );
}
