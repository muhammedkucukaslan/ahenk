import PostsContainer from '../features/posts/components/post-container';
import PopularCommunities from '../features/groups/components/popular-communities';

export type Post = {
  author: string;
  body: string;
  group: string;
  createdAt: string;
  files: string[];
};

const mockFeed: Post[] = [
  {
    author: 'Ahmet Yılmaz',
    body: 'Modern web uygulamalarında performans optimizasyonu kritik öneme sahiptir. Bu yazıda React uygulamalarında kullanabileceğiniz temel optimizasyon tekniklerini ele alacağız.',
    group: 'frontend',
    createdAt: '2024-03-30T10:00:00Z',
    files: ['performance-metrics.png', 'optimization-chart.svg'],
  },
  {
    author: 'Zeynep Kaya',
    body: "TypeScript, JavaScript projelerinize tip güvenliği getirerek daha sağlam uygulamalar geliştirmenizi sağlar. İşte TypeScript'in en önemli özellikleri ve best practice'leri.",
    group: 'typescript',
    createdAt: '2024-03-29T15:30:00Z',
    files: ['typescript-example.png'],
  },
  {
    author: 'Mehmet Demir',
    body: 'Next.js 14 ile gelen yeni özellikler ve geliştirmeler neler? Server componentler ve yeni router yapısı hakkında detaylı bir inceleme.',
    group: 'nextjs',
    createdAt: '2024-03-28T09:15:00Z',
    files: [],
  },
  {
    author: 'Ayşe Şahin',
    body: 'Modern CSS Grid sistemini derinlemesine inceliyoruz. Responsive tasarımlar için grid template areas ve auto-fit/auto-fill kullanımı.',
    group: 'css',
    createdAt: '2024-03-27T14:20:00Z',
    files: ['grid-layout.png', 'responsive-demo.gif'],
  },
  {
    author: 'Can Özkan',
    body: 'Mikroservis mimarisinin temel prensipleri ve Node.js ile implementasyonu. Docker ve Kubernetes entegrasyonu örnekleri.',
    group: 'backend',
    createdAt: '2024-03-26T11:45:00Z',
    files: ['architecture-diagram.svg'],
  },
  {
    author: 'Elif Yıldız',
    body: "React Native uygulamalarınızı nasıl daha hızlı hale getirebilirsiniz? Memory leak'leri önleme ve render optimizasyonu teknikleri.",
    group: 'mobile',
    createdAt: '2024-03-25T16:00:00Z',
    files: ['performance-tips.png'],
  },
  {
    author: 'Burak Aydın',
    body: "GraphQL'in temel konseptleri ve Apollo Client ile React uygulamalarında kullanımı. Gerçek dünya örnekleri ile query ve mutation yapıları.",
    group: 'graphql',
    createdAt: '2024-03-24T13:30:00Z',
    files: ['query-example.png'],
  },
  {
    author: 'Seda Arslan',
    body: "WCAG 2.1 standartları ve modern web uygulamalarında erişilebilirlik. Semantic HTML ve ARIA attribute'larının doğru kullanımı.",
    group: 'accessibility',
    createdAt: '2024-03-23T10:20:00Z',
    files: ['accessibility-checklist.pdf'],
  },
  {
    author: 'Onur Çelik',
    body: 'Redux Toolkit Query ile API entegrasyonu ve cache yönetimi. Real-time updates ve optimistic updates implementasyonu.',
    group: 'redux',
    createdAt: '2024-03-22T15:45:00Z',
    files: ['rtk-query-flow.svg'],
  },
  {
    author: 'Deniz Şen',
    body: 'Tailwind CSS ile maintainable ve scalable UI geliştirme. Custom utility classes ve component extraction stratejileri.',
    group: 'css',
    createdAt: '2024-03-21T12:00:00Z',
    files: ['tailwind-examples.png'],
  },
  {
    author: 'Emre Yılmaz',
    body: 'React komponentlerinin Jest ve Testing Library ile test edilmesi. Mock fonksiyonlar ve test coverage analizi.',
    group: 'testing',
    createdAt: '2024-03-20T09:30:00Z',
    files: ['test-coverage.png'],
  },
  {
    author: 'Gizem Kara',
    body: 'PWA geliştirme süreçleri ve service worker implementasyonu. Offline functionality ve push notification örnekleri.',
    group: 'pwa',
    createdAt: '2024-03-19T14:15:00Z',
    files: ['pwa-lifecycle.png', 'offline-demo.gif'],
  },
  {
    author: 'Murat Aksoy',
    body: 'Docker ile development ortamı kurulumu ve multi-container uygulamalar. Docker Compose ve development workflow optimizasyonu.',
    group: 'devops',
    createdAt: '2024-03-18T11:30:00Z',
    files: ['docker-compose.yaml'],
  },
  {
    author: 'Ceren Yıldırım',
    body: 'Modern React uygulamalarında state management yaklaşımları. Context API, Redux ve Zustand karşılaştırması.',
    group: 'react',
    createdAt: '2024-03-17T16:45:00Z',
    files: ['state-flow.svg'],
  },
  {
    author: 'Alper Kaya',
    body: 'WebSocket protokolü ve real-time veri akışı implementasyonu. Socket.IO ile chat uygulaması örneği.',
    group: 'websocket',
    createdAt: '2024-03-16T10:00:00Z',
    files: ['websocket-diagram.png'],
  },
  {
    author: 'Pınar Demir',
    body: 'GitHub Actions ile otomatik deployment pipeline kurulumu. Test, build ve deployment workflow örnekleri.',
    group: 'devops',
    createdAt: '2024-03-15T15:20:00Z',
    files: ['github-actions.yaml'],
  },
  {
    author: 'Serkan Öz',
    body: 'Turborepo ile monorepo yapılandırması ve workspace yönetimi. Shared package ve dependency hoisting stratejileri.',
    group: 'tooling',
    createdAt: '2024-03-14T13:40:00Z',
    files: ['monorepo-structure.svg'],
  },
  {
    author: 'Aylin Çetin',
    body: 'Modern web animasyonları için CSS animations, GSAP ve Framer Motion kullanımı. Performance-oriented animation stratejileri.',
    group: 'animation',
    createdAt: '2024-03-13T12:10:00Z',
    files: ['animation-examples.gif'],
  },
  {
    author: 'Kemal Güner',
    body: 'REST API güvenliği için authentication ve authorization yapılandırması. JWT implementation ve security headers kullanımı.',
    group: 'security',
    createdAt: '2024-03-12T09:50:00Z',
    files: ['security-flow.png'],
  },
  {
    author: 'Nihal Yılmaz',
    body: 'Modern web projeleri için Webpack 5 yapılandırması. Code splitting, lazy loading ve bundle optimization teknikleri.',
    group: 'tooling',
    createdAt: '2024-03-11T14:30:00Z',
    files: ['webpack-config.js'],
  },
];

export default function Home() {
  return (
    <div className='flex gap-4'>
      <PostsContainer posts={mockFeed} />
      <PopularCommunities />
    </div>
  );
}
