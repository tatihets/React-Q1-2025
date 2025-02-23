import { saveAs } from 'file-saver';

const jsonToCSV = <T extends Record<string, unknown>>(
  jsonData: T[]
): string => {
  if (!jsonData || !jsonData.length) {
    return '';
  }

  const headers: string[] = Object.keys(jsonData[0]);

  const csvRows = [];

  csvRows.push(headers);

  jsonData.forEach((row) => {
    const values = headers.map((header) => {
      const value = row[header];
      if (value == null) {
        return '';
      }

      const escapedValue = String(value).replace(/"/g, '""');
      return `"${escapedValue}"`;
    });
    csvRows.push(values.join(','));
  });
  return csvRows.join('\n');
};

export const downloadCsv = <T extends Record<string, unknown>>(
  jsonData: T[],
  filename: string
) => {
  const csvData = jsonToCSV(jsonData);

  const blob = new Blob([csvData], { type: 'text/csv' });

  saveAs(blob, filename);
};
