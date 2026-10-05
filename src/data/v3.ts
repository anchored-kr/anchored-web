/**
 * v3 — "Kodansha grammar": the same Anchored content, re-edited as a corporate
 * editorial site (Main Visual → News → Brand Film → Message → Purpose →
 * Productions → Creators → What We Produce → Figures → How We Produce →
 * Guild → Start a Production → Footer). Copy reused from v2 where it fits.
 */
import type { LText } from "./i18n";
import { fleet, model, build, sprint, where, type FleetTeam } from "./v2";

export const nav3 = {
  tagline: { ko: "로블록스 안에서 자란 팀과 만듭니다", en: "Creators who build their own worlds", ja: "Roblox の中で育ったチームとつくります" },
  items: [
    { href: "#productions", label: { ko: "Productions", en: "Productions", ja: "Productions" }, sub: { ko: "프로덕션", en: "", ja: "作品" } },
    { href: "#creators", label: { ko: "Creators", en: "Creators", ja: "Creators" }, sub: { ko: "크리에이터", en: "", ja: "クリエイター" } },
    { href: "#message", label: { ko: "About", en: "About", ja: "About" }, sub: { ko: "소개", en: "", ja: "会社案内" } },
    { href: "#news", label: { ko: "News", en: "News", ja: "News" }, sub: { ko: "뉴스", en: "", ja: "お知らせ" } },
    { href: "#contact", label: { ko: "Contact", en: "Contact", ja: "Contact" }, sub: { ko: "문의", en: "", ja: "お問い合わせ" } },
  ],
  contact: { ko: "CONTACT US", en: "CONTACT US", ja: "CONTACT US" },
};

/* 01 Main Visual */
export const mainVisual = {
  corner: "ROBLOX-NATIVE PRODUCTION COMPANY — SEOUL",
  headline: { ko: "로블록스 안에서\n자란 팀과\n만듭니다.", en: "CREATORS WHO\nBUILD THEIR\nOWN WORLDS.", ja: "Roblox の中で\n育ったチームと\nつくります。" },
  sub: { ko: "Creators who build their own worlds.", en: "Roblox-native production company, Seoul.", ja: "Creators who build their own worlds." },
  scroll: { ko: "SCROLL", en: "SCROLL", ja: "SCROLL" },
};

/* 02 News — dates only where we actually have one; recurring/ongoing items carry a status instead */
export const news = {
  title: "News",
  sub: { ko: "뉴스", en: "Latest from Anchored", ja: "お知らせ" },
  viewAll: { ko: "VIEW ALL", en: "VIEW ALL", ja: "VIEW ALL" },
  items: [
    { date: "2026.10", tag: "NEW", title: { ko: "앵커드 홈페이지를 새롭게 열었습니다 — 로블록스 네이티브 프로덕션 컴퍼니로서의 앵커드를 소개합니다.", en: "Anchored relaunches its website — introducing Anchored as a Roblox-native production company.", ja: "Anchored のウェブサイトを刷新 — Roblox ネイティブなプロダクションカンパニーとしての Anchored を紹介します。" }, href: "#message" },
    { date: "IN PRODUCTION", tag: "PRODUCTIONS", title: { ko: "GOKUI · Swarmrot · Telum — 앵커드 플릿 세 팀이 신작을 제작하고 있습니다.", en: "GOKUI · Swarmrot · Telum — three Anchored Fleet teams are in production.", ja: "GOKUI · Swarmrot · Telum — Anchored Fleet の3チームが新作を制作中です。" }, href: "#productions" },
    { date: "MONTHLY", tag: "DEMO DAY", title: { ko: "앵커드 길드 데모데이 — 매달 크리에이터들이 지금 만들고 있는 것을 발표합니다.", en: "Anchored Guild Demo Day — every month, creators present what they are building right now.", ja: "Anchored Guild Demo Day — 毎月、クリエイターがいまつくっているものを発表します。" }, href: "#guild" },
    { date: "LIVE", tag: "PRODUCTIONS", title: { ko: "Speed Obby — 출시 후 운영 중. 데이터 기반으로 난이도를 계속 다듬고 있습니다.", en: "Speed Obby — live and in operation, with data-driven difficulty tuning ongoing.", ja: "Speed Obby — リリース後も運営中。データに基づく難易度調整を続けています。" }, href: "#productions" },
  ],
};

/* 03 Brand Film */
export const film = {
  title: "Brand Film",
  sub: { ko: "브랜드 필름", en: "", ja: "ブランドフィルム" },
  name: "INSIDE ROBLOX",
  tagline: { ko: "Built From Inside", en: "Built From Inside", ja: "Built From Inside" },
  play: { ko: "PLAY", en: "PLAY", ja: "PLAY" },
  soon: { ko: "COMING SOON", en: "COMING SOON", ja: "COMING SOON" },
  closing: { ko: "최고의 로블록스 팀은 회의실에서 시작되지 않습니다.\n로블록스 안에서 자랍니다.", en: "The best Roblox teams don't start in boardrooms.\nThey grow inside Roblox.", ja: "最高の Roblox チームは会議室から生まれません。\nRoblox の中で育ちます。" },
  stills: [
    { src: "https://tr.rbxcdn.com/180DAY-586d3a8e3fe2ae8314ede2cfa73c6986/768/432/GameMediaItem9/Png/noFilter", caption: "TEAMWORK OBBY" },
    { src: "https://tr.rbxcdn.com/180DAY-6d91958704dad0fc2010ac76190188f9/768/432/Image/Png/noFilter", caption: "EVERGREEN VILLAGE" },
    { src: "https://tr.rbxcdn.com/180DAY-7874a1badf5c5dc341819a4edcccc66d/768/432/Image/Png/noFilter", caption: "ANCHORED GUILD HALL" },
  ],
};

/* 04 Message */
export const message = {
  title: "Message",
  sub: { ko: "메시지", en: "", ja: "メッセージ" },
  headline: { ko: "로블록스 안에서 자란 팀과 만듭니다.", en: "We build with creators native to Roblox.", ja: "Roblox の中で育ったチームとつくります。" },
  body: [
    { ko: "로블록스에는 로블록스만의 문화와 제작 방식이 있습니다.", en: "Roblox has a culture and a way of making things that is entirely its own.", ja: "Roblox には Roblox ならではの文化とものづくりの作法があります。" },
    { ko: "좋은 게임은 기술적으로 완성된 게임이 아니라, 플레이어를 이해하고 빠르게 배우며 계속 변화하는 게임입니다.", en: "A good game isn't the one that is technically finished — it is the one that understands its players, learns fast, and keeps changing.", ja: "良いゲームとは技術的に完成したゲームではなく、プレイヤーを理解し、速く学び、変化し続けるゲームです。" },
    { ko: "앵커드는 그 환경 안에서 자란 크리에이터를 찾고, 함께 팀을 만들고, 프로젝트를 끝까지 프로듀싱합니다.", en: "Anchored finds the creators who grew up inside that environment, builds teams with them, and produces each project all the way through.", ja: "Anchored はその環境の中で育ったクリエイターを見つけ、共にチームをつくり、プロジェクトを最後までプロデュースします。" },
    { ko: "우리는 크리에이터와 기회가 만나는 곳을 만들고 있습니다.", en: "We are building the place where creators and opportunities meet.", ja: "私たちは、クリエイターと機会が出会う場所をつくっています。" },
  ] as LText[],
  signature: "ANCHORED, SEOUL",
  more: { ko: "VIEW MORE", en: "VIEW MORE", ja: "VIEW MORE" },
};

/* 05 Purpose */
export const purpose = {
  title: "Purpose",
  sub: { ko: "퍼포스", en: "", ja: "パーパス" },
  statement: "Creators who build their own worlds.",
  blocks: [
    { word: "CREATORS", body: { ko: "좋은 게임은 결국 사람에서 시작합니다. 우리는 크리에이터의 기술만 보지 않습니다. 무엇을 만들고 싶어 하는지, 어떻게 팀과 일하는지, 얼마나 계속 만드는지를 봅니다.", en: "Good games start with people. We don't look at a creator's skills alone — we look at what they want to make, how they work with a team, and whether they keep building.", ja: "良いゲームは結局、人から始まります。私たちはクリエイターの技術だけを見ません。何をつくりたいのか、チームとどう働くのか、どれだけつくり続けるのかを見ます。" } },
    { word: "BUILD", body: { ko: "아이디어는 만드는 과정에서 제품이 됩니다. 프로듀서, 개발자, 빌더, 아티스트가 함께 반복하며 게임을 만들어갑니다.", en: "Ideas become products in the making. Producers, developers, builders and artists iterate together until it is a game.", ja: "アイデアはつくる過程で製品になります。プロデューサー、開発者、ビルダー、アーティストが共に反復しながらゲームをつくっていきます。" } },
    { word: "WORLDS", body: { ko: "우리에게 게임은 납품물이 아니라 하나의 세계입니다. 출시한 뒤에도 플레이어가 들어오고, 변화하고, 확장되는 세계를 만듭니다.", en: "To us a game is not a deliverable but a world — one that players keep entering, that changes, and that grows long after launch.", ja: "私たちにとってゲームは納品物ではなく、ひとつの世界です。ローンチ後もプレイヤーが入り、変化し、広がり続ける世界をつくります。" } },
  ],
};

/* 06 Productions */
export interface Production {
  name: string;
  slug?: string;
  line: LText; // "ORIGINAL / CO-OP ACTION"
  status: string; // "2026 — IN PRODUCTION" | "LIVE"
  live?: boolean;
  capture?: string;
  team?: FleetTeam;
}
const byName = (n: string) => fleet.teams.find((t) => t.name === n);
export const productions = {
  title: "Productions",
  sub: { ko: "프로덕션", en: "", ja: "作品" },
  items: [
    { name: "GOKUI", slug: "gokui", line: { ko: "ORIGINAL / CO-OP ACTION", en: "ORIGINAL / CO-OP ACTION", ja: "ORIGINAL / CO-OP ACTION" }, status: "2026 — IN PRODUCTION", team: byName("GOKUI") },
    { name: "SWARMROT", slug: "swarmrot", line: { ko: "MEME IP / STRATEGY PVP", en: "MEME IP / STRATEGY PVP", ja: "MEME IP / STRATEGY PVP" }, status: "2026 — IN PRODUCTION", team: byName("Swarmrot") },
    { name: "TELUM", slug: "telum", line: { ko: "ORIGINAL / PVP COMBAT", en: "ORIGINAL / PVP COMBAT", ja: "ORIGINAL / PVP COMBAT" }, status: "2026 — IN PRODUCTION", team: byName("Telum") },
    { name: "SPEED OBBY", slug: "speed-obby", line: { ko: "TIME ATTACK", en: "TIME ATTACK", ja: "TIME ATTACK" }, status: "LIVE", live: true, team: byName("Speed Obby") },
  ] as Production[],
  detail: { ko: "자세히 보기", en: "View production", ja: "詳しく見る" },
};

/* 07 Creators */
export const creators = {
  title: "Creators",
  sub: { ko: "크리에이터", en: "", ja: "クリエイター" },
  eyebrow: "SELECTED CREATORS",
  fleetLabel: "FLEET",
  note: { ko: "앵커드 플릿은 크리에이터 커뮤니티에서 선발한 로블록스 네이티브 팀의 큐레이션 로스터입니다.", en: "Anchored Fleet is a curated roster of Roblox-native teams selected from our creator community.", ja: "Anchored Fleet は、クリエイターコミュニティから選抜した Roblox ネイティブチームのキュレーションロスターです。" },
  teams: fleet.teams,
  creatorsLabel: fleet.creatorsLabel,
};

/* 08 What We Produce */
export const produce = {
  title: "What We Produce",
  sub: { ko: "사업 영역", en: "", ja: "事業内容" },
  items: build.items.map((b, i) => ({ ...b, display: ["ORIGINAL & IP\nGAME PRODUCTION", "LIVE OPERATIONS\n& GROWTH", "BRAND &\nCOMMUNITY EXPERIENCES"][i] })),
};

/* 09 Figures */
export const figures = {
  title: "Figures",
  sub: { ko: "숫자로 보는 앵커드", en: "Anchored in numbers", ja: "数字で見る Anchored" },
  items: [
    { value: "723", label: { ko: "앵커드 길드 멤버", en: "Guild Members", ja: "Guild メンバー" } },
    { value: "MONTHLY", label: { ko: "데모데이", en: "Demo Day", ja: "Demo Day" } },
    { value: "4", label: { ko: "선발된 플릿 팀", en: "Selected Fleet Teams", ja: "選抜された Fleet チーム" } },
    { value: "FULL CYCLE", label: { ko: "기획 → 출시 → 라이브옵스", en: "Concept → LiveOps", ja: "企画 → ライブオプス" } },
  ],
  stats: where.stats,
};

/* 10 How We Produce */
export const how3 = {
  title: "How We Produce",
  sub: { ko: "제작 방식", en: "", ja: "制作の進め方" },
  steps: model.steps,
  continuity: model.continuity,
};

/* 11 Community / Guild */
export const guild = {
  title: "Anchored Guild",
  sub: { ko: "커뮤니티", en: "Community", ja: "コミュニティ" },
  headline: { ko: "플릿은 여기서 시작됩니다.", en: "The Fleet starts here.", ja: "Fleet はここから始まります。" },
  body: { ko: "앵커드 길드는 한국 로블록스 크리에이터 커뮤니티입니다. 사람들이 실제로 만드는 것을 보고, 매월 데모데이에서 발표를 듣고, 시간을 두고 활동을 관찰합니다. 우리가 함께 일하는 모든 팀은 이 안에서 나옵니다.", en: "Anchored Guild is Korea's Roblox creator community. We watch what people actually build, hear them present at monthly Demo Day, and observe their work over time. Every team we work with comes from inside it.", ja: "Anchored Guild は韓国の Roblox クリエイターコミュニティです。実際につくるものを見て、毎月の Demo Day で発表を聞き、時間をかけて活動を観察します。私たちが共に働くすべてのチームはこの中から生まれます。" },
  points: [
    { k: "723", v: { ko: "크리에이터 · 공식 그룹", en: "creators · official group", ja: "クリエイター・公式グループ" } },
    { k: "DEMO DAY", v: { ko: "매월 개최", en: "every month", ja: "毎月開催" } },
    { k: "DEV MEETUP", v: { ko: "오프라인 밋업", en: "offline meetup", ja: "オフラインミートアップ" } },
  ],
  join: { ko: "JOIN THE GUILD", en: "JOIN THE GUILD", ja: "JOIN THE GUILD" },
  href: "https://discord.gg/anchored",
  image: "https://tr.rbxcdn.com/180DAY-7874a1badf5c5dc341819a4edcccc66d/768/432/Image/Png/noFilter",
};

/* 12 Start a Production */
export const start = {
  title: "Start a Production",
  sub: { ko: "프로젝트 시작하기", en: "", ja: "プロジェクトを始める" },
  headline: sprint.headline,
  body: sprint.sub,
  steps: sprint.steps,
  note: sprint.note,
  cta: { ko: "CONTACT US", en: "CONTACT US", ja: "CONTACT US" },
  mail: "mailto:contact@anchored.kr?subject=Production%20Sprint",
  sprintLabel: "PRODUCTION SPRINT",
};

/* 13 Footer */
export const footer3 = {
  tagline: "Creators who build their own worlds.",
  columns: [
    { head: { ko: "사이트", en: "Site", ja: "サイト" }, links: [{ label: "Productions", href: "#productions" }, { label: "Creators", href: "#creators" }, { label: "About", href: "#message" }, { label: "News", href: "#news" }, { label: "Contact", href: "#contact" }] },
    { head: { ko: "커뮤니티", en: "Community", ja: "コミュニティ" }, links: [{ label: "Anchored Guild (Discord)", href: "https://discord.gg/anchored" }, { label: "Demo Day", href: "#guild" }, { label: "Anchored OS (archive)", href: "/os" }] },
    { head: { ko: "소셜", en: "Social", ja: "ソーシャル" }, links: [{ label: "X", href: "https://x.com/anchored_kr" }, { label: "GitHub", href: "https://github.com/anchored-kr" }, { label: "Email", href: "mailto:contact@anchored.kr" }] },
  ],
  office: { ko: "서울", en: "Seoul, Korea", ja: "ソウル" },
  forCreators: { ko: "크리에이터에게 — 당신의 세계를 만드세요. 더 멀리 가게 돕겠습니다.", en: "For creators — build your own world. We'll help it go further.", ja: "クリエイターへ — あなたの世界をつくってください。もっと遠くへ行けるように支えます。" },
};
