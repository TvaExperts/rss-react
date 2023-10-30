export function stripHTMLTags(text: string) {
  return text.replace(/<[^>]*>/g, '');
}
