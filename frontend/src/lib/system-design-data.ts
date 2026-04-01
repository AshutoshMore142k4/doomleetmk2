export interface SDKeyPoint {
  label: string;
  value: string;
}

export interface SDTopic {
  id: string;
  title: string;
  summary: string;
  explanation: string;
  keyPoints: SDKeyPoint[];
  tradeoffs?: string;
  example?: string;
  detailedDesign?: SDDetailedDesign;
}

export interface SDSection {
  id: string;
  name: string;
  description: string;
  topics: SDTopic[];
}

export interface SDDataField {
  name: string;
  type: string;
  description: string;
}
export interface SDDataEntity {
  name: string;
  description: string;
  fields: SDDataField[];
}
export interface SDApiEndpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  requestNote?: string;
  responseNote?: string;
}
export interface SDDesignOption {
  title: string;
  description: string;
  chosen?: boolean;
}
export interface SDDeepDive {
  question: string;
  level: 'Mid-Level' | 'Senior' | 'Staff';
  answer: string;
  options?: SDDesignOption[];
}
export interface SDHLDSection {
  step: number;
  title: string;
  description: string;
  bullets: Array<{ label: string; detail: string }>;
}
export interface SDDetailedDesign {
  introduction: string;
  functionalRequirements: Array<{ verb: string; operation: string; description: string }>;
  scaleRequirements: string[];
  outOfScope?: string[];
  nonFunctionalRequirements: Array<{ title: string; description: string; derived: string }>;
  dataModel: {
    description: string;
    entities: SDDataEntity[];
    relationships: string;
  };
  apiEndpoints: SDApiEndpoint[];
  highLevelDesign: SDHLDSection[];
  deepDives: SDDeepDive[];
  staffTopics: Array<{ title: string; description: string }>;
}

export interface SDPracticeQuestion {
  id: string;
  title: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  hint: string;
  approach: string;
  components: string[];
  detailedDesign?: SDDetailedDesign;
}

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────

export const systemDesignSections: SDSection[] = [
  // ─── 1. Introduction ───────────────────────
  {
    id: 'introduction',
    name: 'Introduction',
    description: 'Core concepts, vocabulary, and the framework to approach any system design interview.',
    topics: [
      {
        id: 'url-shortener',
        title: 'Design a URL Shortener (like bit.ly)',
        summary: 'Design a service that shortens long URLs into compact aliases and redirects at <10ms latency — a classic Easy SD interview question.',
        explanation:
          'Base62 encode an auto-incremented ID or MD5 hash (take first 7 chars). Store mapping in DB + cache in Redis. Use CDN edge redirect for <10ms redirection. Handle custom aliases as a separate DB column. The system is read-heavy (100:1 read:write ratio) so caching is critical.',
        keyPoints: [
          { label: 'API Gateway', value: 'Single entry point routes POST (shorten) and GET (redirect) requests.' },
          { label: 'URL Shortening Service', value: 'Generates unique Base62 alias from Machine ID + Sequence. Stores in DB.' },
          { label: 'URL Redirection Handler', value: 'Looks up alias in Redis cache first, falls back to DB. Returns 302 redirect.' },
          { label: 'Redis Cache', value: 'Hot redirects served from memory. Target >95% hit rate. INCR for analytics counters.' },
          { label: 'Analytics Service', value: 'Parallel INCR per click, periodic flush to DB — never blocks the redirect path.' },
          { label: 'Database', value: 'DynamoDB/Cassandra for horizontal scaling and low-latency point lookups.' },
        ],
        tradeoffs: '301 Permanent (browser caches, analytics lost) vs 302 Temporary (analytics-friendly, more server load). Hash approach (simple, collision-prone) vs Base62 auto-increment (shardable, no collisions).',
        example: 'Twitter t.co processes every link in 500M daily tweets. Bit.ly handles ~10B redirects/month.',
        detailedDesign: {
          introduction: 'A URL Shortener is a service that takes a long URL and generates a shorter, unique alias that redirects users to the original URL. Popular examples include bit.ly, TinyURL, and Twitter\'s t.co. The alias is a fixed-length string of characters. The system must handle millions of URLs, allowing users to create, store, and retrieve shortened URLs efficiently. Each shortened URL must be unique and persistent. The service must handle high traffic, redirecting in near real-time, and optionally track analytics like click counts and user locations.',
          functionalRequirements: [
            { verb: '"generates a shorter alias"', operation: 'CREATE — URL Shortening', description: 'Users input a long URL and receive a unique, shortened alias using a compact format with English letters and digits.' },
            { verb: '"redirects users to the original URL"', operation: 'READ — URL Redirection', description: 'When a shortened URL is accessed, the service redirects users seamlessly to the original URL with minimal delay.' },
            { verb: '"track link usage"', operation: 'UPDATE/INCREMENT — Analytics', description: 'The system tracks the number of times each shortened URL is accessed to provide insights into link usage.' },
          ],
          scaleRequirements: [
            '100M Daily Active Users',
            'Read:write ratio = 100:1',
            'Data retention for 5 years',
            '~1 million write requests per day',
            'Each URL entry ≈ 500 bytes',
            'Total storage over 5 years: 1M × 365 × 5 × 500B ≈ 912 GB',
            'Read QPS: ~1M writes/day × 100 reads/write ÷ 86400 ≈ ~1,157 read RPS',
          ],
          outOfScope: [
            'Custom vanity URLs (can be added later)',
            'URL expiration and scheduled deletion',
            'User authentication and per-user URL management',
            'Detailed geographic analytics',
          ],
          nonFunctionalRequirements: [
            { title: 'High Availability', description: 'The service should ensure all URLs are accessible 24/7, with minimal downtime, so users can reliably reach their destinations.', derived: 'Derived from "high traffic"' },
            { title: 'Low Latency', description: 'URL redirections should occur almost instantly, ideally in under a few milliseconds, to provide a seamless experience for users.', derived: 'Derived from "near real-time" and "efficiently"' },
            { title: 'High Durability', description: 'Shortened URLs should be stored reliably so they persist over time, even across server failures, ensuring long-term accessibility.', derived: 'Derived from "persistent"' },
            { title: 'Uniqueness', description: 'Each shortened URL must map to exactly one original URL across all users. No two long URLs can share the same short alias.', derived: 'Derived from "unique" alias requirement' },
            { title: 'Security', description: 'The service must prevent malicious links from being created and protect user data, implementing safeguards against spam, abuse, and unauthorized access.', derived: 'Derived from implicit production system requirements' },
          ],
          dataModel: {
            description: 'Nouns in the problem statement reveal the entities. "URL" and "alias" → URLMapping entity. "link usage" and "click counts" → Analytics entity. "persistent" requirement → created_at timestamp. Ownership is split: URL Shortening Service owns URLMapping for unique ID generation; Analytics Service owns Analytics to handle high-volume writes without impacting redirect performance.',
            entities: [
              {
                name: 'URLMapping',
                description: 'Stores the mapping between short URLs and original URLs. Core entity enabling shortening and redirection.',
                fields: [
                  { name: 'short_url', type: 'VARCHAR(8)', description: 'The generated short alias. Primary key. Base62 encoded.' },
                  { name: 'original_url', type: 'TEXT', description: 'The original long URL provided by the user.' },
                  { name: 'created_at', type: 'TIMESTAMP', description: 'Timestamp of record creation. Supports durability and TTL-based cleanup.' },
                  { name: 'user_id', type: 'VARCHAR', description: 'Optional. Owner of the short URL if user accounts are enabled.' },
                  { name: 'custom_alias', type: 'VARCHAR(32)', description: 'Optional. User-defined alias. NULL for auto-generated URLs.' },
                ],
              },
              {
                name: 'Analytics',
                description: 'Tracks access metrics for each shortened URL. Supports the link tracking functional requirement.',
                fields: [
                  { name: 'short_url', type: 'VARCHAR(8)', description: 'Foreign key referencing URLMapping.short_url.' },
                  { name: 'click_count', type: 'BIGINT', description: 'Total number of times the short URL was accessed. Incremented per click.' },
                  { name: 'last_accessed_at', type: 'TIMESTAMP', description: 'Timestamp of the most recent access event.' },
                  { name: 'referrer_counts', type: 'JSONB', description: 'Optional. Map of referrer domain → count for top-referring sites.' },
                ],
              },
            ],
            relationships: 'URLMapping and Analytics have a one-to-one relationship. Each shortened URL has exactly one analytics record. The relationship is optional — URLs can exist without analytics if tracking is disabled.',
          },
          apiEndpoints: [
            {
              method: 'POST',
              path: '/api/urls/shorten',
              description: 'Shorten a given long URL and return the shortened URL.',
              requestNote: 'Body: { "longUrl": "https://..." }. Optionally: { "customAlias": "my-link" }.',
              responseNote: '200 OK: { "shortUrl": "https://short.ly/aB3xY7" }. 400 if longUrl is invalid. 409 if customAlias is already taken.',
            },
            {
              method: 'GET',
              path: '/api/urls/{shortUrl}',
              description: 'Redirect to the original long URL using the shortened URL.',
              requestNote: 'Path param: shortUrl (e.g., aB3xY7). No body required.',
              responseNote: '302 Found with Location: <original_url> header. 404 if shortUrl not found. 410 Gone if URL has expired.',
            },
          ],
          highLevelDesign: [
            {
              step: 1,
              title: 'URL Shortening',
              description: 'Users input a long URL and receive a unique, shortened alias. The design follows a basic two-tier architecture that processes requests quickly and scales to high volumes.',
              bullets: [
                { label: 'Client', detail: 'Frontend sends HTTP POST requests containing long URLs to the URL Shortening service.' },
                { label: 'URL Shortening Service', detail: 'Receives requests and generates a unique short alias by encoding the URL or using hashing. Stores the long→short mapping in the database. Manages collisions and ensures each short URL is globally unique.' },
                { label: 'Database', detail: 'A highly available database (DynamoDB or Cassandra) persists the long-to-short URL mappings. Chosen for horizontal scaling and low-latency point lookups.' },
              ],
            },
            {
              step: 2,
              title: 'URL Redirection',
              description: 'When users access a shortened URL, the service redirects them to the original URL with minimal delay. This design focuses on high read throughput and low latency — read traffic is 100× write traffic.',
              bullets: [
                { label: 'API Gateway', detail: 'Now that we have two request types, an API Gateway routes POST requests to the URL Shortening Service and GET requests to the URL Redirection Handler.' },
                { label: 'URL Redirection Handler', detail: 'Accepts GET requests with the shortened URL, queries the cache first, and responds with a 302 Found status and the original URL in the Location header.' },
                { label: 'Caching Layer (Redis)', detail: 'Read-through caching stores frequently accessed URL mappings in memory. On a cache miss, the cache automatically fetches from the DB and stores the result — transparent to the handler. Target >95% hit rate.' },
                { label: 'Database', detail: 'Stores all URL mappings as the source of truth. Only accessed on cache misses (rare at scale).' },
              ],
            },
            {
              step: 3,
              title: 'Link Analytics',
              description: 'Track the number of times each shortened URL is accessed to provide insights into link usage, designed to scale for high traffic without impacting redirection latency.',
              bullets: [
                { label: 'API Gateway', detail: 'Routes GET requests to both the URL Redirection Handler (for the actual redirect) and the Analytics Service (for event tracking) — in parallel.' },
                { label: 'Analytics Service', detail: 'Tracks each URL access by incrementing a counter associated with the short URL. Uses in-memory counters for speed, then periodically flushes to the database.' },
                { label: 'In-Memory Store (Redis)', detail: 'High-speed counter increments (INCR) per short URL. Enables real-time tracking and reduces load on the main database significantly.' },
                { label: 'Database (periodic flush)', detail: 'Analytics Service flushes in-memory counters to the main database periodically (e.g., every 60s) to ensure persistent storage of access counts.' },
              ],
            },
          ],
          deepDives: [
            {
              question: 'What two properties do we need for the generated short URL IDs?',
              level: 'Mid-Level',
              answer: 'Global Uniqueness: The ID must be globally unique across the entire system — two different long URLs must never get the same short alias. Shortness: The alias must be compact. Production URL shorteners use 5–8 characters (e.g., https://t.ly/ecgGp, https://tinyurl.com/e9enh3uz). The basic idea: generate a unique integer ID per URL, then encode it into a short human-readable string.',
            },
            {
              question: 'How can we generate unique integer IDs for each URL?',
              level: 'Mid-Level',
              answer: 'Four options exist. Machine ID + Sequence Number is the chosen solution because it is fast, distributed, and avoids a central bottleneck.',
              options: [
                { title: 'Hash Functions (MD5/SHA)', description: 'Hash the long URL and take the first 7 characters. Risk of collisions grows with scale. Handling collisions (retry with salt) adds complexity.' },
                { title: 'UUID v4', description: '128-bit random ID. Globally unique but very long — needs heavy encoding to be short. Not sortable. Index fragmentation in B-Trees.' },
                { title: 'Snowflake IDs', description: '64-bit: 41-bit timestamp + 10-bit machine ID + 12-bit sequence. Sortable by time. Requires NTP clock sync. Good option.' },
                { title: 'Machine ID + Sequence Number', description: 'Each server has a unique prefix (1 char). Append a local auto-incrementing sequence. Simple, fast, no coordination needed, naturally maps to sharding.', chosen: true },
              ],
            },
            {
              question: 'How do we encode the integer IDs into short, user-friendly aliases?',
              level: 'Mid-Level',
              answer: 'After generating a unique integer ID, encode it into a shorter, readable string. Must avoid special characters that are confusing or URL-unsafe.',
              options: [
                { title: 'Hexadecimal (Base16)', description: 'Uses 0-9 and a-f. Only 16 characters in alphabet → needs longer strings for same ID space. Not human-friendly.' },
                { title: 'Base64', description: 'Uses A-Z, a-z, 0-9, +, /. 64-character alphabet is more compact, but + and / are URL-unsafe and require encoding.' },
                { title: 'Base62', description: 'Uses A-Z, a-z, 0-9. 62-character alphabet. URL-safe, no special characters. 7 Base62 chars = 62^7 ≈ 3.5 trillion unique IDs. Industry standard.', chosen: true },
              ],
            },
            {
              question: 'How can we scale the system to handle high traffic?',
              level: 'Senior',
              answer: 'Request handlers are stateless HTTP servers — easy to scale horizontally behind a load balancer. For ID generation and the database, we use the Machine ID prefix as a shard key. Each machine is assigned a unique prefix character, which doubles as the shard key. This means write paths are completely independent and concurrent: adding a new machine = adding a new shard, zero impact on existing data. On read (redirect), the prefix in the short URL (e.g., "a" in "a82c7w") directly routes to the correct database shard — O(1) shard lookup. Benefits: (1) Scalability — add machines without reconfiguration. (2) Concurrency — multiple machines write simultaneously without conflicts. (3) Isolation — one shard failure doesn\'t affect others. (4) Simplicity — backup/index/scale per shard independently.',
            },
          ],
          staffTopics: [
            { title: '301 vs 302 Redirect Strategy', description: '301 Permanent Redirect is cached by browsers — future requests go directly to the destination, reducing server load but making analytics impossible (click never hits our server again). 302 Temporary Redirect forces every click through our servers — enables analytics and revocability but increases load. Choice depends on whether analytics and revocability outweigh the performance cost.' },
            { title: 'Multi-Region Deployment and Global Consistency', description: 'Deploy write services to a primary region and read replicas globally. Short URLs are immutable after creation — eventual consistency is acceptable for reads. Use Anycast DNS to route users to the nearest read region. Writes replicate asynchronously; a briefly stale read is tolerable since the URL won\'t change.' },
            { title: 'Service Health Monitoring and Failure Detection', description: 'Implement health checks at the API Gateway layer. Use circuit breakers (Hystrix/Resilience4j) to fail fast if the DB is unresponsive. Cache serves as a buffer during DB degradation — cached URLs continue to redirect even if DB is temporarily down. Alerting on cache hit-rate drop catches DB issues before they become user-facing.' },
            { title: 'Malicious URL Detection and Prevention', description: 'Integrate with Google Safe Browsing API or VirusTotal to scan long URLs before shortening. Add rate limiting per user/IP on the POST endpoint to prevent automated abuse. Implement a URL blacklist for known malicious domains. Consider async scanning (shorten immediately, scan in background, disable if malicious) to keep P99 latency low.' },
          ],
        },
      },
      {
        id: 'what-is-sd',
        title: 'What is System Design?',
        summary: 'The process of defining architecture, components, and data flow for a scalable system.',
        explanation:
          'System design is the process of defining the architecture, interfaces, modules, and data flow for a system that satisfies specified requirements. In interviews you are asked to design large-scale distributed systems — like Twitter, Uber, or Netflix — within 30–45 minutes.',
        keyPoints: [
          { label: 'Goal', value: 'Show structured thinking, trade-off awareness, and scalability intuition.' },
          { label: 'Format', value: 'Open-ended — no single correct answer; process matters more than result.' },
          { label: 'Common Topics', value: 'Load balancing, caching, databases, messaging, CDN, consistency.' },
        ],
        example: 'Design Twitter: need to handle ~500M users, 6000 tweets/sec writes and 600K reads/sec.',
      },
      {
        id: 'interview-framework',
        title: 'Interview Framework',
        summary: 'A repeatable 5-step structure to tackle any SD question.',
        explanation:
          '1. Clarify requirements (functional + non-functional). 2. Estimate scale (users, QPS, storage). 3. High-level design (components diagram). 4. Deep dive (bottlenecks, DB schema, APIs). 5. Recap trade-offs.',
        keyPoints: [
          { label: 'Step 1', value: 'Requirements — what must the system do? What can be excluded?' },
          { label: 'Step 2', value: 'Scale estimation — DAU, QPS reads/writes, storage per year.' },
          { label: 'Step 3', value: 'Components — client, load balancer, app servers, cache, DB, CDN.' },
          { label: 'Step 4', value: 'Deep dive — pick ONE bottleneck and solve it in detail.' },
          { label: 'Step 5', value: 'Recap trade-offs — why this approach over alternatives.' },
        ],
        example: 'Design URL Shortener: FR = shorten URL, redirect. NFR = 100M URLs/day, low latency (<10ms).',
      },
      {
        id: 'back-of-envelope',
        title: 'Back-of-Envelope Estimation',
        summary: 'Quick math to justify design decisions with numbers.',
        explanation:
          'Interviewers want to see that you can reason about scale. Know these: 1 day = 86,400s ≈ 10^5s. 1M RPS needs ~1000 servers (1000 req/server). 1 char = 1 byte, 1 image ≈ 300KB, 1 video ≈ 50MB.',
        keyPoints: [
          { label: 'Traffic', value: '1M DAU × 10 req/day = 10M req/day ÷ 86400 ≈ 116 RPS.' },
          { label: 'Storage', value: '1M users × 1KB metadata = 1GB. 1M photos × 300KB = 300GB.' },
          { label: 'Bandwidth', value: '10M req/day × 10KB avg = 1.16 GB/day ≈ 13 KB/s.' },
          { label: 'Memory (cache)', value: 'Cache top 20% hot data: 1M objects × 1KB × 0.2 = 200MB.' },
        ],
        example: 'Twitter: 300M DAU, avg 5 tweets/day read → 1500M tweets/day read → 17,000 RPS.',
      },
      {
        id: 'latency-numbers',
        title: 'Latency Numbers Everyone Should Know',
        summary: 'Hardware latency intuition from L1 cache to cross-datacenter network.',
        explanation:
          "These numbers help justify caching, avoiding disk reads, and co-locating services. Always reason from first principles.",
        keyPoints: [
          { label: 'L1 cache ref', value: '~0.5 ns' },
          { label: 'RAM access', value: '~100 ns' },
          { label: 'SSD random read', value: '~16 µs (16,000 ns)' },
          { label: 'HDD seek', value: '~10 ms (10,000,000 ns)' },
          { label: 'LAN round trip', value: '~0.5 ms' },
          { label: 'Cross-DC round trip', value: '~150 ms' },
        ],
        tradeoffs: 'A cache miss that hits disk is 200,000× slower than an L1 hit — always cache hot reads.',
      },
    ],
  },

  // ─── 2. Microservices & Data Flow ───────────
  {
    id: 'microservices',
    name: 'Microservices & Data Flow',
    description: 'Decompose monoliths, design inter-service communication, and model data flow.',
    topics: [
      {
        id: 'monolith-vs-micro',
        title: 'Monolith vs Microservices',
        summary: 'Choose the right architecture based on team size, scale, and complexity.',
        explanation:
          'A monolith is a single deployable unit. Microservices split the system into small independently-deployable services each owning its data. Microservices enable independent scaling and deployment but add network complexity, distributed tracing needs, and eventual consistency challenges.',
        keyPoints: [
          { label: 'Monolith pros', value: 'Simple debugging, no network latency between modules, single deploy.' },
          { label: 'Microservices pros', value: 'Independently scalable, tech-stack freedom, fault isolation.' },
          { label: 'Microservices cons', value: 'Network calls, distributed transactions, more infra overhead.' },
          { label: 'Rule of thumb', value: 'Start monolith → extract service only when a module is a scaling bottleneck.' },
        ],
        tradeoffs: 'Netflix started as a monolith and migrated to 700+ microservices over 8 years.',
      },
      {
        id: 'api-gateway',
        title: 'API Gateway',
        summary: 'Single entry point that handles routing, auth, rate limiting, and protocol translation.',
        explanation:
          'An API Gateway sits in front of all microservices. It handles cross-cutting concerns: authentication/authorization, rate limiting, request routing, response aggregation, SSL termination, and logging. Clients only talk to one endpoint instead of knowing each service.',
        keyPoints: [
          { label: 'Routing', value: 'Routes /api/user/* to UserService, /api/order/* to OrderService.' },
          { label: 'Auth', value: 'Validates JWT tokens before forwarding. Services trust gateway.' },
          { label: 'Rate Limit', value: 'Prevents abuse — e.g., 100 req/min per IP.' },
          { label: 'Examples', value: 'AWS API Gateway, Kong, Nginx, Envoy.' },
        ],
        tradeoffs: 'Single point of failure — must be highly available. Can become a bottleneck if not scaled.',
      },
      {
        id: 'sync-vs-async',
        title: 'Synchronous vs Asynchronous Communication',
        summary: 'REST/gRPC for real-time; message queues for decoupled, fault-tolerant flows.',
        explanation:
          'Sync (HTTP/REST, gRPC): caller waits for response. Simple but tight coupling — if downstream is slow, caller blocks. Async (Kafka, RabbitMQ, SQS): producer publishes event to queue; consumer processes independently. Decouples services, absorbs traffic spikes, and enables retry/replay.',
        keyPoints: [
          { label: 'REST', value: 'Simple, stateless, HTTP-based. Use for client-server or service-to-service.' },
          { label: 'gRPC', value: 'Binary protocol over HTTP/2. Faster, type-safe. Use for internal services.' },
          { label: 'Message Queue', value: 'Kafka/SQS: fire-and-forget. Consumer retries on failure. No blocking.' },
          { label: 'Event Streaming', value: 'Kafka retains log — consumers can replay past events.' },
        ],
        tradeoffs: 'Async adds complexity: idempotency, duplicate messages, out-of-order processing.',
        example: 'Order service places order (sync REST), then publishes OrderPlaced event (async Kafka) → inventory, email, billing services consume independently.',
      },
      {
        id: 'service-discovery',
        title: 'Service Discovery',
        summary: 'How microservices find each other at runtime without hardcoded addresses.',
        explanation:
          "Services get dynamic IPs in a cloud environment. Service discovery solves this: each service registers its location on startup. Consumers query the registry to find healthy instances. Two models: client-side (Eureka — client picks instance) and server-side (load balancer does the lookup).",
        keyPoints: [
          { label: 'Tools', value: 'Consul, Eureka, AWS CloudMap, Kubernetes DNS.' },
          { label: 'Health checks', value: 'Registry pings services; removes unhealthy ones automatically.' },
          { label: 'Client-side', value: 'Client queries registry, picks instance, sends request directly.' },
          { label: 'Server-side', value: 'Client hits LB/router, which queries registry and forwards.' },
        ],
      },
    ],
  },

  // ─── 3. Scaling Services ────────────────────
  {
    id: 'scaling-services',
    name: 'Scaling Services',
    description: 'Techniques to handle more traffic — load balancing, CDN, caching, and statelessness.',
    topics: [
      {
        id: 'horizontal-vs-vertical',
        title: 'Horizontal vs Vertical Scaling',
        summary: 'Scale up (bigger server) or scale out (more servers).',
        explanation:
          'Vertical scaling adds more resources (CPU, RAM) to existing servers — simple but has a hardware ceiling and creates a SPOF. Horizontal scaling adds more servers — no ceiling, fault-tolerant, but requires stateless design and a load balancer.',
        keyPoints: [
          { label: 'Vertical', value: 'Upgrade server to 64-core, 512GB RAM. Simple but expensive, SPOF.' },
          { label: 'Horizontal', value: 'Add 10 × 8-core servers. Cheaper, fault tolerant, requires LB.' },
          { label: 'Stateless', value: 'HTTP servers must be stateless for horizontal scaling (no local session).' },
          { label: 'Auto-scaling', value: 'Cloud providers scale out automatically based on CPU/traffic metrics.' },
        ],
        tradeoffs: 'Horizontal scaling requires a shared session store (Redis) and a load balancer.',
      },
      {
        id: 'load-balancing',
        title: 'Load Balancing',
        summary: 'Distribute traffic across servers; route around failures.',
        explanation:
          'A load balancer distributes incoming requests across a pool of backend servers. It continuously health-checks servers and removes unhealthy ones. Algorithms: Round Robin (even spread), Least Connections (fewest active), IP Hash (sticky sessions), Weighted Round Robin.',
        keyPoints: [
          { label: 'Layer 4', value: 'TCP-level routing. Faster but no request content inspection.' },
          { label: 'Layer 7', value: 'HTTP-level routing. Can route by URL path, cookie, headers.' },
          { label: 'Sticky sessions', value: 'IP Hash: same user → same server. Needed for stateful apps.' },
          { label: 'Examples', value: 'Nginx, HAProxy, AWS ALB/NLB, Cloudflare.' },
        ],
        tradeoffs: 'Load balancer itself can be a SPOF — use active-passive or anycast for HA.',
      },
      {
        id: 'cdn',
        title: 'Content Delivery Network (CDN)',
        summary: 'Cache static and dynamic content at edge nodes close to users.',
        explanation:
          'A CDN is a geographically distributed network of proxy servers. Static assets (JS, CSS, images, videos) are cached at edge PoPs (Points of Presence) near users — reducing latency from 150ms cross-DC to <10ms. Some CDNs also cache dynamic API responses with short TTLs.',
        keyPoints: [
          { label: 'Push CDN', value: 'You push content to CDN upfront. Good for known, rarely-changing assets.' },
          { label: 'Pull CDN', value: 'CDN fetches from origin on first request, then caches. Simpler to manage.' },
          { label: 'Cache-Control', value: 'Use Cache-Control headers to set TTL per resource type.' },
          { label: 'Examples', value: 'Cloudflare, AWS CloudFront, Akamai, Fastly.' },
        ],
        tradeoffs: 'Stale content risk — invalidation is complex. Use versioned URLs (/app.v2.js) for immutability.',
      },
      {
        id: 'caching-strategies',
        title: 'Caching Strategies',
        summary: 'Cache-Aside, Read-Through, Write-Through, Write-Behind — pick the right one.',
        explanation:
          'Caching reduces DB load by serving frequently-read data from fast memory. Strategy choice depends on read/write ratio and consistency requirements.',
        keyPoints: [
          { label: 'Cache-Aside', value: 'App checks cache first; on miss, loads from DB and writes to cache. Most common.' },
          { label: 'Read-Through', value: 'Cache itself loads from DB on miss. Transparent to application.' },
          { label: 'Write-Through', value: 'Write to cache + DB synchronously. Strong consistency, slower writes.' },
          { label: 'Write-Behind', value: 'Write to cache immediately, async flush to DB. Faster writes, risk of data loss.' },
          { label: 'Tools', value: 'Redis, Memcached, Varnish.' },
        ],
        tradeoffs: 'Cache invalidation is notoriously hard ("2 Hard Problems in CS"). Use TTL + event-based invalidation.',
        example: 'Twitter home timeline: pre-computed per user in Redis. Read is O(1). Write (tweet) fans out to follower caches.',
      },
      {
        id: 'rate-limiting-basics',
        title: 'Rate Limiting',
        summary: 'Protect services from overload and abuse by capping request rates.',
        explanation:
          'Rate limiting prevents a single client from overwhelming a service. Implemented at API Gateway or per-service. Common algorithms: Fixed Window, Sliding Window Log, Token Bucket, Leaky Bucket.',
        keyPoints: [
          { label: 'Token Bucket', value: 'Bucket fills at constant rate; each request consumes a token. Allows bursts.' },
          { label: 'Leaky Bucket', value: 'Requests leak out at fixed rate. Smooths traffic — no bursts allowed.' },
          { label: 'Sliding Window', value: 'More accurate than fixed window — counts requests in last N seconds.' },
          { label: 'Distributed', value: 'Use Redis atomic increments (INCR + TTL) to coordinate across multiple LB nodes.' },
        ],
        tradeoffs: 'Hard limit vs soft limit. Returning 429 Too Many Requests with Retry-After header is best practice.',
      },
    ],
  },

  // ─── 4. Data Storage ────────────────────────
  {
    id: 'data-storage',
    name: 'Data Storage',
    description: 'SQL vs NoSQL, ACID, CAP theorem, and picking the right DB for the job.',
    topics: [
      {
        id: 'sql-vs-nosql',
        title: 'SQL vs NoSQL',
        summary: 'Relational consistency vs horizontal scalability — pick based on access patterns.',
        explanation:
          'SQL (PostgreSQL, MySQL): structured schema, ACID transactions, powerful queries with JOINs. Best for complex relationships and strong consistency. NoSQL (MongoDB, Cassandra, DynamoDB): schema-flexible, horizontally scalable, eventual consistency. Best for massive write throughput or blob/document storage.',
        keyPoints: [
          { label: 'SQL use cases', value: 'Financial transactions, user profiles with relations, analytics queries.' },
          { label: 'NoSQL use cases', value: 'Chat messages, activity feeds, session data, billions of small writes.' },
          { label: 'Document (MongoDB)', value: 'JSON-like docs. Good for nested objects.' },
          { label: 'Column (Cassandra)', value: 'Wide-column. Optimized for time-series, high write throughput.' },
          { label: 'Key-Value (Redis)', value: 'Ultra-fast in-memory lookups. Session cache, counters.' },
        ],
        tradeoffs: "Don't default to NoSQL for scale — PostgreSQL handles billions of rows with proper indexing.",
      },
      {
        id: 'acid-base',
        title: 'ACID vs BASE',
        summary: 'ACID: strong consistency. BASE: eventual consistency in distributed systems.',
        explanation:
          'ACID (Atomicity, Consistency, Isolation, Durability) is the guarantee of traditional relational DBs. BASE (Basically Available, Soft state, Eventually consistent) describes NoSQL distributed systems that trade consistency for availability and partition tolerance.',
        keyPoints: [
          { label: 'Atomicity', value: 'Transaction succeeds fully or is fully rolled back.' },
          { label: 'Consistency', value: 'DB moves from one valid state to another.' },
          { label: 'Isolation', value: 'Concurrent transactions are isolated from each other.' },
          { label: 'Durability', value: 'Committed data survives crashes (written to disk/log).' },
          { label: 'Eventual', value: 'BASE systems will eventually converge to consistent state. Reads may see stale data.' },
        ],
        tradeoffs: 'Banking requires ACID. Social media likes can tolerate BASE (count ±5 is fine).',
      },
      {
        id: 'cap-theorem',
        title: 'CAP Theorem',
        summary: 'A distributed system can guarantee at most 2 of: Consistency, Availability, Partition Tolerance.',
        explanation:
          'Network partitions always happen in distributed systems — so you must choose between Consistency (every read gets latest write) and Availability (every request gets a response, possibly stale). CA systems are single-node; distributed systems are CP or AP.',
        keyPoints: [
          { label: 'CP systems', value: 'HBase, Zookeeper, etcd. Returns error if partition occurs (sacrifice availability).' },
          { label: 'AP systems', value: 'Cassandra, CouchDB, DynamoDB. Returns possibly stale data (sacrifice consistency).' },
          { label: 'In practice', value: 'PACELC theorem is more nuanced — also considers latency vs consistency tradeoff.' },
        ],
        tradeoffs: 'Social media app: choose AP (uptime matters). Banking: choose CP (consistency matters).',
        example: 'DynamoDB: AP by default. Can opt into higher consistency per-read for a latency cost.',
      },
      {
        id: 'indexing',
        title: 'Indexing',
        summary: 'Speed up reads at the cost of write overhead and storage.',
        explanation:
          'An index is a separate data structure (B-Tree, Hash, Bloom filter) that speeds up lookups on a column. Without an index, DB does a full table scan (O(n)). With a B-Tree index, lookups are O(log n). Indexes slow down writes (must update index on INSERT/UPDATE/DELETE).',
        keyPoints: [
          { label: 'B-Tree', value: 'Default index. Good for range queries and equality. Maintained as sorted tree.' },
          { label: 'Hash Index', value: 'O(1) equality lookups. No range queries. Great for primary keys.' },
          { label: 'Composite', value: 'Index on (user_id, created_at): efficient for "posts by user, sorted by date".' },
          { label: 'Covering index', value: 'Index contains all columns the query needs — no table row lookup needed.' },
        ],
        tradeoffs: "Don't over-index — each index slows writes and uses storage. Index for your read patterns.",
      },
    ],
  },

  // ─── 5. Scaling Data Storage ────────────────
  {
    id: 'scaling-data',
    name: 'Scaling Data Storage',
    description: 'Replication, sharding, and consistent hashing to scale databases beyond one machine.',
    topics: [
      {
        id: 'replication',
        title: 'Database Replication',
        summary: 'Maintain multiple copies of data for availability, read scaling, and disaster recovery.',
        explanation:
          'Replication copies data from a primary (master) node to one or more replica (slave) nodes. Reads can be distributed across replicas (read scaling). If primary fails, a replica is promoted. Two modes: synchronous (strong consistency, slower writes) and asynchronous (eventual consistency, faster writes).',
        keyPoints: [
          { label: 'Primary-Replica', value: 'All writes go to primary; reads distribute across replicas.' },
          { label: 'Multi-Primary', value: 'Multiple writable nodes. Handles write conflicts — more complex.' },
          { label: 'Sync replication', value: 'Primary waits for replica ACK. Zero data loss, slower writes.' },
          { label: 'Async replication', value: 'Primary does not wait. Fast, but replicas may be slightly behind.' },
        ],
        tradeoffs: 'Replication lag: replicas may serve stale reads. Mitigate by routing fresh reads to primary.',
      },
      {
        id: 'sharding',
        title: 'Database Sharding',
        summary: 'Partition data horizontally across multiple DB servers to scale writes.',
        explanation:
          'Sharding splits a large dataset into smaller subsets (shards) stored on separate DB nodes. A shard key determines which shard stores each record. This scales both storage and write throughput horizontally.',
        keyPoints: [
          { label: 'Hash sharding', value: 'shard = hash(user_id) % N. Even distribution but hard to range query.' },
          { label: 'Range sharding', value: 'Shard by date range or alphabetical. Enables range queries but can hotspot.' },
          { label: 'Directory sharding', value: 'Lookup table maps key to shard. Flexible but lookup is extra hop.' },
          { label: 'Hotspot problem', value: 'A "celebrity" user causes one shard to receive disproportionate traffic.' },
        ],
        tradeoffs: 'Cross-shard JOINs and distributed transactions become very difficult. Design schema to avoid them.',
        example: 'Instagram shards by user_id: all photos of user X are on shard hash(X) % 1000.',
      },
      {
        id: 'consistent-hashing',
        title: 'Consistent Hashing',
        summary: 'Minimize data migration when adding/removing nodes in a distributed cache or DB.',
        explanation:
          'In consistent hashing, both servers and keys are mapped to a ring using a hash function. A key is assigned to the first server clockwise from its position on the ring. When a server is added/removed, only keys near that server are remapped — not all keys.',
        keyPoints: [
          { label: 'Problem solved', value: 'Adding a node to a simple modulo hash causes 80–100% key remapping.' },
          { label: 'Ring', value: 'Hash ring [0, 2^32). Servers and keys hashed onto it.' },
          { label: 'Virtual nodes', value: 'Each server claims multiple positions on ring for even distribution.' },
          { label: 'Used by', value: 'Cassandra, DynamoDB, Riak, distributed caches like Twemproxy.' },
        ],
        tradeoffs: 'Without virtual nodes, non-uniform distribution causes hotspots.',
        example: 'Memcached cluster: use consistent hashing so adding server 5 only remaps ~20% of keys.',
      },
      {
        id: 'connection-pooling',
        title: 'Connection Pooling',
        summary: 'Reuse database connections to avoid the overhead of creating a new connection per request.',
        explanation:
          'Creating a DB connection involves TCP handshake + auth — ~50–100ms. Under high load, thousands of concurrent connections exhaust DB resources. A connection pool maintains a fixed set of ready connections and lends them to application threads.',
        keyPoints: [
          { label: 'Pool size', value: 'Rule of thumb: pool_size = (cores × 2) + effective_spindle_count.' },
          { label: 'PgBouncer', value: 'PostgreSQL connection pooler — reduces active connections from 10K → 100.' },
          { label: 'Timeout', value: 'Set checkout timeout — fail fast if pool is exhausted rather than queuing forever.' },
        ],
        tradeoffs: 'Pool too small → requests wait. Pool too large → DB gets overwhelmed anyway.',
      },
    ],
  },

  // ─── 6. Big Data ────────────────────────────
  {
    id: 'big-data',
    name: 'Big Data',
    description: 'Batch processing, stream processing, and analytics architectures for petabyte-scale data.',
    topics: [
      {
        id: 'batch-vs-stream',
        title: 'Batch vs Stream Processing',
        summary: 'Process historical data in bulk (batch) vs react to events as they arrive (stream).',
        explanation:
          'Batch processing runs periodic jobs on large historical datasets — great for reports, ML training, ETL. Stream processing handles unbounded data in near-real-time — alerting, fraud detection, live dashboards. Many systems use Lambda Architecture: both paths together.',
        keyPoints: [
          { label: 'Batch', value: 'MapReduce, Spark. Input: HDFS/S3. Output: aggregated reports. Latency: hours.' },
          { label: 'Stream', value: 'Kafka Streams, Flink, Spark Streaming. Latency: seconds to milliseconds.' },
          { label: 'Lambda Arch', value: 'Batch layer (accuracy) + speed layer (real-time) + serving layer (merges both).' },
          { label: 'Kappa Arch', value: 'Stream-only — replay historical data through the same stream pipeline.' },
        ],
        tradeoffs: 'Lambda is operationally complex (two code paths). Kappa is simpler but needs fast replay.',
        example: 'Uber Surge: stream for real-time pricing. Batch nightly for driver earnings reports.',
      },
      {
        id: 'mapreduce',
        title: 'MapReduce',
        summary: 'Parallel processing paradigm: Map (split & process) → Shuffle → Reduce (aggregate).',
        explanation:
          'MapReduce is a programming model for processing large datasets in parallel across a cluster. Map step: apply a function to each record, emitting (key, value) pairs. Shuffle: group all values by key across machines. Reduce step: aggregate values per key.',
        keyPoints: [
          { label: 'Map', value: 'Input: log lines. Emit: (word, 1) for each word in line.' },
          { label: 'Shuffle', value: 'Cluster groups all (word, [1,1,1,...]) pairs by key across network.' },
          { label: 'Reduce', value: 'Sum counts: ("hello", [1,1,1]) → ("hello", 3).' },
          { label: 'Fault tolerance', value: 'Failed map tasks automatically re-run on another node.' },
        ],
        tradeoffs: 'Disk I/O between stages makes MapReduce slow for iterative jobs. Spark keeps data in memory.',
        example: 'Google counts PageRank across 50B pages using MapReduce jobs on thousands of commodity servers.',
      },
      {
        id: 'data-warehouse',
        title: 'Data Warehouses & Data Lakes',
        summary: 'Centralized repositories optimized for analytics queries over structured or raw data.',
        explanation:
          'Data Warehouse: structured, schema-on-write, optimized for SQL analytics (Redshift, BigQuery, Snowflake). Data Lake: raw unstructured data in object storage (S3), schema-on-read, processed by Spark/Athena. Data Lakehouse: combines both (Delta Lake, Apache Iceberg).',
        keyPoints: [
          { label: 'OLTP', value: 'Operational DB — optimized for transactional reads/writes (many small queries).' },
          { label: 'OLAP', value: 'Analytical DB — optimized for aggregation across billions of rows (few big queries).' },
          { label: 'Columnar storage', value: 'Parquet/ORC: store data by column — OLAP queries skip irrelevant columns.' },
          { label: 'ETL/ELT', value: 'ETL: transform before loading. ELT: load raw, transform in warehouse.' },
        ],
      },
      {
        id: 'message-queue-deep',
        title: 'Message Queues & Event Streaming',
        summary: 'Kafka, SQS, RabbitMQ — decouple producers from consumers at any scale.',
        explanation:
          'A message queue decouples services: producers push messages; consumers pull and process at their own pace. Kafka is a distributed, replicated, persistent log — consumers can replay events. SQS/RabbitMQ are traditional queues where messages are deleted after ACK.',
        keyPoints: [
          { label: 'Kafka', value: 'Append-only log, partitioned for parallelism, retained by time/size. Replay possible.' },
          { label: 'SQS', value: 'Managed, at-least-once delivery, max 14-day retention. Simple to operate.' },
          { label: 'Partitions', value: 'Each Kafka partition is consumed by one consumer per group — scales linearly.' },
          { label: 'Consumer groups', value: 'Multiple services can independently consume same topic.' },
        ],
        tradeoffs: 'At-least-once delivery means duplicates — consumers must be idempotent.',
        example: 'Uber: every trip event published to Kafka → consumed by billing, ETA, analytics, maps pipelines simultaneously.',
      },
    ],
  },

  // ─── 7. Patterns & Templates ────────────────
  {
    id: 'patterns',
    name: 'Patterns & Templates',
    description: 'Battle-tested patterns used in real production systems — understand when and why to apply them.',
    topics: [
      {
        id: 'database-optimization',
        title: 'Database Optimization',
        summary: 'Query tuning, connection pooling, read replicas, and index strategies.',
        explanation:
          'DB is typically the first bottleneck. Approach: EXPLAIN queries to find slow plans, add covering indexes, use connection pooling, introduce read replicas for reading load, and cache frequently-read data in Redis.',
        keyPoints: [
          { label: 'EXPLAIN ANALYZE', value: 'Shows query execution plan — identifies missing indexes and seq scans.' },
          { label: 'Read replicas', value: 'Route SELECT queries to replicas, writes to primary.' },
          { label: 'Denormalization', value: 'Duplicate data to avoid expensive JOINs in hot paths.' },
          { label: 'Partial indexes', value: 'Index only a subset of rows: CREATE INDEX ON orders(id) WHERE status=\'pending\'.' },
          { label: 'Materialized views', value: 'Pre-computed query results stored as table — refresh periodically.' },
        ],
      },
      {
        id: 'cache-first',
        title: 'Cache-First',
        summary: 'Serve requests from cache; fall back to DB only on miss.',
        explanation:
          'Cache-first (Cache-Aside) is the most common pattern. Application checks Redis first. On hit: return cached result. On miss: query DB, store result in cache with TTL, return result. On write: invalidate or update cache entry.',
        keyPoints: [
          { label: 'Cache hit rate', value: 'Target >90% hit rate for meaningful impact. Monitor with cache hit/miss metrics.' },
          { label: 'TTL strategy', value: 'Short TTL (1–5 min) for user feeds. Long TTL (24h) for rarely-changed data.' },
          { label: 'Cache stampede', value: 'Many simultaneous misses flood DB. Fix: probabilistic early expiry or mutex lock.' },
          { label: 'Thundering herd', value: 'After deploy/restart, cold cache → all traffic hits DB. Warm cache proactively.' },
        ],
        tradeoffs: 'Stale reads until TTL expires. Acceptable for most social/content apps.',
        example: 'Twitter serves home timeline from Redis — ~98% of timeline reads are cache hits.',
      },
      {
        id: 'pre-computing',
        title: 'Pre-Computing',
        summary: 'Compute expensive results ahead of time and serve pre-built responses.',
        explanation:
          'Instead of computing on every request, compute results offline (cron, event-triggered) and store them. Trades write complexity for unlimited read speed. Classic example: Twitter "fan-out on write" pre-builds each user\'s home timeline.',
        keyPoints: [
          { label: 'Fan-out on write', value: 'When Alice tweets, her tweet is pushed to all N followers\' timeline caches.' },
          { label: 'Fan-out on read', value: 'Timeline assembled from followees\' tweet lists at read time. Better for celebrities.' },
          { label: 'Leaderboards', value: 'Redis sorted sets (ZADD/ZRANGE) updated per score event — O(log n) per write.' },
          { label: 'Reports', value: 'Nightly batch job pre-computes last-30-day stats; dashboard reads pre-built result.' },
        ],
        tradeoffs: 'For celebrities (Obama with 100M followers), fan-out on write would create 100M writes per tweet. Use hybrid: fan-out for regular users, fan-in for celebrities.',
      },
      {
        id: 'database-per-service',
        title: 'Database Per Service',
        summary: 'Each microservice owns its own database — no shared DB across services.',
        explanation:
          'This pattern enforces loose coupling: services can use different DB types (polyglot persistence), schema changes are independent, and a DB failure only affects one service. Services never query each other\'s DB directly; they call APIs or consume events.',
        keyPoints: [
          { label: 'Polyglot', value: 'UserService: PostgreSQL. CartService: Redis. ProductService: Elasticsearch.' },
          { label: 'No shared DB', value: 'Sharing DB creates implicit coupling — schema changes break other services.' },
          { label: 'Data sync', value: 'Sync data across services via events (Outbox pattern) not direct DB reads.' },
          { label: 'Distributed tx', value: 'No ACID across services — use Saga pattern (choreography or orchestration).' },
        ],
        tradeoffs: 'More operational overhead. Cross-service queries require API aggregation (BFF or GraphQL).',
      },
      {
        id: 'multi-system-sync',
        title: 'Multi-System Sync',
        summary: 'Keep data consistent across multiple datastores (DB + cache + search + analytics).',
        explanation:
          'A single operation often needs to update multiple systems: primary DB, Redis cache, Elasticsearch index, and analytics warehouse. The Outbox Pattern ensures all systems eventually get the update reliably without distributed transactions.',
        keyPoints: [
          { label: 'Dual writes problem', value: 'Writing to DB then cache — if cache write fails, systems diverge.' },
          { label: 'Outbox pattern', value: 'Write event to outbox table in same DB transaction; separate process publishes to queue.' },
          { label: 'CDC', value: 'Change Data Capture (Debezium) reads DB WAL log and publishes all changes to Kafka.' },
          { label: 'Idempotency', value: 'Consumers must handle duplicate events gracefully (same event processed twice).' },
        ],
        tradeoffs: 'Eventual consistency between systems — search index may be 1–2 seconds behind DB.',
        example: 'Shopify: order saved to Postgres → Debezium publishes OrderCreated → Elasticsearch, analytics, email service all update.',
      },
      {
        id: 'unique-id-generators',
        title: 'Unique ID Generators',
        summary: 'Globally unique IDs that are sortable, efficient, and work across distributed nodes.',
        explanation:
          'Auto-increment DB IDs fail at scale (single point of SPOF, expose count, not distributed-friendly). Better solutions: UUID (128-bit random), Snowflake ID (64-bit with timestamp + node + sequence), ULID (sortable UUID).',
        keyPoints: [
          { label: 'UUID v4', value: '128-bit random. Globally unique. Not sortable. Index inefficiency in B-Trees.' },
          { label: 'Snowflake', value: '41-bit timestamp + 10-bit machine ID + 12-bit sequence = 64-bit int. Sortable. Used by Twitter.' },
          { label: 'ULID', value: '26-char base32: 48-bit timestamp + 80-bit random. Sortable, URL-safe.' },
          { label: 'DB sequence srv', value: 'Ticket Server pattern: central DB sequence generates IDs in bulk batches.' },
        ],
        tradeoffs: "Snowflake requires clock sync (NTP). UUID v4 causes page splits in B-Tree indexes. Use UUID v7 or ULID for new systems.",
        example: 'Twitter Snowflake: every tweet, user, and DM gets a 64-bit Snowflake ID — extracting timestamp by bit-shift is a bonus.',
      },
      {
        id: 'rate-limiting-pattern',
        title: 'Rate Limiting Pattern',
        summary: 'Token Bucket, Leaky Bucket, Sliding Window — distributed rate limiting with Redis.',
        explanation:
          'Implement rate limiting in API Gateway or per-service middleware. Store counters in Redis for distributed coordination across multiple app instances. Token Bucket is most popular: allows burst up to bucket size, refills at constant rate.',
        keyPoints: [
          { label: 'Token Bucket', value: 'INCR + EXPIRE in Redis. If count > limit, reject with 429. Allows burst traffic.' },
          { label: 'Sliding Window', value: 'ZADD timestamp to sorted set; ZCOUNT in last N seconds. Accurate, more memory.' },
          { label: 'Per-user vs global', value: 'Key by (user_id, endpoint) for per-user limits. Key by (IP) for global abuse prevention.' },
          { label: 'Retry-After', value: 'Return Retry-After header with seconds until request can be retried.' },
        ],
        example: 'GitHub API: 5000 req/hour for authenticated users. Uses token bucket per access_token in Redis.',
      },
      {
        id: 'two-stage-processing',
        title: 'Two-Stage Processing',
        summary: 'Split expensive operations into a fast acknowledgment stage and a slower processing stage.',
        explanation:
          'Accept requests immediately (stage 1: write to queue, return 202 Accepted) and process them asynchronously (stage 2: worker pulls from queue, does heavy work). Decouples client latency from processing time and absorbs traffic spikes.',
        keyPoints: [
          { label: 'Stage 1', value: 'Validate, persist to queue (Kafka/SQS), return job_id immediately.' },
          { label: 'Stage 2', value: 'Worker processes job asynchronously. Status queryable via job_id.' },
          { label: 'Backpressure', value: 'Queue depth tells you processing is falling behind — scale workers up.' },
          { label: 'DLQ', value: 'Dead Letter Queue: failed messages after N retries moved here for inspection.' },
        ],
        tradeoffs: 'Client must poll for result or receive webhook callback — more complex client logic.',
        example: 'YouTube upload: stage 1 receives video (202 Accepted). Stage 2 transcodes to 360p/720p/1080p asynchronously.',
      },
      {
        id: 'fan-out-fan-in',
        title: 'Fan-Out / Fan-In',
        summary: 'Scatter work to many parallel workers (fan-out), then aggregate results (fan-in).',
        explanation:
          'Fan-out: one triggering event spawns N parallel tasks for speed or distribution. Fan-in: collect N async results and merge. Used for parallel data fetch, scatter-gather search, and content delivery systems.',
        keyPoints: [
          { label: 'Fan-out', value: 'Email service sends to 10M users: fan out to 100 worker queues of 100K each.' },
          { label: 'Fan-in', value: 'Aggregate search: query 10 shards in parallel, merge results, sort, paginate.' },
          { label: 'Scatter-gather', value: 'Aggregator sends to N backends, waits for all (or fastest K) responses.' },
          { label: 'Timeout', value: 'Fan-in must have a timeout — return partial results rather than waiting forever.' },
        ],
        tradeoffs: "Slow child worker blocks fan-in. Use timeout + partial results. Tail latency becomes the bottleneck.",
        example: "Google Search: query fans out to ~1000 index shards simultaneously. Results fan in, merged in <100ms.",
      },
      {
        id: 'saga-pattern',
        title: 'Saga Pattern',
        summary: 'Manage distributed transactions across microservices using a sequence of local transactions with compensating actions.',
        explanation:
          'Since microservices cannot share DB transactions, the Saga pattern breaks a distributed transaction into local transactions linked by events or an orchestrator. If any step fails, compensating transactions undo previous steps.',
        keyPoints: [
          { label: 'Choreography', value: 'Each service publishes events and reacts to others. Decentralized, complex to debug.' },
          { label: 'Orchestration', value: 'Central Saga orchestrator sends commands and handles failures. Easier to trace.' },
          { label: 'Compensating tx', value: 'Every step has an undo action: "Book hotel" → compensating = "Cancel hotel booking".' },
          { label: 'Idempotency', value: 'Each step must be safe to retry (same input = same output, no duplicate effects).' },
        ],
        tradeoffs: 'No atomicity guarantee between services — other services temporarily see partial state. Design UI to handle pending states.',
        example: 'E-commerce checkout: Reserve Inventory → Charge Payment → Send Confirmation. If payment fails → Release Inventory (compensating).',
      },
    ],
  },
];

// ─────────────────────────────────────────────
// PRACTICE QUESTIONS
// ─────────────────────────────────────────────

// url-shortener moved to systemDesignSections Introduction topics (first card before "What is System Design?")
export const sdPracticeQuestions: SDPracticeQuestion[] = [
  {
    id: 'rate-limiter',
    title: 'Design a Distributed Rate Limiter',
    difficulty: 'Easy',
    hint: 'Where do you store the counter? How do you handle multiple API gateway nodes?',
    approach: 'Token Bucket algorithm. Store counters in Redis with INCR + EXPIRE. Lua script for atomic check-and-increment. Key: user_id:endpoint:window. Return 429 + Retry-After header when limit exceeded.',
    components: ['API Gateway', 'Redis Cluster', 'Load Balancer'],
  },
  {
    id: 'twitter-feed',
    title: 'Design Twitter Home Timeline',
    difficulty: 'Medium',
    hint: 'Fan-out on write vs fan-out on read. What about celebrities with 100M followers?',
    approach: "Fan-out on write for regular users: on tweet, push tweet_id to all followers' timeline caches in Redis. For celebrities (>1M followers): fan-out on read — merge celebrity tweets at read time. Store tweet content in Cassandra. Timeline list in Redis (LPUSH/LRANGE).",
    components: ['API Gateway', 'Tweet Service', 'Fan-out Worker', 'Kafka', 'Redis (timelines)', 'Cassandra (tweets)', 'User Graph Service'],
  },
  {
    id: 'youtube',
    title: 'Design YouTube / Video Streaming',
    difficulty: 'Medium',
    hint: 'Focus on upload pipeline, transcoding, and how to stream efficiently.',
    approach: 'Upload: client uploads to S3 via presigned URL → publishes event to Kafka → transcoding workers convert to 360/720/1080p, store in S3. Stream: videos served via CDN (HLS/DASH adaptive bitrate). Metadata in PostgreSQL. View count in Redis (batched flush to DB).',
    components: ['CDN', 'S3 Object Storage', 'Kafka', 'Transcoding Workers', 'PostgreSQL', 'Redis'],
  },
  {
    id: 'uber',
    title: 'Design Uber / Ride Matching',
    difficulty: 'Hard',
    hint: 'How do you efficiently query nearby drivers? Think geospatial indexing.',
    approach: 'Driver location updates every 5s → Redis Geo (GEOADD/GEORADIUS) for nearest-driver queries. Matching service: GEORADIUS → filter available drivers → send offer. WebSocket for real-time driver tracking. Trip data in PostgreSQL. Surge pricing: stream processing on Kafka for real-time supply/demand.',
    components: ['WebSocket Gateway', 'Location Service', 'Redis Geo', 'Matching Service', 'Kafka', 'PostgreSQL', 'Trip Service'],
  },
  {
    id: 'google-drive',
    title: 'Design Google Drive / Dropbox',
    difficulty: 'Hard',
    hint: 'File chunking, deduplication, sync protocol, and conflict resolution.',
    approach: 'Files split into 256KB chunks. Each chunk hashed (SHA-256) → deduplication (same chunk stored once). Chunks stored in S3. Metadata (file tree, chunk list) in PostgreSQL. Sync: long-polling or WebSocket for change notifications. Conflict: last-write-wins or version vector for multi-device.',
    components: ['Client SDK', 'API Gateway', 'File Service', 'S3', 'PostgreSQL (metadata)', 'Redis (session/chunk dedup)', 'Notification Service'],
  },
  {
    id: 'search-typeahead',
    title: 'Design Search Typeahead / Autocomplete',
    difficulty: 'Medium',
    hint: 'Trie data structure, but how do you scale and rank suggestions?',
    approach: 'Trie in memory on each server. Pre-built offline from query logs (top-K per prefix). Serve from Redis sorted set (ZADD query by frequency, ZRANGEBYLEX for prefix). Update trie daily via batch job on query log. Separate index per language/region.',
    components: ['CDN', 'Typeahead Service', 'Redis (prefix → top-K)', 'Spark Batch Job', 'Query Log (Kafka)'],
  },
  {
    id: 'notification-system',
    title: 'Design a Notification System (Push/Email/SMS)',
    difficulty: 'Medium',
    hint: 'How do you handle different channels, delivery guarantees, and user preferences?',
    approach: "Event producers publish to Kafka topics. Notification Service consumes events, checks user preferences, routes to channel workers (FCM push, SendGrid email, Twilio SMS). Each channel worker handles retries with exponential backoff. Delivery receipts stored in Cassandra. Unsubscribe preferences in Redis.",
    components: ['Kafka', 'Notification Router', 'Push Worker (FCM)', 'Email Worker (SendGrid)', 'SMS Worker (Twilio)', 'Redis (preferences)', 'Cassandra (receipts)'],
  },
];
