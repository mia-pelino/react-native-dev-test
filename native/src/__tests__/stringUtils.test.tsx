import React from 'react';
import { formatSummary, removeMarkdown, formatDate } from '../stringUtils';

describe('formatSummary', () => {
  it('removes markdown', () => {
    const testString: string = `# "You only **live** once? False.##\n\n You live every day. \nYou only die once." - Dwight Schrute`;

    const result: string = formatSummary(testString);

    expect(result).not.toContain('**' || '*' || '#' || '##');
    expect(result).toBe(`"You only live once? False. You live eve`);
  });

  it('truncates to 40 characters', () => {
    const testString: string = `# "I just wanna **lie on the beach** and eat hot dogs.##\n\n That's all I've ever wanted.\n" - Kevin Malone`;

    const result: string = formatSummary(testString);

    expect(result.length).toBe(40);
  });

  it('returns an empty string when passed a null value', () => {
    let nullString = null;

    expect(formatSummary(nullString)).toBe('');
  });

  it('returns an empty string when passed an undefined value', () => {
    let undefined;

    expect(formatSummary(undefined)).toBe('');
  });
});

describe('removeMarkdown', () => {
  it('removes markdown from string', () => {
    const testString: string = `# "Sometimes I'll *start\n\n## a sentence and **I don't even know** where \nit's going." - Michael Scott `;

    const result: string = removeMarkdown(testString);

    expect(result).not.toContain('**' || '*' || '#' || '##');
    expect(result).toBe(
      `"Sometimes I'll start a sentence and I don't even know where it's going." - Michael Scott`
    );
  });

  it('returns an empty string when passed a null value', () => {
    let nullString = null;

    expect(removeMarkdown(nullString)).toBe('');
  });

  it('returns an empty string when passed an undefined value', () => {
    let undefined;

    expect(removeMarkdown(undefined)).toBe('');
  });
});

describe('formatDate', () => {
  it('formats date string into month, day, and year string', () => {
    const testDate: string = new Date(2020, 2, 3).toString();

    const result: string = formatDate(testDate);

    expect(result).toBe('March 3, 2020');
  });

  it('formats date string into month, day, and year string', () => {
    const testDate: string = '1987-03-03T08:00:00.000Z';

    const result: string = formatDate(testDate);

    expect(result).toBe('March 3, 1987');
  });

  it('returns an empty string when passed a null value', () => {
    let nullString = null;

    expect(formatDate(nullString)).toBe('');
  });

  it('returns an empty string when passed an undefined value', () => {
    let undefined;

    expect(formatDate(undefined)).toBe('');
  });
});
