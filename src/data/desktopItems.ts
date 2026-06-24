/**
 * Anchored OS — desktop content model.
 *
 * Each entry is an "app" on the Anchored desktop. Portfolio works (kind: "project")
 * render as case-study windows; system apps (about / services / contact) render the
 * agency pitch. Project copy is reused & extended from src/data/projects.ts.
 */

export type AppKind = "about" | "services" | "contact" | "project";
export type AppStatus = "live" | "in-progress" | "upcoming";

export interface MetaRow {
  label: string;
  value: string;
}

export interface DesktopApp {
  id: string;
  /** icon caption + window title */
  title: string;
  /** emoji glyph used for the desktop icon + window title bar */
  icon: string;
  kind: AppKind;
  /** accent color for the window title bar / badges */
  accent: string;
  /** ordering on the desktop */
  group: "system" | "games" | "ecosystem" | "partners";

  // ── project-only fields ──
  status?: AppStatus;
  /** short English one-liner */
  tagline?: string;
  /** Korean summary paragraph */
  summary?: string;
  /** the role Anchored played (service tags) */
  role?: string[];
  /** what we actually built/did */
  bullets?: string[];
  /** spec rows shown in the window sidebar */
  meta?: MetaRow[];
  /** external links */
  links?: { label: string; href: string }[];
  /** link to the long-form case study page */
  slug?: string;
}

export const statusLabel: Record<AppStatus, string> = {
  live: "LIVE",
  "in-progress": "IN DEV",
  upcoming: "SOON",
};

export const statusColor: Record<AppStatus, string> = {
  live: "#1f9e5a",
  "in-progress": "#e08a18",
  upcoming: "#6b7280",
};

/* ────────────────────────────── System apps ────────────────────────────── */

export const aboutApp: DesktopApp = {
  id: "about",
  title: "Anchored.txt",
  icon: "⚓",
  kind: "about",
  accent: "#0072CE",
  group: "system",
};

export const servicesApp: DesktopApp = {
  id: "services",
  title: "Services",
  icon: "🛠️",
  kind: "services",
  accent: "#0072CE",
  group: "system",
};

export const contactApp: DesktopApp = {
  id: "contact",
  title: "Contact",
  icon: "✉️",
  kind: "contact",
  accent: "#0072CE",
  group: "system",
};

/* ────────────────────────────── Portfolio ──────────────────────────────── */

export const projectApps: DesktopApp[] = [
  {
    id: "speed-obby",
    title: "Speed Obby",
    icon: "🏁",
    kind: "project",
    accent: "#0072CE",
    group: "games",
    status: "live",
    slug: "speed-obby",
    tagline: "A live time-attack obby, tuned by data.",
    summary:
      "기록 경쟁 중심의 타임어택 오비. 출시 후 리텐션·스테이지 난이도·이벤트를 데이터로 검증하며 라이브옵스로 운영하는 레퍼런스 프로젝트입니다.",
    role: ["게임 기획", "Luau 개발", "LiveOps", "데이터 분석"],
    bullets: [
      "타임어택 코어 루프와 스테이지 진행 시스템 설계·구현",
      "리텐션·이탈 지점을 추적하는 인게임 애널리틱스 파이프라인 구축",
      "주간 이벤트·리더보드 시즌으로 돌아오는 이유를 만드는 LiveOps 운영",
      "난이도 곡선을 플레이 데이터 기반으로 반복 튜닝",
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Time-Attack Obby" },
      { label: "Status", value: "Live · 운영 중" },
      { label: "Role", value: "Full build + LiveOps" },
    ],
  },
  {
    id: "swarmrot",
    title: "Swarmrot",
    icon: "🪱",
    kind: "project",
    accent: "#6d4ad0",
    group: "games",
    status: "in-progress",
    slug: "swarmrot",
    tagline: "Internet culture, weaponized into a strategy PvP.",
    summary:
      "밈과 인터넷 문화를 게임 IP로 끌어올린 무리 전투 전략 PvP. 진영 정체성과 대규모 스웜 배틀을 코어로 한 IP 인큐베이션 프로젝트입니다.",
    role: ["IP 개발", "게임 기획", "Luau 개발", "아트 디렉션"],
    bullets: [
      "밈 네이티브 세계관을 플레이 가능한 진영·유닛 시스템으로 구조화",
      "대규모 스웜 전투를 위한 퍼포먼스·네트워크 설계",
      "커뮤니티가 직접 확장하는 IP가 되도록 진영 정체성 디자인",
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Strategy PvP" },
      { label: "Status", value: "In Development" },
      { label: "Role", value: "Original IP build" },
    ],
  },
  {
    id: "gokui",
    title: "GOKUI",
    icon: "👹",
    kind: "project",
    accent: "#b3322f",
    group: "games",
    status: "in-progress",
    slug: "gokui",
    tagline: "GOKUI / The Hell Doctor — co-op action, original world.",
    summary:
      "오니 신화와 ‘몸속 침투’라는 오리지널 컨셉을 결합한 4인 협동 액션. 처음부터 IP로 설계된 세계관·캐릭터·전투 시스템을 함께 만들었습니다.",
    role: ["IP·세계관 설계", "게임 기획", "Luau 개발", "협동 전투 디자인"],
    bullets: [
      "오니 신화 기반 오리지널 세계관·캐릭터 설정 구축",
      "‘몸속 침투’ 컨셉을 협동 던전 구조로 번역",
      "4인 협동 액션의 역할 분담·보스 전투 시스템 설계",
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Co-op Action" },
      { label: "Status", value: "In Development" },
      { label: "Role", value: "IP + game build" },
    ],
  },
  {
    id: "telum",
    title: "Telum",
    icon: "⚔️",
    kind: "project",
    accent: "#2f7d6b",
    group: "games",
    status: "in-progress",
    slug: "telum",
    tagline: "Creator-led PvP built on weapons & terrain.",
    summary:
      "무기 탐색과 지형을 활용한 환경 전투 중심의 크리에이터 주도 PvP. 크리에이터의 색을 살리면서 출시 가능한 게임으로 다듬는 제작 파트너십 사례입니다.",
    role: ["프로덕션 파트너", "게임 기획", "Luau 개발", "밸런싱"],
    bullets: [
      "무기·탐색·지형 전투를 묶는 코어 전투 루프 구조화",
      "크리에이터 비전을 출시 가능한 스코프로 정리",
      "맵·무기 밸런스 시스템 구축",
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "PvP Combat" },
      { label: "Status", value: "In Development" },
      { label: "Role", value: "Production partner" },
    ],
  },
  {
    id: "brand-campaigns",
    title: "Brand in Roblox",
    icon: "🎯",
    kind: "project",
    accent: "#d98324",
    group: "partners",
    status: "in-progress",
    slug: "brand-campaigns",
    tagline: "Native brand experiences inside Roblox.",
    summary:
      "광고가 아니라 ‘플레이되는 브랜드’. 브랜드 IP와 캠페인을 Roblox 네이티브 경험으로 설계해, 게임·크리에이터·커뮤니티를 하나의 캠페인으로 연결합니다.",
    role: ["브랜드 전략", "게임화 기획", "제작", "캠페인 운영"],
    bullets: [
      "브랜드 IP를 Roblox에서 플레이 가능한 경험으로 변환",
      "게임 내 이벤트 + 크리에이터 + 커뮤니티를 묶는 캠페인 설계",
      "체류·참여 지표 기반 성과 리포팅",
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Type", value: "Brand Experience" },
      { label: "For", value: "Brands & Agencies" },
      { label: "Role", value: "IP → playable" },
    ],
  },
  {
    id: "platform-partnerships",
    title: "Partnerships",
    icon: "🤝",
    kind: "project",
    accent: "#0072CE",
    group: "partners",
    status: "live",
    slug: "platform-partnerships",
    tagline: "Working with platforms & game companies.",
    summary:
      "게임사·플랫폼·퍼블리셔와 협업해 차세대 UGC 크리에이터 생태계를 함께 키웁니다. IP를 Roblox로 확장하려는 파트너의 진입 파트너 역할을 합니다.",
    role: ["B2B 파트너십", "생태계 자문", "공동 프로젝트"],
    bullets: [
      "IP·플랫폼의 Roblox 진입 전략 자문",
      "크리에이터 풀과 파트너 프로젝트 매칭",
      "공동 제작·런칭 운영",
    ],
    meta: [
      { label: "Type", value: "B2B Partnership" },
      { label: "For", value: "Platforms & Studios" },
      { label: "Status", value: "Ongoing" },
    ],
  },
  {
    id: "anchored-guild",
    title: "Anchored Guild",
    icon: "🛟",
    kind: "project",
    accent: "#0072CE",
    group: "ecosystem",
    status: "live",
    slug: "anchored-guild",
    tagline: "Korea's UGC creator underground.",
    summary:
      "한국 UGC 게임 크리에이터들이 모이고, 배우고, 협업하는 Discord 커뮤니티. 우리가 함께 일할 크리에이터와 팀을 발굴하는 인재 파이프라인입니다.",
    role: ["커뮤니티 운영", "크리에이터 발굴", "게이미피케이션"],
    bullets: [
      "한국 Roblox 크리에이터가 모이는 커뮤니티 허브 운영",
      "활동·작업물 기반으로 가능성 있는 크리에이터 발굴",
      "조개 경제 등 참여를 유도하는 게이미피케이션 설계",
    ],
    meta: [
      { label: "Type", value: "Community" },
      { label: "Platform", value: "Discord" },
      { label: "Status", value: "Live" },
    ],
    links: [{ label: "Join the Guild", href: "https://discord.gg/anchored" }],
  },
  {
    id: "anchored-school",
    title: "Anchored School",
    icon: "🎓",
    kind: "project",
    accent: "#0072CE",
    group: "ecosystem",
    status: "upcoming",
    slug: "winter-roblox-camp-2026",
    tagline: "Turning potential into shipping skill.",
    summary:
      "신진 Roblox 개발자를 발굴하고 성장시키는 인큐베이션 프로그램. 재능을 ‘게임을 끝까지 출시하는 실력’으로 바꾸는 데뷔 준비 과정입니다.",
    role: ["커리큘럼 설계", "멘토링", "인큐베이션"],
    bullets: [
      "기획·개발·협업 기본기를 다지는 커리큘럼 운영",
      "팀 단위 게임 제작 인큐베이션",
      "Anchored Fleet 데뷔로 이어지는 파이프라인",
    ],
    meta: [
      { label: "Type", value: "Incubation" },
      { label: "Status", value: "Winter 2026" },
    ],
  },
  {
    id: "creator-growth-index",
    title: "Growth Index",
    icon: "📊",
    kind: "project",
    accent: "#0072CE",
    group: "ecosystem",
    status: "live",
    slug: "creator-growth-index",
    tagline: "Measuring creator growth, objectively.",
    summary:
      "CODE·BUILD·SYSTEM·TEAM·PLATFORM 다섯 축으로 크리에이터의 성장을 측정하는 평가 프레임워크. 누구와 어떻게 일할지를 데이터로 판단하는 기준입니다.",
    role: ["프레임워크 설계", "평가 운영"],
    bullets: [
      "5개 역량 축으로 크리에이터 성장 단계 정의",
      "발굴·매칭·인큐베이션 의사결정의 공통 기준 제공",
    ],
    meta: [
      { label: "Type", value: "Framework" },
      { label: "Status", value: "In use" },
    ],
  },
  {
    id: "shell-economy",
    title: "Shell Economy",
    icon: "🐚",
    kind: "project",
    accent: "#0072CE",
    group: "ecosystem",
    status: "live",
    slug: "shell-economy",
    tagline: "A community currency loop.",
    summary:
      "일일 미션·퀴즈·이벤트 참여로 돌아가는 조개 화폐 경제. 커뮤니티 활동을 게임처럼 설계해 매일 돌아오게 만드는 참여 시스템입니다.",
    role: ["시스템 기획", "게이미피케이션", "봇 개발"],
    bullets: [
      "조개 화폐 기반 참여·보상 루프 설계",
      "Discord 봇으로 미션·퀴즈·이벤트 자동화",
    ],
    meta: [
      { label: "Type", value: "Gamification" },
      { label: "Status", value: "Live" },
    ],
  },
];

export const apps: DesktopApp[] = [aboutApp, servicesApp, contactApp, ...projectApps];

export const appById = (id: string) => apps.find((a) => a.id === id);

/* ── Services (rendered inside the Services window) ── */

export const services = [
  {
    icon: "🎮",
    title: "IP → Roblox Game",
    en: "Adaptation",
    desc: "보유한 IP·콘텐츠·브랜드를 Roblox에서 플레이되는 게임으로 번역합니다. 기획부터 출시까지 풀 프로덕션.",
  },
  {
    icon: "✨",
    title: "Original Game IP",
    en: "Incubation",
    desc: "크리에이터·팀과 함께 처음부터 오리지널 게임 IP를 만들고 데뷔시킵니다.",
  },
  {
    icon: "📈",
    title: "LiveOps & Growth",
    en: "Operation",
    desc: "출시가 끝이 아닙니다. 데이터 기반 라이브옵스로 리텐션과 성장을 운영합니다.",
  },
  {
    icon: "🎯",
    title: "Brand Experiences",
    en: "Campaign",
    desc: "브랜드 캠페인을 Roblox 네이티브 경험으로. 게임·크리에이터·커뮤니티를 하나로 묶습니다.",
  },
];

export const socials = [
  { label: "Email", value: "contact@anchored.kr", href: "mailto:contact@anchored.kr" },
  { label: "Discord", value: "discord.gg/anchored", href: "https://discord.gg/anchored" },
  { label: "GitHub", value: "github.com/anchored-kr", href: "https://github.com/anchored-kr" },
  { label: "X", value: "@anchored_kr", href: "https://x.com/anchored_kr" },
];
