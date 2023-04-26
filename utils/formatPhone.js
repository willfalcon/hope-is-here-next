export default function formatPhone(number) {
  const area = number.toString().slice(0, 3);
  const first = number.toString().slice(3, 6);
  const last = number.toString().slice(6);
  const display = `${area}.${first}.${last}`;
  const href = `tel:(${area}) ${first}-${last}`;
  return { display, href };
}
