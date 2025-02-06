import React from 'react';
import { Clock, Calendar, User, Link as LinkIcon } from 'lucide-react';
import { Article } from '@/safety/articles';

interface ArticleViewProps {
  article: Article;
}

const ArticleView: React.FC<ArticleViewProps> = ({ article }) => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* Article Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">{article.title}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            {article.author}
          </div>
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            {new Date(article.date).toLocaleDateString()}
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            {article.readingTime}
          </div>
        </div>
        <div className="flex gap-2 mt-4">
          {article.category.map((cat, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      {/* Article Content */}
      <div className="prose max-w-none">
        {article.content.map((section, index) => {
          switch (section.type) {
            case 'paragraph':
              return <p key={index} className="mb-4 text-gray-700">{section.content}</p>;
            case 'heading':
              return <h2 key={index} className="text-2xl font-bold my-6">{section.content}</h2>;
            case 'list':
              return (
                <ul key={index} className="list-disc pl-6 my-4">
                  {(section.content as string[]).map((item, i) => (
                    <li key={i} className="mb-2">{item}</li>
                  ))}
                </ul>
              );
            case 'quote':
              return (
                <blockquote key={index} className="border-l-4 border-blue-500 pl-4 my-6 italic">
                  {section.content}
                </blockquote>
              );
            case 'tip':
              return (
                <div key={index} className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-6">
                  <p className="font-semibold">Tip:</p>
                  <p>{section.content}</p>
                </div>
              );
            default:
              return null;
          }
        })}
      </div>

      {/* References */}
      {article.references && (
        <div className="mt-12 border-t pt-6">
          <h3 className="text-xl font-semibold mb-4">References</h3>
          <ul className="space-y-2">
            {article.references.map((ref, index) => (
              <li key={index} className="flex items-center text-blue-600 hover:text-blue-800">
                <LinkIcon className="w-4 h-4 mr-2" />
                <a href={ref.url} target="_blank" rel="noopener noreferrer">
                  {ref.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ArticleView;
