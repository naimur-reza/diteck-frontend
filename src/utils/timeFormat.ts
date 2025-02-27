export function formatDateTime(input: string): string {
  const isoDate: Date = new Date(input);

  // Format into a readable date
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const readableDate: string = isoDate.toLocaleDateString("en-US", options);

  return readableDate;
}
