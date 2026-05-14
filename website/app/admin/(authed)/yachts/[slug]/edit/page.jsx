import { notFound } from 'next/navigation';
import { getSupabaseServerClient } from '../../../../../../lib/supabase/server';
import { colors, fontSerif, fontSans } from '../../../../../../lib/theme';
import YachtForm from '../../YachtForm';
import { updateYacht } from '../../actions';

export default async function EditYachtPage({ params }) {
  const { slug } = await params;
  const supabase = await getSupabaseServerClient();
  const { data: row } = await supabase.from('yachts').select('*').eq('slug', slug).maybeSingle();
  if (!row) notFound();

  // Map DB row → form's expected camelCase shape.
  const initial = {
    name: row.name,
    slug: row.slug,
    builder: row.builder,
    type: row.type,
    year: row.year,
    loa: row.loa,
    beam: row.beam,
    cabins: row.cabins,
    price: row.price,
    currency: row.currency,
    location: row.location,
    description: row.description,
    image: row.image_url,
    gallery: row.gallery ?? [],
    listingStatus: row.listing_status,
    display_order: row.display_order,
  };

  // Server actions can't be passed extra args directly, so bind the slug.
  const action = updateYacht.bind(null, slug);

  return (
    <div>
      <div style={{ fontFamily: fontSans, fontSize: 11, letterSpacing: '0.3em', color: colors.accent, textTransform: 'uppercase', marginBottom: 12 }}>— Edit listing</div>
      <h1 style={{ fontFamily: fontSerif, fontSize: 'clamp(28px, 4vw, 40px)', color: colors.text, fontWeight: 300, margin: 0, marginBottom: 32 }}>
        {row.name}
      </h1>
      <YachtForm action={action} initial={initial} submitLabel="Save changes" />
    </div>
  );
}
