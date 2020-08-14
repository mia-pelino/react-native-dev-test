export const formatSummary = (summary: string): string => {
  return removeMarkdown(summary).slice(0, 40);
};

export const removeMarkdown = (string: string): string => {
  return (
    string
      //replaces all octothorps (hashtags)
      .replace(
        /^(\n)?\s{0,}#{1,6}\s+| {0,}(\n)?\s{0,}#{0,} {0,}(\n)?\s{0,}$/gm,
        ' '
      )
      //replaces backslashes
      .replace(/^\s+|\s+$/g, '')
      //replaces extra spaces and new lines
      .replace(/\s+/g, ' ')
      //replaces asterisks
      .replace(/\*/g, '')
  );
};

export const formatDate = (dateString: string): string => {
  let options = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(dateString).toLocaleDateString([], options);
};
