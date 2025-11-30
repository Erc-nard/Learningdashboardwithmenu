// Backend API Service

const API_BASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_URL) || 'http://localhost:8000';

export interface PageSummary {
  page: number;
  summary: string;
}

export interface HierarchicalSummary {
  document_id: string;
  note_style_summary: string;
  pages: PageSummary[];
  summary_pdf_url: string;
}

/**
 * PDF 파일을 백엔드로 업로드하고 AI 요약을 받아옵니다
 */
export async function summarizePDF(file: File): Promise<HierarchicalSummary> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE_URL}/api/summarize-pdf`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Unknown error' }));
    throw new Error(error.detail || `HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * 요약 PDF 다운로드 URL을 반환합니다
 */
export function getSummaryPdfUrl(documentId: string): string {
  return `${API_BASE_URL}/api/summary-pdf/${documentId}`;
}

/**
 * 요약 PDF를 다운로드합니다
 */
export async function downloadSummaryPdf(documentId: string, filename: string = 'summary.pdf'): Promise<void> {
  const url = getSummaryPdfUrl(documentId);
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to download PDF: ${response.statusText}`);
  }

  const blob = await response.blob();
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}