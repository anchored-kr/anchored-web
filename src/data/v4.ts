/**
 * v4 — Porto Rocha grammar: a fixed sidebar (wordmark, live Seoul clock, About card,
 * stacked production cards) + a main column (hero media, studio-updates feed).
 * Production detail copy is reused from desktopItems (ko/en/ja); positioning copy from v2.
 */
import type { LText } from "./i18n";
import { appById, type DesktopApp } from "./desktopItems";
import { fleet, model, sprint } from "./v2";

/* ── Roblox captures (Anchored Guild group games; rbxcdn 180-day URLs — self-host later) ── */
export const captures = {
  teamwork: { src: "https://tr.rbxcdn.com/180DAY-586d3a8e3fe2ae8314ede2cfa73c6986/768/432/GameMediaItem9/Png/noFilter", caption: "Anchored Guild — Teamwork Obby" },
  evergreen: { src: "https://tr.rbxcdn.com/180DAY-6d91958704dad0fc2010ac76190188f9/768/432/Image/Png/noFilter", caption: "Anchored Guild — Evergreen Village" },
  hall: { src: "https://tr.rbxcdn.com/180DAY-7874a1badf5c5dc341819a4edcccc66d/768/432/Image/Png/noFilter", caption: "Anchored Guild — Hall" },
  hall2: { src: "https://tr.rbxcdn.com/180DAY-3b9aa6456bcb41fde87d433b96ec9c3e/768/432/Image/Png/noFilter", caption: "Anchored Guild — Hall" },
};
export const heroSlides = [captures.teamwork, captures.evergreen, captures.hall, captures.hall2];

/* ── UI strings ── */
export const ui4 = {
  showAll: { ko: "모든 프로젝트 보기", en: "Show all projects", ja: "すべてのプロジェクト" },
  about: { ko: "앵커드 소개", en: "About us", ja: "Anchored について" },
  aboutText: {
    ko: "앵커드는 로블록스 네이티브 크리에이터와 함께 게임을 만들고 운영하는 프로덕션 컴퍼니입니다. 서울.",
    en: "Anchored is a Roblox-native production company that builds and runs games with creators native to Roblox. Seoul.",
    ja: "Anchored は、Roblox ネイティブなクリエイターとゲームをつくり、運営するプロダクションカンパニーです。ソウル。",
  },
  updates: { ko: "스튜디오 소식", en: "Studio updates", ja: "スタジオニュース" },
  showLess: { ko: "접기", en: "Show less", ja: "閉じる" },
  city: { ko: "서울", en: "Seoul", ja: "ソウル" },
  search: { ko: "무엇을 볼까요…", en: "I want to see…", ja: "何を見ますか…" },
  close: { ko: "닫기", en: "Close", ja: "閉じる" },
  noResult: { ko: "찾는 프로젝트가 없습니다.", en: "No projects match.", ja: "該当するプロジェクトがありません。" },
  light: { ko: "라이트 모드", en: "Light mode", ja: "ライトモード" },
  overview: { ko: "개요", en: "Overview", ja: "概要" },
  role: { ko: "앵커드의 역할", en: "Anchored's role", ja: "Anchored の役割" },
  details: { ko: "정보", en: "Details", ja: "詳細" },
  next: { ko: "다음 프로젝트", en: "Next project", ja: "次のプロジェクト" },
  start: { ko: "프로젝트 시작하기", en: "Start a project", ja: "プロジェクトを始める" },
  captureNote: { ko: "게임 캡처 준비 중", en: "Captures coming soon", ja: "キャプチャ準備中" },
  /** small credit in the site footer; {PR} becomes the link */
  credit: { ko: "이 사이트는 {PR}에서 영감을 받아 만들었습니다", en: "This site was inspired by {PR}", ja: "このサイトは {PR} に着想を得て制作しました" },
};

export const statusText = {
  live: { ko: "운영 중", en: "Live", ja: "運営中" },
  "in-progress": { ko: "제작 중", en: "In production", ja: "制作中" },
  upcoming: { ko: "준비 중", en: "Upcoming", ja: "準備中" },
} as const;

/* ── Productions (sidebar stack, /all, /projects/[slug]) ── */
export type Glyph = "flag" | "horns" | "swarm" | "spear" | "spark" | "rings" | "anchor" | "stage" | "people" | "book" | "radar" | "shell";

export interface Production {
  slug: string;
  name: string;
  glyph: Glyph;
  bg: string;
  fg: string;
  media?: { src: string; caption: string }[];
  app: DesktopApp;
}

const app = (id: string) => {
  const a = appById(id);
  if (!a) throw new Error(`missing desktop app ${id}`);
  return a;
};

export const productions: Production[] = [
  { slug: "speed-obby", name: "Speed Obby", glyph: "flag", bg: "#FFD43B", fg: "#111111", app: app("speed-obby") },
  { slug: "gokui", name: "GOKUI", glyph: "horns", bg: "#E5383B", fg: "#111111", app: app("gokui") },
  { slug: "swarmrot", name: "Swarmrot", glyph: "swarm", bg: "#A3E635", fg: "#111111", app: app("swarmrot") },
  { slug: "telum", name: "Telum", glyph: "spear", bg: "#2B2D42", fg: "#EDF2F4", app: app("telum") },
  { slug: "brand-campaigns", name: "Brand in Roblox", glyph: "spark", bg: "#FF6FB5", fg: "#111111", app: app("brand-campaigns") },
  { slug: "anchored-guild", name: "Anchored Guild", glyph: "anchor", bg: "#0072CE", fg: "#FFFFFF", media: [captures.hall, captures.hall2, captures.evergreen, captures.teamwork], app: app("anchored-guild") },
  { slug: "anchored-demo-day", name: "Demo Day", glyph: "stage", bg: "#7048E8", fg: "#FFFFFF", media: [captures.hall2], app: app("anchored-demo-day") },
  { slug: "korea-roblox-developer-meetup-2026", name: "Dev Meetup", glyph: "people", bg: "#FF922B", fg: "#111111", app: app("dev-meetup") },
  { slug: "winter-roblox-camp-2026", name: "Anchored School", glyph: "book", bg: "#22B8CF", fg: "#111111", app: app("anchored-school") },
  { slug: "creator-growth-index", name: "Growth Index", glyph: "radar", bg: "#141414", fg: "#A3E635", app: app("creator-growth-index") },
  { slug: "shell-economy", name: "Shell Economy", glyph: "shell", bg: "#F4E3C1", fg: "#8B5E34", app: app("shell-economy") },
  { slug: "platform-partnerships", name: "Partnerships", glyph: "rings", bg: "#E2E6E3", fg: "#111111", app: app("platform-partnerships") },
];
export const productionBySlug = (slug: string) => productions.find((p) => p.slug === slug);

/* ── Home feed (Studio updates) ── */
export type FeedMedia =
  | { kind: "image"; src: string; caption: string }
  | { kind: "icons"; slugs: string[] }
  | { kind: "poster"; slug: string }
  | { kind: "brand" }
  | { kind: "steps" }
  | { kind: "words" }
  | { kind: "cta" };

export interface FeedItem {
  label: LText | string;
  title: LText;
  body?: LText;
  media?: FeedMedia;
  href: string;
}

export const feed: FeedItem[] = [
  {
    label: "2026.10",
    title: { ko: "앵커드 홈페이지를 새로 열었습니다", en: "Anchored has a new home", ja: "Anchored のウェブサイトを刷新しました" },
    body: { ko: "로블록스 네이티브 프로덕션 컴퍼니로서의 앵커드를 소개합니다. 작품, 크리에이터, 일하는 방식을 한곳에 모았습니다.", en: "Introducing Anchored as a Roblox-native production company — our productions, our creators and how we work, in one place.", ja: "Roblox ネイティブなプロダクションカンパニーとしての Anchored を紹介します。作品、クリエイター、働き方をひとつにまとめました。" },
    media: { kind: "brand" },
    href: "/about",
  },
  {
    label: { ko: "제작 중", en: "In production", ja: "制作中" },
    title: { ko: "플릿 세 팀이 신작을 만들고 있습니다", en: "Three Fleet teams are in production", ja: "Fleet の3チームが新作を制作中です" },
    body: { ko: "GOKUI · Swarmrot · Telum. 앵커드 길드에서 선발한 팀들이 앵커드 프로듀서와 함께 제작하고 있습니다.", en: "GOKUI · Swarmrot · Telum — teams selected from the Anchored Guild, producing with an Anchored producer.", ja: "GOKUI · Swarmrot · Telum。Anchored Guild から選抜されたチームが、Anchored のプロデューサーと共に制作しています。" },
    media: { kind: "icons", slugs: ["gokui", "swarmrot", "telum"] },
    href: "/all",
  },
  {
    label: { ko: "운영 중", en: "Live", ja: "運営中" },
    title: { ko: "Speed Obby, 출시 후 운영 중", en: "Speed Obby is live", ja: "Speed Obby、リリース後も運営中" },
    body: { ko: "기록으로 경쟁하는 타임어택 오비. 리텐션과 스테이지 난이도를 데이터로 검증하며 라이브옵스로 운영합니다.", en: "A record-chasing time-attack obby, run as LiveOps — retention and stage difficulty validated with play data.", ja: "記録で競うタイムアタックオビー。リテンションと難易度をデータで検証しながらライブオプスで運営しています。" },
    media: { kind: "poster", slug: "speed-obby" },
    href: "/projects/speed-obby",
  },
  {
    label: { ko: "매월", en: "Monthly", ja: "毎月" },
    title: { ko: "앵커드 길드 데모데이", en: "Anchored Guild Demo Day", ja: "Anchored Guild Demo Day" },
    body: { ko: "매달 크리에이터들이 지금 만들고 있는 것을 발표하고 피드백을 받습니다. 플릿은 이 무대에서 시작됩니다.", en: "Every month, creators present what they're building and get feedback. The Fleet starts on this stage.", ja: "毎月、クリエイターがいまつくっているものを発表し、フィードバックを受けます。Fleet はこの舞台から始まります。" },
    media: { kind: "image", ...captures.hall2 },
    href: "/projects/anchored-demo-day",
  },
  {
    label: { ko: "메시지", en: "Message", ja: "メッセージ" },
    title: { ko: "로블록스 안에서 자란 팀과 만듭니다", en: "We build with creators native to Roblox", ja: "Roblox の中で育ったチームとつくります" },
    body: { ko: "좋은 로블록스 게임은 납품으로 끝나지 않습니다. 플레이어를 이해하고, 빠르게 배우고, 계속 변하는 과정까지가 제품입니다. 앵커드는 그 환경 안에서 자란 크리에이터를 찾고, 팀을 조립하고, 끝까지 프로듀싱합니다.", en: "A good Roblox game doesn't end at delivery — understanding players, learning fast and changing constantly is the product. Anchored finds the creators who grew up in that environment, assembles the team, and produces all the way through.", ja: "良い Roblox ゲームは納品で終わりません。プレイヤーを理解し、速く学び、変わり続けるプロセスまでが製品です。Anchored はその環境で育ったクリエイターを見つけ、チームを編成し、最後までプロデュースします。" },
    media: { kind: "words" },
    href: "/about",
  },
  {
    label: "Anchored Guild",
    title: { ko: "723명의 크리에이터가 모인 곳", en: "723 creators, one community", ja: "723人のクリエイターが集まる場所" },
    body: { ko: "한국 로블록스 크리에이터 커뮤니티. 사람들이 실제로 만드는 것을 보고, 시간을 두고 활동을 관찰합니다. 우리가 함께 일하는 모든 팀은 이 안에서 나옵니다.", en: "Korea's Roblox creator community. We watch what people actually build and observe their work over time — every team we work with comes from inside it.", ja: "韓国の Roblox クリエイターコミュニティ。実際につくるものを見て、時間をかけて活動を観察します。私たちが共に働くチームはすべてこの中から生まれます。" },
    media: { kind: "image", ...captures.hall },
    href: "/projects/anchored-guild",
  },
  {
    label: { ko: "제작 방식", en: "How we produce", ja: "制作の進め方" },
    title: { ko: "발굴에서 운영까지, 다섯 단계", en: "Five steps, from finding to operating", ja: "発掘から運営まで、5つのステップ" },
    body: model.continuity,
    media: { kind: "steps" },
    href: "/about#how",
  },
  {
    label: "Production Sprint",
    title: sprint.headline,
    body: { ko: "팀, 컨셉, 제작 계획을 제안합니다. 본 제작으로 이어지면 스프린트 비용은 제작비에서 차감합니다.", en: "We'll propose the team, concept and production plan. If it proceeds to production, the sprint fee is credited.", ja: "チーム、コンセプト、制作計画を提案します。本制作に進む場合、スプリント費用は制作費から差し引きます。" },
    media: { kind: "cta" },
    href: "mailto:contact@anchored.kr?subject=Production%20Sprint",
  },
  {
    label: { ko: "브랜드 & 커뮤니티", en: "Brand & community", ja: "ブランド & コミュニティ" },
    title: { ko: "브랜드가 내는 게임이 아니라, 커뮤니티가 가지고 노는 캠페인", en: "Not a game a brand releases — a campaign the community plays with", ja: "ブランドが出すゲームではなく、コミュニティが遊び倒すキャンペーン" },
    body: { ko: "크리에이터 콘텐츠, 인게임 이벤트, 길드 활성화, 성과 리포트까지. 로블록스 안에서 플레이되는 브랜드 경험을 설계합니다.", en: "Creator content, in-game events, guild activation and results reporting — brand experiences designed to be played inside Roblox.", ja: "クリエイターコンテンツ、ゲーム内イベント、ギルド活性化、成果レポートまで。Roblox の中でプレイされるブランド体験を設計します。" },
    media: { kind: "poster", slug: "brand-campaigns" },
    href: "/projects/brand-campaigns",
  },
  {
    label: "2026",
    title: { ko: "Korea Roblox Developer Meetup", en: "Korea Roblox Developer Meetup", ja: "Korea Roblox Developer Meetup" },
    body: { ko: "한국 로블록스 생태계의 크리에이터·스튜디오·플랫폼·파트너를 잇는 오프라인 밋업을 준비하고 있습니다.", en: "An offline meetup connecting creators, studios, platforms and partners in Korea's Roblox ecosystem — in preparation.", ja: "韓国 Roblox エコシステムのクリエイター・スタジオ・プラットフォーム・パートナーをつなぐオフラインミートアップを準備中です。" },
    media: { kind: "poster", slug: "korea-roblox-developer-meetup-2026" },
    href: "/projects/korea-roblox-developer-meetup-2026",
  },
  {
    label: { ko: "성장 지수", en: "Growth Index", ja: "Growth Index" },
    title: { ko: "크리에이터의 성장을 다섯 축으로 봅니다", en: "We read creator growth on five axes", ja: "クリエイターの成長を5つの軸で見ます" },
    body: { ko: "CODE · BUILD · SYSTEM · TEAM · PLATFORM. 누구와 어떻게 일할지를 감이 아니라 기준으로 판단합니다.", en: "CODE · BUILD · SYSTEM · TEAM · PLATFORM — deciding who to work with, and how, by a standard rather than a hunch.", ja: "CODE · BUILD · SYSTEM · TEAM · PLATFORM。誰とどう働くかを、勘ではなく基準で判断します。" },
    media: { kind: "poster", slug: "creator-growth-index" },
    href: "/projects/creator-growth-index",
  },
  {
    label: "Winter 2026",
    title: { ko: "Anchored School 윈터 캠프", en: "Anchored School Winter Camp", ja: "Anchored School ウィンターキャンプ" },
    body: { ko: "가능성 있는 신진 크리에이터를 ‘게임을 끝까지 출시하는 실력’으로 키우는 인큐베이션 프로그램을 준비하고 있습니다.", en: "An incubation program turning promising new creators into people who ship — in preparation.", ja: "可能性のある新人クリエイターを「最後までリリースする力」へ育てるインキュベーションプログラムを準備中です。" },
    media: { kind: "poster", slug: "winter-roblox-camp-2026" },
    href: "/projects/winter-roblox-camp-2026",
  },
];

/* ── About ── */
export const about4 = {
  studioLabel: { ko: "우리 스튜디오", en: "Our Studio", ja: "私たちのスタジオ" },
  studio: [
    { ko: "앵커드는 서울의 로블록스 네이티브 프로덕션 컴퍼니입니다.", en: "Anchored is a Roblox-native production company based in Seoul.", ja: "Anchored は、ソウルを拠点とする Roblox ネイティブなプロダクションカンパニーです。" },
    { ko: "로블록스 안에서 자란 크리에이터를 찾고, 프로젝트에 맞는 팀을 조립하고, 기획부터 출시 이후 운영까지 책임집니다.", en: "We find creators native to Roblox, assemble the right team for each project, and stay responsible from concept through live operations.", ja: "Roblox の中で育ったクリエイターを見つけ、プロジェクトに合うチームを編成し、企画からローンチ後の運営まで責任を持ちます。" },
    { ko: "프로젝트의 단일 책임자는 앵커드입니다. 연속성은 개인 계약자가 아니라 앵커드에 있습니다.", en: "One project, one accountable production partner. Continuity stays with Anchored — not with an individual contractor.", ja: "プロジェクトの単一責任者は Anchored です。継続性は個人契約者ではなく Anchored にあります。" },
  ] as LText[],
  contactLabel: { ko: "연락처", en: "Contact", ja: "お問い合わせ" },
  contact: [
    { label: { ko: "새 프로젝트", en: "New Business", ja: "新規のご相談" }, value: "contact@anchored.kr", href: "mailto:contact@anchored.kr?subject=Production%20Sprint" },
    { label: { ko: "크리에이터", en: "Creators", ja: "クリエイター" }, value: "Anchored Guild (Discord)", href: "https://discord.gg/anchored" },
    { label: { ko: "소셜", en: "Social", ja: "ソーシャル" }, value: "X / GitHub", links: [{ label: "X", href: "https://x.com/anchored_kr" }, { label: "GitHub", href: "https://github.com/anchored-kr" }] },
    { label: { ko: "위치", en: "Location", ja: "所在地" }, value: { ko: "서울", en: "Seoul, Korea", ja: "ソウル" } },
  ],
  capLabel: { ko: "할 수 있는 일", en: "Capabilities", ja: "できること" },
  capAll: { ko: "전체", en: "All", ja: "すべて" },
  capabilities: [
    {
      tab: { ko: "오리지널 & IP", en: "Original & IP", ja: "オリジナル & IP" },
      items: [
        { ko: "IP·콘텐츠의 로블록스 게임화", en: "IP-to-Roblox adaptation", ja: "IP・コンテンツの Roblox ゲーム化" },
        { ko: "오리지널 IP 개발", en: "Original IP development", ja: "オリジナル IP 開発" },
        { ko: "게임 기획·코어 루프 설계", en: "Game design & core loops", ja: "ゲーム企画・コアループ設計" },
        { ko: "Luau 개발", en: "Luau development", ja: "Luau 開発" },
        { ko: "빌드·환경 아트", en: "Building & environment art", ja: "ビルド・環境アート" },
        { ko: "팀 매칭·프로듀싱", en: "Team matching & producing", ja: "チーム編成・プロデュース" },
      ] as LText[],
    },
    {
      tab: { ko: "라이브옵스 & 성장", en: "LiveOps & Growth", ja: "ライブオプス & 成長" },
      items: [
        { ko: "인게임 애널리틱스", en: "In-game analytics", ja: "ゲーム内アナリティクス" },
        { ko: "리텐션·난이도 튜닝", en: "Retention & difficulty tuning", ja: "リテンション・難易度調整" },
        { ko: "시즌·이벤트 운영", en: "Seasons & events", ja: "シーズン・イベント運営" },
        { ko: "리더보드 시즌", en: "Leaderboard seasons", ja: "リーダーボードシーズン" },
        { ko: "커뮤니티 테스트", en: "Community playtests", ja: "コミュニティテスト" },
        { ko: "월간 리뷰", en: "Monthly reviews", ja: "月次レビュー" },
      ] as LText[],
    },
    {
      tab: { ko: "브랜드 & 커뮤니티", en: "Brand & Community", ja: "ブランド & コミュニティ" },
      items: [
        { ko: "로블록스 브랜드 경험", en: "Brand experiences in Roblox", ja: "Roblox ブランド体験" },
        { ko: "크리에이터 콘텐츠", en: "Creator content", ja: "クリエイターコンテンツ" },
        { ko: "인게임 이벤트", en: "In-game events", ja: "ゲーム内イベント" },
        { ko: "길드 활성화", en: "Guild activation", ja: "ギルド活性化" },
        { ko: "성과 리포트", en: "Results reporting", ja: "成果レポート" },
      ] as LText[],
    },
  ],
  creatorsLabel: { ko: "크리에이터에게", en: "For Creators", ja: "クリエイターへ" },
  creators: [
    { label: { ko: "앵커드 길드 참여하기", en: "Join the Anchored Guild", ja: "Anchored Guild に参加する" }, href: "https://discord.gg/anchored" },
    { label: { ko: "데모데이에서 발표하기", en: "Present at Demo Day", ja: "Demo Day で発表する" }, href: "https://discord.gg/anchored" },
    { label: { ko: "플릿 합류 문의", en: "Ask about joining the Fleet", ja: "Fleet への参加を相談する" }, href: "mailto:contact@anchored.kr?subject=Fleet" },
    { label: { ko: "Anchored School — Winter 2026", en: "Anchored School — Winter 2026", ja: "Anchored School — Winter 2026" }, href: "/projects/winter-roblox-camp-2026" },
  ],
  eventsLabel: { ko: "이벤트", en: "Events", ja: "イベント" },
  events: [
    { title: "Anchored Demo Day", who: { ko: "앵커드 길드 크리에이터", en: "Anchored Guild creators", ja: "Anchored Guild のクリエイター" }, when: { ko: "매월", en: "Monthly", ja: "毎月" }, where: "Anchored Guild", href: "/projects/anchored-demo-day" },
    { title: "Korea Roblox Developer Meetup", who: { ko: "크리에이터 · 스튜디오 · 플랫폼", en: "Creators · studios · platforms", ja: "クリエイター・スタジオ・プラットフォーム" }, when: "2026", where: { ko: "오프라인", en: "Offline", ja: "オフライン" }, href: "/projects/korea-roblox-developer-meetup-2026" },
    { title: "Anchored School Winter Camp", who: { ko: "신진 로블록스 크리에이터", en: "Emerging Roblox creators", ja: "新人 Roblox クリエイター" }, when: "Winter 2026", where: { ko: "준비 중", en: "In preparation", ja: "準備中" }, href: "/projects/winter-roblox-camp-2026" },
  ],
  howLabel: { ko: "제작 방식", en: "How We Produce", ja: "制作の進め方" },
  steps: model.steps,
  continuity: model.continuity,
  fleetLabel: { ko: "플릿", en: "Fleet", ja: "Fleet" },
  fleetNote: { ko: "앵커드 길드에서 선발한 로블록스 네이티브 팀. 로스터는 일부러 작게 유지합니다.", en: "Roblox-native teams selected from the Anchored Guild. We keep the roster small on purpose.", ja: "Anchored Guild から選抜した Roblox ネイティブなチーム。ロスターは意図的に小さく保っています。" },
  teams: fleet.teams,
  creatorsCount: fleet.creatorsLabel,
  figuresLabel: { ko: "숫자", en: "Figures", ja: "数字" },
  figures: [
    { value: "723", label: { ko: "앵커드 길드 크리에이터", en: "Anchored Guild creators", ja: "Anchored Guild のクリエイター" } },
    { value: { ko: "매월", en: "Monthly", ja: "毎月" }, label: { ko: "데모데이", en: "Demo Day", ja: "Demo Day" } },
    { value: "4", label: { ko: "선발된 플릿 팀", en: "Selected Fleet teams", ja: "選抜された Fleet チーム" } },
    { value: "Full cycle", label: { ko: "기획 → 출시 → 라이브옵스", en: "Concept → launch → LiveOps", ja: "企画 → ローンチ → ライブオプス" } },
  ],
  startLabel: "Production Sprint",
  startTitle: sprint.headline,
  startSteps: sprint.steps,
  startNote: sprint.note,
};
