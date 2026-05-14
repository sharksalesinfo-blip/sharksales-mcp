import Link from 'next/link';
import { Plus, ExternalLink } from 'lucide-react';
import { getSupabaseServerClient } from '../../../../lib/supabase/server';
import { colors, fontSerif, fontSans } from '../../../../lib/theme';
import YachtsTable from './YachtsTable';

export default async function YachtsAdminPage() {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase
    .from('yachts').select('*').order('display_order', { ascending: true });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 32 }}>
        <div>
          <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>— Pre-owned</div>
          <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(28px, 4vw, 40px)', color: colors.text, fontWeight: 300, margin: 0 }}>
            Yachts <span style={{ fontStyle: 'italic', color: colors.accent }}>brokerage.</span>
          </h1>
        </div>
        <Link href="/admin/yachts/new" style={{
          background: colors.accent, color: colors.bg,
          padding: '14px 24px', fontFamily: fontSans, fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 10,
        }}>
          <Plus size={14} /> New listing
        </Link>
      </div>

      {error && (
        <div style={{ background: 'rgba(255, 80, 80, 0.08)', border: '1px solid #c44', padding: 16, fontFamily: fontSans, fontSize: 13, color: '#f99' }}>
          {error.message}
        </div>
      )}

      <YachtsTable yachts={data ?? []} />
    </div>
  );
}
