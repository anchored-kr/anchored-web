/**
 * Anchored OS — desktop content model.
 *
 * Each entry is an "app" on the Anchored desktop. Portfolio works (kind: "project")
 * render as case-study windows; system apps (about / services / contact) render the
 * agency pitch. Localized fields use LText (ko/en/ja); see src/data/i18n.ts.
 */

import type { LText } from "./i18n";

export type AppKind = "about" | "services" | "contact" | "project";
export type AppStatus = "live" | "in-progress" | "upcoming";

export interface MetaRow {
  label: string;
  value: string;
}

export interface DesktopApp {
  id: string;
  /** icon caption + window title (proper nouns — not translated) */
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
  /** short one-liner */
  tagline?: LText;
  /** summary paragraph */
  summary?: LText;
  /** the role Anchored played (service tags) */
  role?: LText[];
  /** what we actually built/did */
  bullets?: LText[];
  /** spec rows shown in the window sidebar (kept English/neutral) */
  meta?: MetaRow[];
  /** external links */
  links?: { label: LText; href: string }[];
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
    tagline: {
      ko: "기록으로 경쟁하는 라이브 타임어택 오비.",
      en: "A live time-attack obby, tuned by data.",
      ja: "記録で競うライブのタイムアタックオビー。",
    },
    summary: {
      ko: "기록 경쟁 중심의 타임어택 오비. 출시 후 리텐션·스테이지 난이도·이벤트를 데이터로 검증하며 라이브옵스로 운영하는 레퍼런스 프로젝트입니다.",
      en: "A record-chasing time-attack obby. Post-launch, we validate retention, stage difficulty, and events with data, running it as a LiveOps reference project.",
      ja: "記録争いを軸にしたタイムアタックオビー。ローンチ後はリテンション・難易度・イベントをデータで検証し、ライブオプスで運営するリファレンスプロジェクトです。",
    },
    role: [
      { ko: "게임 기획", en: "Game Design", ja: "ゲーム企画" },
      { ko: "Luau 개발", en: "Luau Dev", ja: "Luau 開発" },
      { ko: "LiveOps", en: "LiveOps", ja: "LiveOps" },
      { ko: "데이터 분석", en: "Data", ja: "データ分析" },
    ],
    bullets: [
      { ko: "타임어택 코어 루프와 스테이지 진행 시스템 설계·구현", en: "Designed and built the time-attack core loop and stage-progression system", ja: "タイムアタックのコアループとステージ進行システムを設計・実装" },
      { ko: "리텐션·이탈 지점을 추적하는 인게임 애널리틱스 파이프라인 구축", en: "Built an in-game analytics pipeline tracking retention and drop-off points", ja: "リテンションと離脱ポイントを追跡するゲーム内アナリティクスを構築" },
      { ko: "주간 이벤트·리더보드 시즌으로 돌아오는 이유를 만드는 LiveOps 운영", en: "Ran LiveOps — weekly events and leaderboard seasons that bring players back", ja: "週次イベントとリーダーボードのシーズンで再訪理由をつくる LiveOps 運営" },
      { ko: "난이도 곡선을 플레이 데이터 기반으로 반복 튜닝", en: "Iteratively tuned the difficulty curve from play data", ja: "プレイデータをもとに難易度カーブを反復調整" },
    ],
    meta: [
      { label: "Platform", value: "Roblox" },
      { label: "Genre", value: "Time-Attack Obby" },
      { label: "Status", value: "Live" },
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
    tagline: {
      ko: "인터넷 문화를 무기로 만든 전략 PvP.",
      en: "Internet culture, weaponized into a strategy PvP.",
      ja: "インターネット文化を武器にした戦略 PvP。",
    },
    summary: {
      ko: "밈과 인터넷 문화를 게임 IP로 끌어올린 무리 전투 전략 PvP. 진영 정체성과 대규모 스웜 배틀을 코어로 한 IP 인큐베이션 프로젝트입니다.",
      en: "A swarm-battle strategy PvP that elevates memes and internet culture into game IP. Faction identity and large-scale swarm battles sit at its core — an IP incubation project.",
      ja: "ミームとネット文化をゲーム IP に昇華させた群体戦略 PvP。陣営アイデンティティと大規模スウォームバトルをコアにした IP インキュベーションプロジェクトです。",
    },
    role: [
      { ko: "IP 개발", en: "IP Dev", ja: "IP 開発" },
      { ko: "게임 기획", en: "Game Design", ja: "ゲーム企画" },
      { ko: "Luau 개발", en: "Luau Dev", ja: "Luau 開発" },
      { ko: "아트 디렉션", en: "Art Direction", ja: "アートディレクション" },
    ],
    bullets: [
      { ko: "밈 네이티브 세계관을 플레이 가능한 진영·유닛 시스템으로 구조화", en: "Structured a meme-native world into playable faction and unit systems", ja: "ミームネイティブな世界観をプレイ可能な陣営・ユニットシステムに構造化" },
      { ko: "대규모 스웜 전투를 위한 퍼포먼스·네트워크 설계", en: "Engineered performance and networking for large-scale swarm combat", ja: "大規模スウォーム戦闘のためのパフォーマンス・ネットワーク設計" },
      { ko: "커뮤니티가 직접 확장하는 IP가 되도록 진영 정체성 디자인", en: "Designed faction identity so the community can extend the IP itself", ja: "コミュニティ自身が拡張できる IP となるよう陣営アイデンティティを設計" },
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
    tagline: {
      ko: "GOKUI / The Hell Doctor — 오리지널 세계관 협동 액션.",
      en: "GOKUI / The Hell Doctor — co-op action, original world.",
      ja: "GOKUI / The Hell Doctor — オリジナル世界観の協力アクション。",
    },
    summary: {
      ko: "오니 신화와 ‘몸속 침투’라는 오리지널 컨셉을 결합한 4인 협동 액션. 처음부터 IP로 설계된 세계관·캐릭터·전투 시스템을 함께 만들었습니다.",
      en: "A 4-player co-op action piece blending Oni mythology with an original 'infiltrate the body' concept. We built its world, characters, and combat as IP from the start.",
      ja: "鬼の神話と「体内への侵入」というオリジナルコンセプトを融合した4人協力アクション。最初から IP として設計した世界観・キャラクター・戦闘システムを共に作りました。",
    },
    role: [
      { ko: "IP·세계관 설계", en: "IP & World", ja: "IP・世界観設計" },
      { ko: "게임 기획", en: "Game Design", ja: "ゲーム企画" },
      { ko: "Luau 개발", en: "Luau Dev", ja: "Luau 開発" },
      { ko: "협동 전투 디자인", en: "Co-op Combat", ja: "協力戦闘デザイン" },
    ],
    bullets: [
      { ko: "오니 신화 기반 오리지널 세계관·캐릭터 설정 구축", en: "Built an original world and characters rooted in Oni mythology", ja: "鬼の神話を基にしたオリジナル世界観・キャラクター設定を構築" },
      { ko: "‘몸속 침투’ 컨셉을 협동 던전 구조로 번역", en: "Translated the 'infiltrate the body' concept into co-op dungeon structure", ja: "「体内侵入」のコンセプトを協力ダンジョン構造へ翻訳" },
      { ko: "4인 협동 액션의 역할 분담·보스 전투 시스템 설계", en: "Designed role distribution and boss-fight systems for 4-player co-op", ja: "4人協力アクションの役割分担・ボス戦システムを設計" },
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
    tagline: {
      ko: "무기와 지형으로 싸우는 크리에이터 주도 PvP.",
      en: "Creator-led PvP built on weapons & terrain.",
      ja: "武器と地形で戦うクリエイター主導の PvP。",
    },
    summary: {
      ko: "무기 탐색과 지형을 활용한 환경 전투 중심의 크리에이터 주도 PvP. 크리에이터의 색을 살리면서 출시 가능한 게임으로 다듬는 제작 파트너십 사례입니다.",
      en: "A creator-led PvP centered on weapon discovery and terrain-driven environmental combat. A production partnership that keeps the creator's voice while shaping it into a shippable game.",
      ja: "武器探索と地形を活かした環境戦闘を軸にした、クリエイター主導の PvP。クリエイターの個性を活かしつつローンチ可能なゲームに仕上げる制作パートナーシップの事例です。",
    },
    role: [
      { ko: "프로덕션 파트너", en: "Production", ja: "プロダクション" },
      { ko: "게임 기획", en: "Game Design", ja: "ゲーム企画" },
      { ko: "Luau 개발", en: "Luau Dev", ja: "Luau 開発" },
      { ko: "밸런싱", en: "Balancing", ja: "バランス調整" },
    ],
    bullets: [
      { ko: "무기·탐색·지형 전투를 묶는 코어 전투 루프 구조화", en: "Structured a core combat loop linking weapons, exploration, and terrain", ja: "武器・探索・地形戦闘をつなぐコア戦闘ループを構造化" },
      { ko: "크리에이터 비전을 출시 가능한 스코프로 정리", en: "Scoped the creator's vision down to something shippable", ja: "クリエイターのビジョンをローンチ可能なスコープへ整理" },
      { ko: "맵·무기 밸런스 시스템 구축", en: "Built the map and weapon balancing systems", ja: "マップ・武器のバランスシステムを構築" },
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
    tagline: {
      ko: "Roblox 안에서 플레이되는 브랜드 경험.",
      en: "Native brand experiences inside Roblox.",
      ja: "Roblox の中でプレイされるブランド体験。",
    },
    summary: {
      ko: "광고가 아니라 ‘플레이되는 브랜드’. 브랜드 IP와 캠페인을 Roblox 네이티브 경험으로 설계해, 게임·크리에이터·커뮤니티를 하나의 캠페인으로 연결합니다.",
      en: "Not an ad — a brand you play. We design brand IP and campaigns as Roblox-native experiences, connecting games, creators, and community into a single campaign.",
      ja: "広告ではなく「プレイされるブランド」。ブランド IP とキャンペーンを Roblox ネイティブな体験として設計し、ゲーム・クリエイター・コミュニティを一つのキャンペーンにつなげます。",
    },
    role: [
      { ko: "브랜드 전략", en: "Brand Strategy", ja: "ブランド戦略" },
      { ko: "게임화 기획", en: "Gamification", ja: "ゲーム化企画" },
      { ko: "제작", en: "Production", ja: "制作" },
      { ko: "캠페인 운영", en: "Campaign Ops", ja: "キャンペーン運営" },
    ],
    bullets: [
      { ko: "브랜드 IP를 Roblox에서 플레이 가능한 경험으로 변환", en: "Turned brand IP into playable experiences on Roblox", ja: "ブランド IP を Roblox 上でプレイ可能な体験に変換" },
      { ko: "게임 내 이벤트 + 크리에이터 + 커뮤니티를 묶는 캠페인 설계", en: "Designed campaigns that tie in-game events, creators, and community together", ja: "ゲーム内イベント＋クリエイター＋コミュニティを束ねるキャンペーンを設計" },
      { ko: "체류·참여 지표 기반 성과 리포팅", en: "Reported results based on dwell-time and engagement metrics", ja: "滞在・参加指標に基づく成果レポーティング" },
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
    tagline: {
      ko: "플랫폼·게임사와 함께 일합니다.",
      en: "Working with platforms & game companies.",
      ja: "プラットフォーム・ゲーム会社と共に。",
    },
    summary: {
      ko: "게임사·플랫폼·퍼블리셔와 협업해 차세대 UGC 크리에이터 생태계를 함께 키웁니다. IP를 Roblox로 확장하려는 파트너의 진입 파트너 역할을 합니다.",
      en: "We work with game companies, platforms, and publishers to grow the next-gen UGC creator ecosystem — the entry partner for anyone extending IP onto Roblox.",
      ja: "ゲーム会社・プラットフォーム・パブリッシャーと協業し、次世代の UGC クリエイターエコシステムを共に育てます。IP を Roblox に展開するパートナーの入口となります。",
    },
    role: [
      { ko: "B2B 파트너십", en: "B2B Partnership", ja: "B2B パートナーシップ" },
      { ko: "생태계 자문", en: "Ecosystem Advisory", ja: "エコシステム支援" },
      { ko: "공동 프로젝트", en: "Co-projects", ja: "共同プロジェクト" },
    ],
    bullets: [
      { ko: "IP·플랫폼의 Roblox 진입 전략 자문", en: "Advised IP and platforms on their Roblox entry strategy", ja: "IP・プラットフォームの Roblox 参入戦略を助言" },
      { ko: "크리에이터 풀과 파트너 프로젝트 매칭", en: "Matched our creator pool to partner projects", ja: "クリエイタープールとパートナープロジェクトをマッチング" },
      { ko: "공동 제작·런칭 운영", en: "Ran co-production and launches", ja: "共同制作・ローンチを運営" },
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
    tagline: {
      ko: "한국 UGC 크리에이터의 언더그라운드.",
      en: "Korea's UGC creator underground.",
      ja: "韓国 UGC クリエイターのアンダーグラウンド。",
    },
    summary: {
      ko: "한국 UGC 게임 크리에이터들이 모이고, 배우고, 협업하는 Discord 커뮤니티. 우리가 함께 일할 크리에이터와 팀을 발굴하는 인재 파이프라인입니다.",
      en: "A Discord community where Korean UGC game creators meet, learn, and collaborate — our talent pipeline for finding the creators and teams we build with.",
      ja: "韓国の UGC ゲームクリエイターが集まり、学び、協働する Discord コミュニティ。共に働くクリエイターとチームを見出す人材パイプラインです。",
    },
    role: [
      { ko: "커뮤니티 운영", en: "Community", ja: "コミュニティ運営" },
      { ko: "크리에이터 발굴", en: "Talent Scouting", ja: "クリエイター発掘" },
      { ko: "게이미피케이션", en: "Gamification", ja: "ゲーミフィケーション" },
    ],
    bullets: [
      { ko: "한국 Roblox 크리에이터가 모이는 커뮤니티 허브 운영", en: "Run a community hub where Korean Roblox creators gather", ja: "韓国の Roblox クリエイターが集まるコミュニティハブを運営" },
      { ko: "활동·작업물 기반으로 가능성 있는 크리에이터 발굴", en: "Scout promising creators based on activity and work", ja: "活動・作品をもとに有望なクリエイターを発掘" },
      { ko: "조개 경제 등 참여를 유도하는 게이미피케이션 설계", en: "Designed gamification (e.g. a shell economy) that drives participation", ja: "貝経済など参加を促すゲーミフィケーションを設計" },
    ],
    meta: [
      { label: "Type", value: "Community" },
      { label: "Platform", value: "Discord" },
      { label: "Status", value: "Live" },
    ],
    links: [{ label: { ko: "길드 참여", en: "Join the Guild", ja: "ギルドに参加" }, href: "https://discord.gg/anchored" }],
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
    tagline: {
      ko: "가능성을 출시 실력으로 바꾸는 곳.",
      en: "Turning potential into shipping skill.",
      ja: "可能性をローンチできる実力に変える場所。",
    },
    summary: {
      ko: "신진 Roblox 개발자를 발굴하고 성장시키는 인큐베이션 프로그램. 재능을 ‘게임을 끝까지 출시하는 실력’으로 바꾸는 데뷔 준비 과정입니다.",
      en: "An incubation program that discovers and grows emerging Roblox developers — turning talent into the skill to actually ship a game, a runway to debut.",
      ja: "新進の Roblox 開発者を発掘し育てるインキュベーションプログラム。才能を「ゲームを最後までローンチする実力」に変えるデビュー準備の過程です。",
    },
    role: [
      { ko: "커리큘럼 설계", en: "Curriculum", ja: "カリキュラム設計" },
      { ko: "멘토링", en: "Mentoring", ja: "メンタリング" },
      { ko: "인큐베이션", en: "Incubation", ja: "インキュベーション" },
    ],
    bullets: [
      { ko: "기획·개발·협업 기본기를 다지는 커리큘럼 운영", en: "Run a curriculum covering design, development, and collaboration fundamentals", ja: "企画・開発・協働の基礎を固めるカリキュラムを運営" },
      { ko: "팀 단위 게임 제작 인큐베이션", en: "Team-based game-production incubation", ja: "チーム単位のゲーム制作インキュベーション" },
      { ko: "Anchored Fleet 데뷔로 이어지는 파이프라인", en: "A pipeline that leads into an Anchored Fleet debut", ja: "Anchored Fleet デビューへつながるパイプライン" },
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
    tagline: {
      ko: "크리에이터 성장을 객관적으로 측정.",
      en: "Measuring creator growth, objectively.",
      ja: "クリエイターの成長を客観的に測定。",
    },
    summary: {
      ko: "CODE·BUILD·SYSTEM·TEAM·PLATFORM 다섯 축으로 크리에이터의 성장을 측정하는 평가 프레임워크. 누구와 어떻게 일할지를 데이터로 판단하는 기준입니다.",
      en: "A framework that measures creator growth across five axes — CODE, BUILD, SYSTEM, TEAM, PLATFORM — our data-driven basis for who to work with and how.",
      ja: "CODE・BUILD・SYSTEM・TEAM・PLATFORM の5軸でクリエイターの成長を測る評価フレームワーク。誰とどう働くかをデータで判断する基準です。",
    },
    role: [
      { ko: "프레임워크 설계", en: "Framework", ja: "フレームワーク設計" },
      { ko: "평가 운영", en: "Assessment", ja: "評価運用" },
    ],
    bullets: [
      { ko: "5개 역량 축으로 크리에이터 성장 단계 정의", en: "Defined creator growth stages across five capability axes", ja: "5つの能力軸でクリエイターの成長段階を定義" },
      { ko: "발굴·매칭·인큐베이션 의사결정의 공통 기준 제공", en: "Provided a shared basis for scouting, matching, and incubation decisions", ja: "発掘・マッチング・インキュベーションの意思決定の共通基準を提供" },
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
    tagline: {
      ko: "커뮤니티를 돌게 하는 화폐 루프.",
      en: "A community currency loop.",
      ja: "コミュニティを回す通貨ループ。",
    },
    summary: {
      ko: "일일 미션·퀴즈·이벤트 참여로 돌아가는 조개 화폐 경제. 커뮤니티 활동을 게임처럼 설계해 매일 돌아오게 만드는 참여 시스템입니다.",
      en: "A shell-currency economy driven by daily missions, quizzes, and events — community activity designed like a game so people come back every day.",
      ja: "毎日のミッション・クイズ・イベント参加で回る貝通貨経済。コミュニティ活動をゲームのように設計し、毎日戻ってくる参加システムです。",
    },
    role: [
      { ko: "시스템 기획", en: "System Design", ja: "システム企画" },
      { ko: "게이미피케이션", en: "Gamification", ja: "ゲーミフィケーション" },
      { ko: "봇 개발", en: "Bot Dev", ja: "ボット開発" },
    ],
    bullets: [
      { ko: "조개 화폐 기반 참여·보상 루프 설계", en: "Designed a participation-and-reward loop on a shell currency", ja: "貝通貨を基盤にした参加・報酬ループを設計" },
      { ko: "Discord 봇으로 미션·퀴즈·이벤트 자동화", en: "Automated missions, quizzes, and events with a Discord bot", ja: "Discord ボットでミッション・クイズ・イベントを自動化" },
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

export const services: { icon: string; title: string; en: string; desc: LText }[] = [
  {
    icon: "🎮",
    title: "IP → Roblox Game",
    en: "Adaptation",
    desc: {
      ko: "보유한 IP·콘텐츠·브랜드를 Roblox에서 플레이되는 게임으로 번역합니다. 기획부터 출시까지 풀 프로덕션.",
      en: "We translate your IP, content, or brand into a game people play on Roblox — full production from concept to launch.",
      ja: "保有する IP・コンテンツ・ブランドを Roblox でプレイされるゲームに翻訳します。企画からローンチまでフルプロダクション。",
    },
  },
  {
    icon: "✨",
    title: "Original Game IP",
    en: "Incubation",
    desc: {
      ko: "크리에이터·팀과 함께 처음부터 오리지널 게임 IP를 만들고 데뷔시킵니다.",
      en: "We build and debut original game IP from scratch, together with creators and teams.",
      ja: "クリエイター・チームと共に、ゼロからオリジナルのゲーム IP を作りデビューさせます。",
    },
  },
  {
    icon: "📈",
    title: "LiveOps & Growth",
    en: "Operation",
    desc: {
      ko: "출시가 끝이 아닙니다. 데이터 기반 라이브옵스로 리텐션과 성장을 운영합니다.",
      en: "Launch isn't the end. We run retention and growth with data-driven LiveOps.",
      ja: "ローンチは終わりではありません。データ駆動のライブオプスでリテンションと成長を運営します。",
    },
  },
  {
    icon: "🎯",
    title: "Brand Experiences",
    en: "Campaign",
    desc: {
      ko: "브랜드 캠페인을 Roblox 네이티브 경험으로. 게임·크리에이터·커뮤니티를 하나로 묶습니다.",
      en: "Brand campaigns as Roblox-native experiences, tying games, creators, and community together.",
      ja: "ブランドキャンペーンを Roblox ネイティブな体験に。ゲーム・クリエイター・コミュニティを一つに束ねます。",
    },
  },
];

export const socials = [
  { label: "Email", value: "contact@anchored.kr", href: "mailto:contact@anchored.kr" },
  { label: "Discord", value: "discord.gg/anchored", href: "https://discord.gg/anchored" },
  { label: "GitHub", value: "github.com/anchored-kr", href: "https://github.com/anchored-kr" },
  { label: "X", value: "@anchored_kr", href: "https://x.com/anchored_kr" },
];
