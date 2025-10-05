import { ExternalLink, Newspaper, Clock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

// Mock NASA news data - in production, this would come from NASA RSS/API
const nasaNews = [
  {
    id: 1,
    title: 'NASA Confirms DART Mission Success',
    summary: 'DART successfully altered asteroid orbit, proving planetary defense technique works.',
    date: '2024-10-03',
    category: 'Planetary Defense',
    url: 'https://www.nasa.gov/missions/dart',
  },
  {
    id: 2,
    title: 'New Near-Earth Asteroid Discovered',
    summary: 'Pan-STARRS telescope identifies new 200m asteroid in Earth-crossing orbit.',
    date: '2024-10-02',
    category: 'Discovery',
    url: 'https://cneos.jpl.nasa.gov/',
  },
  {
    id: 3,
    title: 'Apophis 2029 Approach Update',
    summary: 'Latest calculations refine trajectory for historic 2029 close approach.',
    date: '2024-10-01',
    category: 'Tracking',
    url: 'https://www.jpl.nasa.gov/',
  },
  {
    id: 4,
    title: 'ESA-NASA Collaboration Expanded',
    summary: 'Joint planetary defense initiatives announced at international summit.',
    date: '2024-09-30',
    category: 'Policy',
    url: 'https://www.esa.int/',
  },
  {
    id: 5,
    title: 'NEO Surveyor Mission Update',
    summary: 'Next-gen infrared space telescope on track for 2027 launch.',
    date: '2024-09-28',
    category: 'Technology',
    url: 'https://www.nasa.gov/',
  },
];

export function NASANewsPanel() {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Planetary Defense':
        return 'bg-red-600';
      case 'Discovery':
        return 'bg-blue-600';
      case 'Tracking':
        return 'bg-amber-600';
      case 'Policy':
        return 'bg-purple-600';
      case 'Technology':
        return 'bg-green-600';
      default:
        return 'bg-slate-600';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-slate-900 border-slate-800 p-4">
      <div className="flex items-center gap-2 mb-4">
        <Newspaper className="w-5 h-5 text-blue-400" />
        <h3>NASA Updates</h3>
        <Badge variant="outline" className="ml-auto text-xs">Live</Badge>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto">
        {nasaNews.map((news) => (
          <a
            key={news.id}
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-slate-800 hover:bg-slate-750 rounded-lg p-3 transition-colors group"
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <h4 className="text-sm group-hover:text-blue-400 transition-colors line-clamp-2">
                {news.title}
              </h4>
              <ExternalLink className="w-3 h-3 text-slate-500 flex-shrink-0 mt-1" />
            </div>
            
            <p className="text-xs text-slate-400 mb-2 line-clamp-2">
              {news.summary}
            </p>
            
            <div className="flex items-center justify-between">
              <Badge className={`text-xs ${getCategoryColor(news.category)}`}>
                {news.category}
              </Badge>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Clock className="w-3 h-3" />
                {formatDate(news.date)}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="mt-3 pt-3 border-t border-slate-800">
        <a
          href="https://www.nasa.gov/news/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
        >
          View all NASA news
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </Card>
  );
}