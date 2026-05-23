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
  description: string;
  descriptionKo: string;
  tags: string[];
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
    description:
      "A Roblox time-attack obby focused on speed, records, and data-driven balancing.",
    descriptionKo:
      "속도, 기록 경쟁, 데이터 기반 밸런싱을 중심으로 한 Roblox 타임어택 오비 프로젝트.",
    tags: ["Roblox", "Obby", "LiveOps"],
    status: "live",
    featured: true,
  },
  {
    slug: "swarmrot",
    title: "Swarmrot",
    category: "games",
    description:
      "A large-scale Roblox PvP strategy game inspired by swarm battles and internet culture.",
    descriptionKo:
      "대규모 유닛 전투와 인터넷 밈 문화를 결합한 Roblox 전략 PvP 프로젝트.",
    tags: ["Roblox", "PvP", "Strategy"],
    status: "in-progress",
    featured: true,
  },
  {
    slug: "gokui",
    title: "GOKUI / The Hell Doctor",
    category: "games",
    description:
      "A co-op action game where players enter an Oni's body to fight disease spirits.",
    descriptionKo:
      "오니의 몸속에 침투해 병마를 처치하는 4인 협동 액션 게임 프로젝트.",
    tags: ["Roblox", "Co-op", "Action"],
    status: "in-progress",
    featured: true,
  },
  {
    slug: "telum",
    title: "Telum",
    category: "games",
    description:
      "A weapon-based Roblox PvP game built around discovery, combat, and environmental strategy.",
    descriptionKo:
      "무기 탐색, 전투, 지형 활용을 중심으로 한 Roblox PvP 프로젝트.",
    tags: ["Roblox", "PvP", "Combat"],
    status: "in-progress",
  },
  {
    slug: "anchored-guild",
    title: "Anchored Guild",
    category: "community",
    description: "A Discord-based community for Korean Roblox creators.",
    descriptionKo:
      "한국 Roblox 크리에이터들이 모이고 협업하는 Discord 기반 커뮤니티.",
    tags: ["Discord", "Community", "Creators"],
    status: "live",
    featured: true,
  },
  {
    slug: "shell-economy",
    title: "Shell Economy",
    category: "community",
    description:
      "A community currency system designed to encourage daily participation and creator engagement.",
    descriptionKo:
      "일일 미션, 퀴즈, 이벤트 참여를 통해 커뮤니티 활동을 강화하는 조개 경제 시스템.",
    tags: ["Economy", "Gamification", "Retention"],
    status: "live",
  },
  {
    slug: "creator-onboarding-quest",
    title: "Creator Onboarding Quest",
    category: "community",
    description:
      "Turning community onboarding into a game-like journey for new Roblox creators.",
    descriptionKo:
      "신규 크리에이터 온보딩을 RPG 퀘스트처럼 설계한 커뮤니티 리텐션 프로젝트.",
    tags: ["Onboarding", "Quest", "Gamification"],
    status: "live",
  },
  {
    slug: "winter-roblox-camp-2026",
    title: "Anchored School Winter Roblox Camp 2026",
    category: "education",
    description:
      "A 4-week Roblox creator camp for emerging developers in Korea.",
    descriptionKo:
      "한국의 신진 Roblox 크리에이터를 위한 4주간의 창작 캠프.",
    tags: ["Education", "Camp", "Beginners"],
    status: "upcoming",
    featured: true,
  },
  {
    slug: "creator-growth-index",
    title: "Creator Growth Index",
    category: "education",
    description:
      "A framework for measuring creator growth across code, build, system, team, and platform understanding.",
    descriptionKo:
      "CODE, BUILD, SYSTEM, TEAM, PLATFORM 기준으로 크리에이터의 성장을 측정하는 평가 프레임워크.",
    tags: ["Framework", "Growth", "Assessment"],
    status: "live",
  },
  {
    slug: "roblox-workshop-series",
    title: "Roblox Workshop Series",
    category: "education",
    description:
      "Practical workshops for creators learning game design, scripting, building, and LiveOps.",
    descriptionKo:
      "게임 기획, 스크립팅, 빌드, LiveOps를 배우는 Roblox 실전 워크숍.",
    tags: ["Workshop", "Scripting", "LiveOps"],
    status: "live",
  },
  {
    slug: "korea-roblox-developer-meetup-2026",
    title: "2026 Korea Roblox Developer Meetup",
    category: "events",
    description:
      "A meetup connecting Roblox developers, creators, studios, and partners in Korea.",
    descriptionKo:
      "한국 Roblox 개발자, 크리에이터, 스튜디오, 파트너를 연결하는 오프라인 밋업.",
    tags: ["Meetup", "Networking", "Offline"],
    status: "upcoming",
    featured: true,
  },
  {
    slug: "anchored-demo-day",
    title: "Anchored Demo Day",
    category: "events",
    description:
      "A monthly showcase where creators present Roblox projects and receive feedback.",
    descriptionKo:
      "크리에이터들이 개발 중인 Roblox 프로젝트를 공유하고 피드백을 받는 월간 쇼케이스.",
    tags: ["Demo", "Showcase", "Monthly"],
    status: "live",
  },
  {
    slug: "anchor-hunt",
    title: "Anchor Hunt",
    category: "events",
    description:
      "A participatory event quest designed for offline creator meetups.",
    descriptionKo:
      "오프라인 밋업 참여자들이 자연스럽게 교류하도록 설계한 참여형 이벤트 퀘스트.",
    tags: ["Quest", "Offline", "Networking"],
    status: "upcoming",
  },
  {
    slug: "platform-partnerships",
    title: "Platform Partnerships",
    category: "partnerships",
    description:
      "Collaborating with game companies and platforms to support the next generation of Roblox creators.",
    descriptionKo:
      "게임사와 플랫폼 파트너와 함께 차세대 Roblox 크리에이터 생태계를 지원합니다.",
    tags: ["B2B", "Platform", "Collaboration"],
    status: "live",
  },
  {
    slug: "brand-campaigns",
    title: "Brand Campaigns in Roblox",
    category: "partnerships",
    description:
      "Designing Roblox-native brand experiences through games, creators, and community events.",
    descriptionKo:
      "게임, 크리에이터, 커뮤니티 이벤트를 연결한 Roblox 네이티브 브랜드 경험을 설계합니다.",
    tags: ["Brand", "Campaign", "Marketing"],
    status: "in-progress",
  },
  {
    slug: "creator-studio-network",
    title: "Creator Studio Network",
    category: "partnerships",
    description:
      "Supporting small creator teams with publishing, operations, and ecosystem access.",
    descriptionKo:
      "소규모 크리에이터 팀이 퍼블리싱, 운영, 생태계 연결을 통해 성장할 수 있도록 지원합니다.",
    tags: ["Studio", "Publishing", "Support"],
    status: "in-progress",
  },
];
