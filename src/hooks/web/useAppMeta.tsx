const baseTitle = process.env.NEXT_PUBLIC_APP_NAME;
const baseDescription = process.env.NEXT_PUBLIC_APP_DESCRIPTION;
const baseKeywords = process.env.NEXT_PUBLIC_APP_KEYWORDS;

const author = 'Anguer';

export default function useAppMeta(_title?: string) {
  const title = _title ? `${_title} - ${baseTitle}` : baseTitle;
  const description = baseDescription;
  const keywords = baseKeywords;

  return { title, keywords, description, author };
}
