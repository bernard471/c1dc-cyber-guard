export interface Article {
    id: number;
    title: string;
    author: string;
    date: string;
    readingTime: string;
    category: string[];
    summary: string;
    content: {
      type: 'paragraph' | 'heading' | 'list' | 'quote' | 'tip';
      content: string | string[];
    }[];
    references?: {
      title: string;
      url: string;
    }[];
  }
  
  export const cybersecurityArticles: Article[] = [
    {
      id: 1,
      title: "Understanding Cyber Threats in Ghana's Digital Economy",
      author: "Cyber Security Expert",
      date: "2024-01-15",
      readingTime: "8 min read",
      category: ["Cybersecurity", "Financial Safety"],
      summary: "An in-depth analysis of emerging cyber threats in Ghana's growing digital economy and essential protection measures.",
      content: [
        {
          type: "paragraph",
          content: "Ghana's digital economy is growing rapidly, bringing with it new opportunities and challenges in cybersecurity..."
        },
        {
          type: "heading",
          content: "Common Cyber Threats in Ghana"
        },
        {
          type: "list",
          content: [
            "Mobile Money fraud schemes",
            "Phishing attacks targeting bank customers",
            "Social media scams",
            "Business email compromise"
          ]
        },
        {
          type: "quote",
          content: "According to recent statistics, Ghana loses approximately $100 million annually to cybercrime."
        },
        {
          type: "tip",
          content: "Always verify the source of financial transaction requests, even if they appear to come from known contacts."
        }
      ],
      references: [
        {
          title: "Ghana Cyber Security Authority Report 2023",
          url: "https://example.com/report"
        }
      ]
    },
    // Add more articles...
  ];
  