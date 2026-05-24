export type ProjectCategory =
  | "games"
  | "community"
  | "education"
  | "events"
  | "partnerships";

export interface Project {
  slug: string;
  title: string;
  category: ProjectCategory;
  tags: string[];
  description: string;
  descriptionKo: string;
  status?: "live" | "in-progress" | "upcoming";
  featured?: boolean;
}

export const categoryLabels: Record<ProjectCategory, string> = {
  games: "Games",
  community: "Community",
  education: "Education",
  events: "Events",
  partnerships: "Partnerships",
};

export const projects: Project[] = [
  {
    slug: "speed-obby",
    title: "Speed Obby",
    category: "games",
    tags: ["Game", "LiveOps", "Analytics"],
    description:
      "A Roblox time-attack obby project testing retention, stage design, community events, and data-driven LiveOps.",
    descriptionKo:
      "리텐션, 스테이지 디자인, 커뮤니티 이벤트, 데이터 기반 LiveOps를 검증하는 Roblox 타임어택 오비 프로젝트.",
    status: "live",
    featured: true,
  },
  {
    slug: "swarmrot",
    title: "Swarmrot",
    category: "games",
    tags: ["Game", "Internet-native IP", "PvP"],
    description:
      "A meme-native strategy PvP project exploring swarm battles, faction identity, and internet culture as game IP.",
    descriptionKo:
      "무리 전투, 진영 정체성, 인터넷 문화를 게임 IP로 확장하는 밈 네이티브 전략 PvP 프로젝트.",
    status: "in-progress",
    featured: true,
  },
  {
    slug: "gokui",
    title: "GOKUI / The Hell Doctor",
    category: "games",
    tags: ["Game", "Co-op Action", "Worldbuilding"],
    description:
      "A co-op action project exploring Oni mythology, body infiltration, and original worldbuilding.",
    descriptionKo:
      "오니 신화, 몸속 침투, 오리지널 세계관을 결합한 협동 액션 IP 프로젝트.",
    status: "in-progress",
    featured: true,
  },
  {
    slug: "telum",
    title: "Telum",
    category: "games",
    tags: ["Game", "PvP", "Creator Studio"],
    description:
      "A creator-led Roblox PvP project built around weapons, exploration, and environmental combat.",
    descriptionKo:
      "무기 탐색, 전투, 지형 활용을 중심으로 한 크리에이터 주도 Roblox PvP 프로젝트.",
    status: "in-progress",
    featured: true,
  },
  {
    slug: "anchored-guild",
    title: "Anchored Guild",
    category: "community",
    tags: ["Community", "Discord", "Creators"],
    description:
      "A Discord-based community where Korean UGC game creators meet, learn, and collaborate.",
    descriptionKo:
      "한국 UGC 게임 크리에이터들이 만나고, 배우고, 협업하는 Discord 기반 커뮤니티.",
    status: "live",
    featured: true,
  },
  {
    slug: "winter-roblox-camp-2026",
    title: "Anchored School Winter Camp 2026",
    category: "education",
    tags: ["Incubation", "Education"],
    description:
      "A creator incubation program designed to discover and grow emerging Roblox developers.",
    descriptionKo:
      "신진 Roblox 개발자를 발굴하고 성장시키기 위한 크리에이터 인큐베이션 프로그램.",
    status: "upcoming",
    featured: true,
  },
  {
    slug: "korea-roblox-developer-meetup-2026",
    title: "Korea Roblox Developer Meetup",
    category: "events",
    tags: ["Community", "Ecosystem"],
    description:
      "An offline gathering connecting creators, studios, platforms, and partners in the Korean Roblox ecosystem.",
    descriptionKo:
      "한국 Roblox 생태계의 크리에이터, 스튜디오, 플랫폼, 파트너를 연결하는 오프라인 밋업.",
    status: "upcoming",
  },
  {
    slug: "shell-economy",
    title: "Shell Economy",
    category: "community",
    tags: ["Economy", "Gamification"],
    description:
      "A community currency system designed to encourage daily participation and creator engagement.",
    descriptionKo:
      "일일 미션, 퀴즈, 이벤트 참여를 통해 커뮤니티 활동을 강화하는 조개 경제 시스템.",
    status: "live",
  },
  {
    slug: "creator-growth-index",
    title: "Creator Growth Index",
    category: "education",
    tags: ["Framework", "Growth"],
    description:
      "A framework for measuring creator growth across code, build, system, team, and platform understanding.",
    descriptionKo:
      "CODE, BUILD, SYSTEM, TEAM, PLATFORM 기준으로 크리에이터의 성장을 측정하는 평가 프레임워크.",
    status: "live",
  },
  {
    slug: "anchored-demo-day",
    title: "Anchored Demo Day",
    category: "events",
    tags: ["Demo", "Showcase"],
    description:
      "A monthly showcase where creators present Roblox projects and receive feedback.",
    descriptionKo:
      "크리에이터들이 개발 중인 Roblox 프로젝트를 공유하고 피드백을 받는 월간 쇼케이스.",
    status: "live",
  },
  {
    slug: "platform-partnerships",
    title: "Platform Partnerships",
    category: "partnerships",
    tags: ["B2B", "Platform"],
    description:
      "Collaborating with game companies and platforms to support the next generation of UGC creators.",
    descriptionKo:
      "게임사와 플랫폼 파트너와 함께 차세대 UGC 크리에이터 생태계를 지원합니다.",
    status: "live",
  },
  {
    slug: "brand-campaigns",
    title: "Brand Campaigns in Roblox",
    category: "partnerships",
    tags: ["Brand", "Campaign"],
    description:
      "Designing Roblox-native brand experiences through games, creators, and community events.",
    descriptionKo:
      "게임, 크리에이터, 커뮤니티 이벤트를 연결한 Roblox 네이티브 브랜드 경험을 설계합니다.",
    status: "in-progress",
  },
];
