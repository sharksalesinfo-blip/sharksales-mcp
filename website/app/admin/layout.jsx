import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSupabaseServerClient } from '../../lib/supabase/server';
import { colors, fontSerif, fontSans } from '../../lib/theme';
import SignOutButton from './SignOutButton';

export const metadata = { title: 'Admin — Asia Yacht Services' };

// Admin needs cookies + live data — never prerender.
export const dynamic = 'force-dynamic';

export default async function AdminLayout({ children }) {
  return <>{children}</>;
}
