/** Anchored v2 — editorial homepage copy (ko / en / ja). JA is a provisional pass; lock after KO/EN. */
import type { LText } from "./i18n";

export const nav = {
  work: { ko: "Work", en: "Work", ja: "Work" },
  model: { ko: "Model", en: "Model", ja: "Model" },
  sprint: { ko: "Sprint", en: "Sprint", ja: "Sprint" },
  creators: { ko: "For Creators", en: "For Creators", ja: "For Creators" },
  cta: { ko: "프로젝트 시작하기", en: "Start a project", ja: "プロジェクトを始める" },
} satisfies Record<string, LText>;

export const hero = {
  meta: { ko: "ROBLOX-NATIVE PRODUCTION COMPANY — SEOUL", en: "ROBLOX-NATIVE PRODUCTION COMPANY — SEOUL", ja: "ROBLOX-NATIVE PRODUCTION COMPANY — SEOUL" },
  headline: { ko: "로블록스 안에서\n자란 팀과\n만듭니다.", en: "Build with\ncreators native\nto Roblox.", ja: "Roblox の中で\n育ったチームと\nつくります。" },
  sub: {
    ko: "앵커드는 로블록스 네이티브 크리에이터를 발굴해 팀을 조립하고, 기획부터 출시 이후 운영까지 책임지는 프로덕션 회사입니다.",
    en: "Anchored is a Roblox-native production company. We find native creators, assemble the right team, and stay responsible from concept to live operations.",
    ja: "Anchored は Roblox ネイティブのクリエイターを見つけてチームを組み、企画からローンチ後の運営まで責任を持つプロダクション会社です。",
  },
  defense: {
    ko: "우리는 크리에이터를 소개하는 회사가 아닙니다. 팀을 고르고, 제품을 다듬고, 제작을 관리하고, 라이브 운영까지 함께 남습니다.",
    en: "We don't just introduce creators. We select the team, shape the product, manage production, and stay through live operations.",
    ja: "クリエイターを紹介するだけの会社ではありません。チームを選び、プロダクトを磨き、制作を管理し、ライブ運営まで共に残ります。",
  },
  accountable: { ko: "프로젝트의 단일 책임자는 앵커드입니다.", en: "One project. One accountable production partner.", ja: "プロジェクトの単一責任者は Anchored です。" },
  primary: { ko: "Production Sprint 시작하기", en: "Start a Production Sprint", ja: "Production Sprint を始める" },
  secondary: { ko: "앵커드 모델 보기", en: "See the Anchored model", ja: "Anchored モデルを見る" },
} satisfies Record<string, LText>;

/** Real captures from Anchored Guild's own Roblox experiences (CDN URLs — self-host before launch). */
export const reel = [
  { src: "https://tr.rbxcdn.com/180DAY-586d3a8e3fe2ae8314ede2cfa73c6986/768/432/GameMediaItem9/Png/noFilter", caption: "ANCHORED GUILD — TEAMWORK OBBY" },
  { src: "https://tr.rbxcdn.com/180DAY-6d91958704dad0fc2010ac76190188f9/768/432/Image/Png/noFilter", caption: "ANCHORED GUILD — EVERGREEN VILLAGE" },
  { src: "https://tr.rbxcdn.com/180DAY-7874a1badf5c5dc341819a4edcccc66d/768/432/Image/Png/noFilter", caption: "ANCHORED GUILD — 대강당" },
];

export const why = {
  label: { ko: "WHY ROBLOX IS DIFFERENT", en: "WHY ROBLOX IS DIFFERENT", ja: "WHY ROBLOX IS DIFFERENT" },
  headline: { ko: "로블록스는 다릅니다.", en: "Roblox is not just another game platform.", ja: "Roblox は、ただのゲームプラットフォームではありません。" },
  body1: {
    ko: "로블록스는 게임을 만들어 납품하고 끝나는 플랫폼이 아닙니다. 출시 이후 플레이어를 관찰하고, 업데이트하고, 다시 성장시키는 과정까지가 제품입니다.",
    en: "Roblox isn't a platform where you build a game, deliver it, and you're done. Watching players after launch, updating, and growing again — that process is the product.",
    ja: "Roblox はゲームをつくって納品して終わるプラットフォームではありません。ローンチ後にプレイヤーを観察し、更新し、再び成長させる過程までがプロダクトです。",
  },
  body2: {
    ko: "광고는 첫 방문을 만들 수 있습니다. 그 다음을 결정하는 것은 리텐션, 참여, 그리고 끊임없는 개선입니다.",
    en: "Advertising can create the first visit. Retention, engagement and continuous iteration determine what happens after that.",
    ja: "広告は最初の訪問をつくれます。その先を決めるのはリテンション、エンゲージメント、そして絶え間ない改善です。",
  },
  body3: {
    ko: "그래서 로블록스를 안에서부터 이해하는 팀이, 기존 게임 제작 방식을 그대로 옮겨온 팀보다 자주 앞섭니다.",
    en: "Teams that understand Roblox natively often outperform teams simply adapting conventional game-development methods to Roblox.",
    ja: "だからこそ、Roblox を内側から理解するチームは、従来のゲーム制作手法をそのまま持ち込むチームをしばしば上回ります。",
  },
  trackA: { ko: "일반 외주", en: "Conventional outsourcing", ja: "一般的な外注" },
  trackB: { ko: "로블록스", en: "Roblox", ja: "Roblox" },
  stepsA: ["Build", "Deliver", "End"],
  stepsB: ["Build", "Launch", "Learn", "Iterate", "Grow"],
};

export const model = {
  label: { ko: "THE ANCHORED MODEL", en: "THE ANCHORED MODEL", ja: "THE ANCHORED MODEL" },
  steps: [
    { en: "Find", title: { ko: "발굴", en: "Find", ja: "発掘" }, desc: { ko: "앵커드 길드와 데모데이에서, 실제로 만들고 있는 크리에이터를 봅니다.", en: "We watch creators who are actually building — in the Anchored Guild and at Demo Day.", ja: "Anchored Guild と Demo Day で、実際につくっているクリエイターを見ます。" } },
    { en: "Validate", title: { ko: "검증", en: "Validate", ja: "検証" }, desc: { ko: "활동 기록, 출시 경험, 성장 지수 5축으로 팀을 평가합니다.", en: "Teams are assessed on track record, shipping experience, and our five-axis Growth Index.", ja: "活動履歴、リリース経験、5軸の Growth Index でチームを評価します。" } },
    { en: "Assemble", title: { ko: "조립", en: "Assemble", ja: "編成" }, desc: { ko: "프로젝트의 장르·IP·목표에 맞춰 팀을 구성하고, 앵커드 프로듀서를 붙입니다.", en: "We compose the team around the project's genre, IP and goals — and attach an Anchored producer.", ja: "プロジェクトのジャンル・IP・目標に合わせてチームを編成し、Anchored のプロデューサーを付けます。" } },
    { en: "Produce", title: { ko: "제작", en: "Produce", ja: "制作" }, desc: { ko: "기획, 기술 기준, 일정, 품질을 앵커드가 관리합니다. 주간 보고와 상황판으로 진행을 공유합니다.", en: "Anchored manages design, technical standards, schedule and quality — shared through weekly reports and a live dashboard.", ja: "企画、技術基準、スケジュール、品質を Anchored が管理。週次レポートとダッシュボードで進捗を共有します。" } },
    { en: "Operate", title: { ko: "운영", en: "Operate", ja: "運営" }, desc: { ko: "출시 뒤 데이터로 배우고, 고치고, 키웁니다. 커뮤니티 테스트, 이벤트, 라이브옵스.", en: "After launch we learn from data, fix, and grow — community tests, events, live operations.", ja: "ローンチ後はデータから学び、直し、育てます。コミュニティテスト、イベント、ライブオプス。" } },
  ],
  continuity: { ko: "프로젝트의 연속성은 개인이 아니라 앵커드에 있습니다.", en: "Project continuity stays with Anchored — not with an individual contractor.", ja: "プロジェクトの継続性は個人ではなく Anchored にあります。" },
};

export const where = {
  label: { ko: "WHERE THE TEAMS COME FROM", en: "WHERE THE TEAMS COME FROM", ja: "WHERE THE TEAMS COME FROM" },
  headline: { ko: "팀을 로블록스 크리에이터\n생태계 안에서 만듭니다.", en: "We build our teams from inside\nthe Roblox creator ecosystem.", ja: "チームは Roblox クリエイターの\nエコシステムの内側からつくります。" },
  body: {
    ko: "우리는 프로젝트가 생길 때마다 인터넷에서 개발자를 검색해 임시로 붙이지 않습니다. 한국 로블록스 크리에이터 커뮤니티 앵커드 길드에서 사람들이 실제로 만드는 것을 보고, 월간 데모데이에서 발표를 듣고, 시간을 두고 활동을 관찰한 뒤, 검증된 팀만 플릿에 선발합니다.",
    en: "We don't search the internet for developers and attach them to a project ad hoc. In the Anchored Guild — Korea's Roblox creator community — we watch what people actually build, hear them present at monthly Demo Day, observe their work over time, and select only validated teams into the Fleet.",
    ja: "プロジェクトのたびにネットで開発者を探して場当たり的に付けることはしません。韓国の Roblox クリエイターコミュニティ Anchored Guild で実際につくるものを見て、月例 Demo Day で発表を聞き、時間をかけて活動を観察した上で、検証済みのチームだけを Fleet に選抜します。",
  },
  pipeline: [
    { ko: "앵커드 길드", en: "Anchored Guild", ja: "Anchored Guild" },
    { ko: "데모데이", en: "Demo Day", ja: "Demo Day" },
    { ko: "활동 관찰", en: "Observation", ja: "活動の観察" },
    { ko: "평가", en: "Assessment", ja: "評価" },
    { ko: "플릿 선발", en: "Fleet selection", ja: "Fleet 選抜" },
  ] as LText[],
  stats: [
    { value: "723", label: { ko: "크리에이터 커뮤니티 · 공식 그룹", en: "creators in community · official group", ja: "クリエイターコミュニティ・公式グループ" } },
    { value: "Monthly", label: { ko: "크리에이터 데모데이", en: "creator Demo Day", ja: "クリエイター Demo Day" } },
    { value: "4", label: { ko: "723명 중 선별된 플릿 팀", en: "Fleet teams selected from 700+", ja: "700+ から選抜した Fleet チーム" } },
    { value: "Full-cycle", label: { ko: "기획 → 출시 → 라이브옵스", en: "concept → launch → LiveOps", ja: "企画 → ローンチ → ライブオプス" } },
  ],
};

export interface FleetTeam {
  name: string;
  slug?: string;
  creators?: number;
  base?: string;
  genre: LText;
  status: "LIVE" | "IN DEV";
  strengths: LText[];
  experience: LText;
  capture?: string;
}

export const fleet = {
  label: { ko: "SELECTED CREATOR ROSTER", en: "SELECTED CREATOR ROSTER", ja: "SELECTED CREATOR ROSTER" },
  headline: { ko: "선별된 팀과 함께합니다.\n열린 마켓이 아닙니다.", en: "Selected teams,\nnot an open marketplace.", ja: "選抜されたチームと。\nオープンな市場ではありません。" },
  sub: { ko: "로스터는 일부러 작게 유지합니다.", en: "We keep the roster small on purpose.", ja: "ロスターは意図的に小さく保っています。" },
  creatorsLabel: { ko: "크리에이터 {n}명", en: "{n} creators", ja: "クリエイター{n}名" },
  view: { ko: "자세히 →", en: "View →", ja: "詳しく →" },
  teams: [
    { name: "Speed Obby", slug: "speed-obby", creators: 4, base: "KR", genre: { ko: "타임어택 오비", en: "Time-attack obby", ja: "タイムアタックオビー" }, status: "LIVE", strengths: [{ ko: "라이브옵스", en: "LiveOps", ja: "ライブオプス" }, { ko: "데이터 기반 난이도 튜닝", en: "Data-driven difficulty tuning", ja: "データ駆動の難易度調整" }], experience: { ko: "출시 · 운영 중", en: "Shipped · in operation", ja: "リリース済み・運営中" } },
    { name: "Swarmrot", slug: "swarmrot", creators: 5, base: "KR", genre: { ko: "전략 PvP", en: "Strategy PvP", ja: "戦略 PvP" }, status: "IN DEV", strengths: [{ ko: "인터넷 밈 IP", en: "Internet-meme IP", ja: "ネットミーム IP" }, { ko: "대규모 전투 설계", en: "Large-scale combat design", ja: "大規模戦闘の設計" }], experience: { ko: "개발 중", en: "In development", ja: "開発中" } },
    { name: "GOKUI", slug: "gokui", creators: 4, base: "KR", genre: { ko: "협동 액션", en: "Co-op action", ja: "協力アクション" }, status: "IN DEV", strengths: [{ ko: "오리지널 세계관·캐릭터", en: "Original world & characters", ja: "オリジナル世界観・キャラクター" }, { ko: "협동 전투", en: "Co-op combat", ja: "協力戦闘" }], experience: { ko: "개발 중", en: "In development", ja: "開発中" } },
    { name: "Telum", slug: "telum", creators: 3, base: "KR", genre: { ko: "PvP 전투", en: "PvP combat", ja: "PvP 戦闘" }, status: "IN DEV", strengths: [{ ko: "무기·지형 전투", en: "Weapon & terrain combat", ja: "武器・地形戦闘" }, { ko: "밸런싱", en: "Balancing", ja: "バランス調整" }], experience: { ko: "개발 중", en: "In development", ja: "開発中" } },
  ] as FleetTeam[],
  pending: { ko: "캡처 준비 중", en: "Capture pending", ja: "キャプチャ準備中" },
};

export const build = {
  label: { ko: "WHAT WE BUILD", en: "WHAT WE BUILD", ja: "WHAT WE BUILD" },
  items: [
    { title: "Original & IP Game Production", desc: { ko: "보유한 IP·콘텐츠·브랜드를 로블록스 네이티브 게임으로. 또는 오리지널 IP를 처음부터. 팀 매칭, 컨셉, 풀 프로덕션을 포함합니다.", en: "Your IP, content or brand as a Roblox-native game — or an original IP from scratch. Team matching, concept and full production included.", ja: "保有する IP・コンテンツ・ブランドを Roblox ネイティブなゲームに。あるいはオリジナル IP をゼロから。チーム編成、コンセプト、フルプロダクションを含みます。" } },
    { title: "Live Operations & Growth", desc: { ko: "출시 이후가 본편입니다. 데이터 기반 개선, 시즌과 이벤트, 커뮤니티 운영, 월간 리뷰.", en: "Launch is where the real work starts. Data-driven iteration, seasons and events, community operations, monthly reviews.", ja: "ローンチ後が本番です。データ駆動の改善、シーズンとイベント、コミュニティ運営、月次レビュー。" } },
    { title: "Brand & Community Experiences", desc: { ko: "브랜드가 '내는' 게임이 아니라, 커뮤니티가 가지고 노는 캠페인. 크리에이터 콘텐츠, 인게임 이벤트, 길드 활성화, 성과 리포트.", en: "Not a game a brand 'releases' — a campaign the community plays with. Creator content, in-game events, guild activation, results reporting.", ja: "ブランドが「出す」ゲームではなく、コミュニティが遊び倒すキャンペーン。クリエイターコンテンツ、ゲーム内イベント、ギルド活性化、成果レポート。" } },
  ],
};

export const how = {
  label: { ko: "HOW ENGAGEMENT WORKS", en: "HOW ENGAGEMENT WORKS", ja: "HOW ENGAGEMENT WORKS" },
  headline: { ko: "함께 일하는 방식", en: "How we work with you", ja: "一緒に働く方法" },
  points: [
    { ko: "계약 상대는 앵커드 하나입니다.", en: "One contract — with Anchored.", ja: "契約相手は Anchored ひとつです。" },
    { ko: "프로젝트 관리와 품질 책임은 앵커드가 집니다.", en: "Anchored owns project management and quality.", ja: "プロジェクト管理と品質の責任は Anchored が負います。" },
    { ko: "프로젝트의 연속성은 개인 계약자가 아니라 앵커드에 있습니다 — 소스 관리, 권한 관리, 문서화, 백업 인력이 이를 보증합니다.", en: "Project continuity stays with Anchored, not with an individual contractor — source control, access management, documentation and backup staff guarantee it.", ja: "プロジェクトの継続性は個人契約者ではなく Anchored にあります — ソース管理、権限管理、ドキュメント化、バックアップ人員がそれを保証します。" },
    { ko: "주간 보고, 실시간 상황판, 월간 리뷰로 진행을 공유합니다.", en: "Weekly reports, a live dashboard and monthly reviews keep you in the loop.", ja: "週次レポート、リアルタイムのダッシュボード、月次レビューで進捗を共有します。" },
    { ko: "출시 이후 라이브 운영까지 같은 팀이 이어갑니다.", en: "The same team carries the project into live operations.", ja: "ローンチ後のライブ運営まで同じチームが引き継ぎます。" },
    { ko: "품질을 위해 동시 진행 프로젝트 수를 제한합니다.", en: "We cap concurrent projects to protect quality.", ja: "品質のため、同時進行するプロジェクト数を制限します。" },
  ] as LText[],
};

export const sprint = {
  label: { ko: "PRODUCTION SPRINT", en: "PRODUCTION SPRINT", ja: "PRODUCTION SPRINT" },
  headline: { ko: "무엇을 만들고 싶은지\n알려주세요.", en: "Tell us what\nyou want to build.", ja: "何をつくりたいか\n教えてください。" },
  sub: { ko: "팀, 컨셉, 제작 계획을 제안합니다.", en: "We'll propose the team, concept and production plan.", ja: "チーム、コンセプト、制作計画を提案します。" },
  steps: [
    { ko: "IP·시장 분석", en: "IP & market analysis", ja: "IP・市場分析" },
    { ko: "게임 방향", en: "Game direction", ja: "ゲームの方向性" },
    { ko: "로블록스 네이티브 컨셉", en: "Roblox-native concept", ja: "Roblox ネイティブなコンセプト" },
    { ko: "적합한 제작팀", en: "The right production team", ja: "最適な制作チーム" },
    { ko: "예상 일정", en: "Schedule estimate", ja: "想定スケジュール" },
    { ko: "라이브옵스 방향", en: "LiveOps direction", ja: "ライブオプスの方向性" },
  ] as LText[],
  note: { ko: "본 제작으로 이어지면 스프린트 비용은 제작비에서 차감합니다.", en: "If the project proceeds to production, the sprint fee is credited against production.", ja: "本制作に進む場合、スプリント費用は制作費から差し引きます。" },
  cta: { ko: "Production Sprint 문의", en: "Ask about a Production Sprint", ja: "Production Sprint について問い合わせる" },
};

export const footer = {
  clients: { ko: "Build with creators native to Roblox.", en: "Build with creators native to Roblox.", ja: "Build with creators native to Roblox." },
  creators: { ko: "당신의 세계를 만드세요. 더 멀리 가게 돕겠습니다.", en: "Build your own world. We'll help it go further.", ja: "あなたの世界をつくってください。もっと遠くへ行けるように支えます。" },
  creatorsLabel: { ko: "크리에이터에게", en: "For creators", ja: "クリエイターへ" },
  clientsLabel: { ko: "고객에게", en: "For clients", ja: "クライアントへ" },
};
