import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import mammoth from 'mammoth';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'No file provided' },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await mammoth.extractRawText({ buffer });
    const text = result.value;

    const citations = parseCitations(text);

    const { data, error } = await supabaseAdmin
      .from('citations')
      .insert(citations);

    if (error) throw error;

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${citations.length} citations`,
    });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

function parseCitations(text) {
  const citations = [];
  const blocks = text.split('\n\n');
  
  blocks.forEach((block) => {
    const lines = block.trim().split('\n');
    
    if (lines.length > 0) {
      const title = lines[0].trim();
      const content = lines.slice(1).join(' ').trim();
      
      const citationMatch = title.match(/(PLD|SCMR|CLC|PCrLJ|PTD|PLC|CLD|YLR|MLD)\s+(\d{4})\s+([A-Z]+)\s+(\d+)/);
      
      if (citationMatch) {
        citations.push({
          title: title,
          citation_number: citationMatch[0],
          journal: citationMatch[1].toLowerCase(),
          year: citationMatch[2],
          court: citationMatch[3].toLowerCase(),
          content: content,
          full_content: block,
          keywords: extractKeywords(content),
          category: categorize(content),
        });
      }
    }
  });
  
  return citations;
}

function extractKeywords(text) {
  const legalTerms = [
    'constitutional law', 'criminal law', 'civil law', 'tax law',
    'labour law', 'family law', 'corporate law', 'environmental law',
    'Section 302', 'PPC', 'evidence', 'murder', 'contract',
  ];
  
  const keywords = [];
  legalTerms.forEach(term => {
    if (text.toLowerCase().includes(term.toLowerCase())) {
      keywords.push(term);
    }
  });
  
  return keywords;
}

function categorize(text) {
  const lower = text.toLowerCase();
  
  if (lower.includes('constitutional') || lower.includes('constitution')) {
    return 'Constitutional Law';
  } else if (lower.includes('criminal') || lower.includes('ppc') || lower.includes('302')) {
    return 'Criminal Law';
  } else if (lower.includes('tax') || lower.includes('income')) {
    return 'Tax Law';
  } else if (lower.includes('labour') || lower.includes('worker')) {
    return 'Labour Law';
  } else if (lower.includes('family') || lower.includes('marriage') || lower.includes('divorce')) {
    return 'Family Law';
  } else if (lower.includes('company') || lower.includes('corporate')) {
    return 'Corporate Law';
  } else {
    return 'General Law';
  }
}
