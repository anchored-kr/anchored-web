/**
 * v4 — Porto Rocha grammar: a fixed sidebar (wordmark, live Seoul clock, About card,
 * stacked production cards) + a main column (hero media, studio-updates feed).
 * Production detail copy is reused from desktopItems (ko/en/ja). Positioning (2026-10-06) is
 * accountability-led: judgment + production system + responsibility; the creator network is infrastructure.
 */
import type { LText } from "./i18n";
import { appById, type DesktopApp } from "./desktopItems";
import { sprint } from "./v2";

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
    ko: "앵커드는 로블록스 안에서 자란 사람들과 게임을 만들고, 출시 후 운영까지 책임지는 프로덕션 컴퍼니입니다. 서울.",
    en: "Anchored is a production company that builds games with people native to Roblox — and stays responsible through launch and live operations. Seoul.",
    ja: "Anchored は、Roblox の中で育った人たちとゲームをつくり、ローンチ後の運営まで責任を持つプロダクションカンパニーです。ソウル。",
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

/* ── Accountability-led positioning (2026-10-06): we sell judgment + a production system + accountability,
   not people. Creator network = infrastructure (talent supply, intelligence, scouting). ── */
export const strategy = {
  slogan: ["We take", "responsibility", "for Roblox", "production."],
  questionsLabel: { ko: "책임", en: "Accountability", ja: "責任" },
  questionsTitle: { ko: "이 질문들은 이제 앵커드의 일입니다", en: "These questions become Anchored's job", ja: "これらの問いは、Anchored の仕事になります" },
  questionsLead: { ko: "개발자를 구하는 일은 점점 쉬워집니다. 어려운 건 그다음입니다.", en: "Finding a developer keeps getting easier. What comes after doesn't.", ja: "開発者を見つけることは、どんどん簡単になります。難しいのはその先です。" },
  questions: [
    { ko: "이 개발자가 정말 잘하는가?", en: "Is this developer actually good?", ja: "この開発者は本当に優秀か？" },
    { ko: "로블록스 유저를 이해하는가?", en: "Do they understand Roblox players?", ja: "Roblox のユーザーを理解しているか？" },
    { ko: "3개월 뒤에도 남아 있을까?", en: "Will they still be here in three months?", ja: "3か月後もいてくれるだろうか？" },
    { ko: "일정이 늦으면 누가 책임지나?", en: "Who's accountable when the schedule slips?", ja: "スケジュールが遅れたら誰が責任を取るのか？" },
    { ko: "개발자가 나가면 누가 인수인계하나?", en: "Who takes over when someone leaves?", ja: "開発者が抜けたら誰が引き継ぐのか？" },
    { ko: "출시 후 D1이 15%라면 누가 고치나?", en: "D1 retention is 15% after launch — who fixes it?", ja: "ローンチ後の D1 が15%なら誰が直すのか？" },
    { ko: "트렌드가 바뀌면 누가 방향을 바꾸나?", en: "The trend shifts — who changes direction?", ja: "トレンドが変わったら誰が方向を変えるのか？" },
    { ko: "IP를 잘못 써서 문제가 생기면 누가 책임지나?", en: "The IP gets misused — who answers for it?", ja: "IP の扱いで問題が起きたら誰が責任を負うのか？" },
  ] as LText[],
  questionsClose: { ko: "앵커드에 맡기면, 이 모든 질문의 답은 앵커드입니다.", en: "Hand it to Anchored, and the answer to every one of them is Anchored.", ja: "Anchored に任せれば、すべての問いの答えは Anchored です。" },

  shiftLabel: { ko: "AI 이후", en: "After AI", ja: "AI 以後" },
  shiftTitle: { ko: "실행은 싸지고, 판단은 비싸집니다", en: "Execution gets cheaper. Judgment gets scarcer.", ja: "実行は安くなり、判断は高くなる" },
  shiftBody: {
    ko: "AI가 제작의 문턱을 낮출수록 무엇을 만들지, 누구와 만들지, 출시 후 무엇을 고칠지가 성패를 가릅니다. AI는 앵커드를 대체하지 않고, 앵커드의 원가를 낮춥니다.",
    en: "As AI lowers the cost of making, what to build, who to build it with and what to fix after launch decide the outcome. AI doesn't replace Anchored — it lowers our cost of production.",
    ja: "AI が制作のハードルを下げるほど、何をつくるか、誰とつくるか、ローンチ後に何を直すかが勝敗を分けます。AI は Anchored を置き換えるのではなく、Anchored の原価を下げます。",
  },
  cheaperLabel: { ko: "싸지는 것", en: "Getting cheaper", ja: "安くなるもの" },
  pricierLabel: { ko: "비싸지는 것", en: "Getting scarcer", ja: "高くなるもの" },
  cheaper: [
    { label: { ko: "Luau 코딩", en: "Luau coding", ja: "Luau コーディング" }, n: 1 },
    { label: { ko: "3D 모델링", en: "3D modeling", ja: "3D モデリング" }, n: 1 },
    { label: { ko: "UI 제작", en: "UI production", ja: "UI 制作" }, n: 1 },
    { label: { ko: "프로토타입", en: "Prototyping", ja: "プロトタイプ" }, n: 2 },
    { label: { ko: "단순 PM", en: "Basic project management", ja: "単純な PM" }, n: 1 },
    { label: { ko: "개발자 찾기", en: "Finding developers", ja: "開発者探し" }, n: 1 },
  ] as { label: LText; n: number }[],
  pricier: [
    { label: { ko: "좋은 개발자 판별", en: "Telling who's good", ja: "優れた開発者の見極め" }, n: 1 },
    { label: { ko: "게임 콘셉트 판단", en: "Judging the concept", ja: "ゲームコンセプトの判断" }, n: 2 },
    { label: { ko: "적합한 팀 구성", en: "Composing the right team", ja: "適切なチーム編成" }, n: 1 },
    { label: { ko: "프로젝트 책임", en: "Owning the project", ja: "プロジェクトの責任" }, n: 2 },
    { label: { ko: "출시 후 개선 판단", en: "Post-launch decisions", ja: "ローンチ後の改善判断" }, n: 2 },
    { label: { ko: "성공 경험과 데이터", en: "Track record & data", ja: "成功経験とデータ" }, n: 3 },
  ] as { label: LText; n: number }[],

  lifecycleLabel: { ko: "제작 방식", en: "How we produce", ja: "制作の進め方" },
  lifecycleTitle: { ko: "게임을 만드는 회사가 아니라, 게임이 살아남게 하는 회사", en: "Not a company that makes games — one that keeps them alive", ja: "ゲームをつくる会社ではなく、ゲームを生き残らせる会社" },
  lifecycleBody: {
    ko: "매일 새 게임이 나오는 플랫폼에서 출시는 중간 지점일 뿐입니다. 숫자가 나올 때까지 고치고 키웁니다.",
    en: "On a platform where new games ship every day, launch is only the halfway point. We keep fixing and growing until the numbers come.",
    ja: "毎日新しいゲームが出るプラットフォームでは、ローンチは折り返し地点にすぎません。数字が出るまで直し、育て続けます。",
  },
  lifecycle: [
    { en: "Concept", desc: { ko: "무엇을 만들지 정합니다. 수요와 장르, IP와의 궁합을 봅니다.", en: "Decide what to build — demand, genre and fit with the IP.", ja: "何をつくるかを決めます。需要とジャンル、IP との相性を見ます。" } },
    { en: "Prototype", desc: { ko: "핵심 재미를 가장 빠르게 확인합니다.", en: "Prove the core fun as fast as possible.", ja: "コアの面白さを最速で確かめます。" } },
    { en: "Test", desc: { ko: "길드 테스터와 실제 플레이어에게 먼저 보여줍니다.", en: "Put it in front of guild testers and real players first.", ja: "ギルドのテスターと実際のプレイヤーに先に見せます。" } },
    { en: "Production", desc: { ko: "프로젝트에 맞는 팀을 꾸려 제작합니다. 일정·품질·기술 기준은 앵커드가 관리합니다.", en: "Assemble the team this project needs and build. Anchored owns schedule, quality and technical standards.", ja: "プロジェクトに合うチームを編成して制作します。スケジュール・品質・技術基準は Anchored が管理します。" } },
    { en: "Launch", desc: { ko: "출시와 첫 유입을 설계합니다.", en: "Plan the release and the first wave of players.", ja: "リリースと最初の流入を設計します。" } },
    { en: "Analytics", desc: { ko: "리텐션과 이탈 지점을 데이터로 읽습니다.", en: "Read retention and drop-off in the data.", ja: "リテンションと離脱ポイントをデータで読みます。" } },
    { en: "LiveOps", desc: { ko: "업데이트, 이벤트, 시즌으로 돌아올 이유를 만듭니다.", en: "Give players reasons to return — updates, events, seasons.", ja: "アップデート、イベント、シーズンで戻ってくる理由をつくります。" } },
    { en: "Revamp", desc: { ko: "숫자가 나쁘면 고칩니다. 루프와 난이도, 필요하면 방향까지.", en: "If the numbers are bad, fix it — loops, difficulty, even direction.", ja: "数字が悪ければ直します。ループや難易度、必要なら方向性まで。" } },
    { en: "Scale", desc: { ko: "되는 게임은 더 키웁니다.", en: "Grow what works.", ja: "うまくいくゲームはさらに伸ばします。" } },
  ],
  launchIndex: 4,
  launchNote: { ko: "출시는 중간 지점", en: "Launch is the halfway point", ja: "ローンチは折り返し地点" },

  filmLabel: { ko: "프로덕션 컴퍼니", en: "Production company", ja: "プロダクションカンパニー" },
  filmTitle: { ko: "영화 제작사처럼 일합니다", en: "We work like a film production company", ja: "映画の制作会社のように働きます" },
  filmBody: {
    ko: "영화 제작사는 모든 배우와 스태프를 정직원으로 두지 않습니다. 작품마다 감독과 배우, VFX를 꾸리지만 영화는 제작사의 이름으로 나갑니다. 앵커드도 게임마다 팀을 꾸리고, 결과는 앵커드가 책임집니다.",
    en: "A production company doesn't keep every actor and crew member on staff. It assembles a director, cast and VFX for each film — and the film still carries its name. Anchored assembles a team for each game and answers for the result.",
    ja: "映画の制作会社は、すべての俳優やスタッフを社員として抱えてはいません。作品ごとに監督やキャスト、VFX を編成しても、映画は制作会社の名前で世に出ます。Anchored もゲームごとにチームを編成し、結果に責任を持ちます。",
  },
  org: [
    { ko: "앵커드", en: "Anchored", ja: "Anchored" },
    { ko: "게임 디렉터 · 프로듀서", en: "Game director · Producer", ja: "ゲームディレクター・プロデューサー" },
    { ko: "로블록스 네이티브 크리에이터", en: "Roblox-native creators", ja: "Roblox ネイティブなクリエイター" },
  ] as LText[],
  orgCrew: [
    { ko: "AI", en: "AI", ja: "AI" },
    { ko: "개발", en: "Developers", ja: "開発" },
    { ko: "아트", en: "Artists", ja: "アート" },
    { ko: "UI", en: "UI", ja: "UI" },
    { ko: "VFX", en: "VFX", ja: "VFX" },
  ] as LText[],
  orgNote: { ko: "팀 구성은 게임마다 달라집니다", en: "The team changes with every game", ja: "チーム編成はゲームごとに変わります" },

  optionsLabel: { ko: "포지셔닝", en: "Positioning", ja: "ポジショニング" },
  optionsTitle: { ko: "다섯 번째 선택지", en: "The fifth option", ja: "5つ目の選択肢" },
  optionsBody: { ko: "로블록스 게임을 만들고 싶은 고객 앞에는 이런 선택지가 있습니다.", en: "If you want a Roblox game made, these are your options.", ja: "Roblox のゲームをつくりたいとき、選択肢はこうなります。" },
  options: [
    { who: { ko: "전통 에이전시", en: "Traditional agency", ja: "従来の代理店" }, says: { ko: "“로블록스 캠페인 만들어드릴게요.”", en: "“We'll make you a Roblox campaign.”", ja: "「Roblox キャンペーンをつくります。」" } },
    { who: { ko: "로블록스 스튜디오", en: "Roblox studio", ja: "Roblox スタジオ" }, says: { ko: "“게임 만들어드릴게요.”", en: "“We'll build you a game.”", ja: "「ゲームをつくります。」" } },
    { who: { ko: "크리에이터", en: "Creator", ja: "クリエイター" }, says: { ko: "“제가 만들어드릴게요.”", en: "“I'll build it for you.”", ja: "「僕がつくります。」" } },
    { who: { ko: "AI", en: "AI", ja: "AI" }, says: { ko: "“직접 만드세요.”", en: "“Build it yourself.”", ja: "「自分でつくってください。」" } },
    { who: { ko: "앵커드", en: "Anchored", ja: "Anchored" }, says: { ko: "무엇을 만들지 정하고, 가장 맞는 팀을 꾸리고, 만들고, 출시하고, 성과가 날 때까지 운영합니다.", en: "We decide what to build, assemble the best team, build it, launch it, and run it until it works.", ja: "何をつくるかを決め、最適なチームを編成し、つくり、ローンチし、成果が出るまで運営します。" } },
  ],

  recordLabel: { ko: "기록", en: "Track record", ja: "記録" },
  recordTitle: { ko: "프로젝트를 할수록 판단이 정확해집니다", en: "Every project sharpens our judgment", ja: "プロジェクトを重ねるほど、判断は正確になります" },
  recordBody: {
    ko: "누가 어떤 장르에 강한지, 일정과 소통은 어땠는지, AI를 얼마나 잘 쓰는지. 프로젝트마다 기록이 쌓이고, 쌓일수록 어떤 조합의 성공 확률이 높은지 알게 됩니다.",
    en: "Who's strong in which genre, how they handled deadlines and communication, how well they use AI — every project adds to the record, and the record shows which team gives a project its best odds.",
    ja: "誰がどのジャンルに強いか、スケジュールやコミュニケーションはどうだったか、AI をどれだけ使いこなすか。プロジェクトごとに記録が積み重なり、どの組み合わせが成功しやすいかが見えてきます。",
  },
  record: [
    { head: { ko: "기록", en: "Record", ja: "記録" }, text: { ko: "장르 강점 · 일정 신뢰도 · 소통 · AI 활용", en: "Genre strengths · deadline reliability · communication · AI use", ja: "ジャンルの強み・納期の信頼性・コミュニケーション・AI 活用" } },
    { head: { ko: "판단", en: "Judge", ja: "判断" }, text: { ko: "이 프로젝트에는 이 조합", en: "This project, this team", ja: "このプロジェクトには、この組み合わせ" } },
    { head: { ko: "제안", en: "Propose", ja: "提案" }, text: { ko: "Brief → 컨셉 · 예산 · 팀 · 일정 · 벤치마크", en: "Brief → concept · budget · team · timeline · benchmarks", ja: "Brief → コンセプト・予算・チーム・スケジュール・ベンチマーク" } },
  ] as { head: LText; text: LText }[],
};

/* ── Home feed (Studio updates) ── */
export type FeedMedia =
  | { kind: "image"; src: string; caption: string }
  | { kind: "icons"; slugs: string[] }
  | { kind: "poster"; slug: string }
  | { kind: "brand" }
  | { kind: "words" }
  | { kind: "cta" }
  | { kind: "checklist" }
  | { kind: "shift" }
  | { kind: "lifecycle" }
  | { kind: "org" }
  | { kind: "options" }
  | { kind: "record" };

export interface FeedItem {
  label: LText | string;
  title: LText;
  body?: LText;
  media?: FeedMedia;
  href: string;
}

export const feed: FeedItem[] = [
  {
    label: { ko: "메시지", en: "Message", ja: "メッセージ" },
    title: { ko: "로블록스 프로젝트, 앵커드가 책임집니다", en: "We take responsibility for Roblox production", ja: "Roblox プロジェクトは、Anchored が責任を持ちます" },
    body: {
      ko: "무엇을 만들지 정하고, 가장 맞는 팀을 꾸리고, 만들고, 출시하고, 성과가 날 때까지 운영합니다. 프로젝트의 단일 책임자는 앵커드이고, 사람이 바뀌어도 프로젝트는 계속됩니다.",
      en: "We decide what to build, assemble the best team, build it, launch it and run it until it works. Anchored is the single accountable party — people may change, the project carries on.",
      ja: "何をつくるかを決め、最適なチームを編成し、つくり、ローンチし、成果が出るまで運営します。プロジェクトの単一責任者は Anchored。人が入れ替わっても、プロジェクトは続きます。",
    },
    media: { kind: "words" },
    href: "/about",
  },
  {
    label: strategy.questionsLabel,
    title: strategy.questionsTitle,
    body: strategy.questionsLead,
    media: { kind: "checklist" },
    href: "/about#how",
  },
  {
    label: { ko: "제작 중", en: "In production", ja: "制作中" },
    title: { ko: "앵커드가 책임지는 세 프로젝트가 제작 중입니다", en: "Three Anchored productions are underway", ja: "Anchored が責任を持つ3つのプロジェクトが制作中です" },
    body: { ko: "GOKUI · Swarmrot · Telum. 프로젝트마다 맞는 팀을 꾸리고, 앵커드 프로듀서가 끝까지 붙습니다.", en: "GOKUI · Swarmrot · Telum — each with a team assembled for it and an Anchored producer through to the end.", ja: "GOKUI · Swarmrot · Telum。プロジェクトごとにチームを編成し、Anchored のプロデューサーが最後まで伴走します。" },
    media: { kind: "icons", slugs: ["gokui", "swarmrot", "telum"] },
    href: "/all",
  },
  {
    label: strategy.shiftLabel,
    title: strategy.shiftTitle,
    body: strategy.shiftBody,
    media: { kind: "shift" },
    href: "/about#how",
  },
  {
    label: strategy.lifecycleLabel,
    title: strategy.lifecycleTitle,
    body: strategy.lifecycleBody,
    media: { kind: "lifecycle" },
    href: "/about#how",
  },
  {
    label: { ko: "운영 중", en: "Live", ja: "運営中" },
    title: { ko: "Speed Obby — 출시 후가 본편입니다", en: "Speed Obby — launch is where the work starts", ja: "Speed Obby — ローンチ後が本番です" },
    body: { ko: "기록으로 경쟁하는 타임어택 오비. 리텐션과 난이도를 데이터로 읽고, 이벤트와 시즌으로 계속 고칩니다.", en: "A record-chasing time-attack obby. We read retention and difficulty in the data and keep improving it with events and seasons.", ja: "記録で競うタイムアタックオビー。リテンションと難易度をデータで読み、イベントとシーズンで改善を続けています。" },
    media: { kind: "poster", slug: "speed-obby" },
    href: "/projects/speed-obby",
  },
  {
    label: strategy.optionsLabel,
    title: strategy.optionsTitle,
    body: strategy.optionsBody,
    media: { kind: "options" },
    href: "/about",
  },
  {
    label: strategy.filmLabel,
    title: strategy.filmTitle,
    body: strategy.filmBody,
    media: { kind: "org" },
    href: "/about",
  },
  {
    label: strategy.recordLabel,
    title: strategy.recordTitle,
    body: strategy.recordBody,
    media: { kind: "record" },
    href: "/about#how",
  },
  {
    label: "Production Sprint",
    title: { ko: "Brief를 주시면, 무엇을 어떻게 만들지 제안합니다", en: "Give us a brief. We'll tell you what to build and how.", ja: "ブリーフをいただければ、何をどうつくるかを提案します" },
    body: { ko: "컨셉, 예산, 팀, 일정, 벤치마크를 제안합니다. 본 제작으로 이어지면 스프린트 비용은 제작비에서 차감합니다.", en: "Concept, budget, team, timeline and benchmarks. If it proceeds to production, the sprint fee is credited.", ja: "コンセプト、予算、チーム、スケジュール、ベンチマークを提案します。本制作に進む場合、スプリント費用は制作費から差し引きます。" },
    media: { kind: "cta" },
    href: "mailto:contact@anchored.kr?subject=Production%20Sprint",
  },
  {
    label: "Anchored Guild",
    title: { ko: "인재 공급망이자 정보망", en: "Talent supply and intelligence network", ja: "人材の供給網であり、情報網" },
    body: { ko: "723명의 한국 로블록스 크리에이터 커뮤니티. 실제로 만드는 사람들을 시간을 두고 보고, 로블록스의 변화를 가장 먼저 듣습니다. 커뮤니티는 앵커드의 상품이 아니라 인프라입니다.", en: "Korea's Roblox creator community, 723 strong. We watch people actually build over time and hear about Roblox's shifts first. The community isn't our product — it's our infrastructure.", ja: "723人の韓国 Roblox クリエイターコミュニティ。実際につくる人を時間をかけて見ており、Roblox の変化をいち早く耳にします。コミュニティは Anchored の商品ではなく、インフラです。" },
    media: { kind: "image", ...captures.hall },
    href: "/projects/anchored-guild",
  },
  {
    label: { ko: "매월", en: "Monthly", ja: "毎月" },
    title: { ko: "매달, 크리에이터를 결과물로 봅니다", en: "Every month, we judge creators by what they ship", ja: "毎月、クリエイターを成果物で見ます" },
    body: { ko: "앵커드 길드 데모데이에서 크리에이터들이 지금 만드는 것을 발표합니다. 이력서가 아니라 결과물로 판단합니다.", en: "At Anchored Guild Demo Day, creators present what they're building now. We judge by the work, not the résumé.", ja: "Anchored Guild の Demo Day で、クリエイターがいまつくっているものを発表します。履歴書ではなく成果物で判断します。" },
    media: { kind: "image", ...captures.hall2 },
    href: "/projects/anchored-demo-day",
  },
  {
    label: { ko: "브랜드 & 커뮤니티", en: "Brand & community", ja: "ブランド & コミュニティ" },
    title: { ko: "브랜드가 내는 게임이 아니라, 커뮤니티가 가지고 노는 캠페인", en: "Not a game a brand releases — a campaign the community plays with", ja: "ブランドが出すゲームではなく、コミュニティが遊び倒すキャンペーン" },
    body: { ko: "크리에이터 콘텐츠, 인게임 이벤트, 길드 활성화, 성과 리포트까지. 로블록스 안에서 플레이되는 브랜드 경험을 설계합니다.", en: "Creator content, in-game events, guild activation and results reporting — brand experiences designed to be played inside Roblox.", ja: "クリエイターコンテンツ、ゲーム内イベント、ギルド活性化、成果レポートまで。Roblox の中でプレイされるブランド体験を設計します。" },
    media: { kind: "poster", slug: "brand-campaigns" },
    href: "/projects/brand-campaigns",
  },
  {
    label: { ko: "성장 지수", en: "Growth Index", ja: "Growth Index" },
    title: { ko: "누가 잘하는지 판별하는 기준", en: "A standard for telling who's actually good", ja: "誰が優れているかを見極める基準" },
    body: { ko: "CODE · BUILD · SYSTEM · TEAM · PLATFORM. 사람을 아는 것보다, 누가 무엇을 잘하는지 판별하는 기준이 중요합니다.", en: "CODE · BUILD · SYSTEM · TEAM · PLATFORM — knowing people matters less than knowing who's good at what.", ja: "CODE · BUILD · SYSTEM · TEAM · PLATFORM。人を知っていることより、誰が何に強いかを見極める基準が大切です。" },
    media: { kind: "poster", slug: "creator-growth-index" },
    href: "/projects/creator-growth-index",
  },
];

/* ── About (2026-10-10 review): Identity → What we make → Community → How we work → Start.
   Projects live in the sidebar, /all and /projects/*, so About doesn't repeat them; they are simply
   "Anchored's projects" (no separate "Fleet" label). Contact sits at the bottom. ── */
export interface Photo {
  src: string;
  caption: string;
}
/**
 * Real photos for /about. Drop files into public/about/ and list them here
 * (e.g. { src: "/about/meetup-2025.jpg", caption: "Korea Roblox Developer Meetup 2025" }).
 * Until then the Anchored Guild captures stand in.
 *  - hero: a group photo from an Anchored developer meetup or Demo Day (wide, 16:9)
 *  - community: 3–5 event photos (Demo Day talks, meetup, school)
 *  - work: 1–2 process shots (Roblox Studio, playtest, a slice of the project dashboard)
 */
export const aboutPhotos: { hero: Photo[]; community: Photo[]; work: Photo[] } = {
  hero: [],
  community: [],
  work: [],
};

const capItems = [
  [
    { ko: "IP·콘텐츠의 로블록스 게임화", en: "IP-to-Roblox adaptation", ja: "IP・コンテンツの Roblox ゲーム化" },
    { ko: "오리지널 IP 개발", en: "Original IP development", ja: "オリジナル IP 開発" },
    { ko: "게임 기획·코어 루프 설계", en: "Game design & core loops", ja: "ゲーム企画・コアループ設計" },
    { ko: "Luau 개발", en: "Luau development", ja: "Luau 開発" },
    { ko: "빌드·환경 아트", en: "Building & environment art", ja: "ビルド・環境アート" },
    { ko: "팀 매칭·프로듀싱", en: "Team matching & producing", ja: "チーム編成・プロデュース" },
  ],
  [
    { ko: "인게임 애널리틱스", en: "In-game analytics", ja: "ゲーム内アナリティクス" },
    { ko: "리텐션·난이도 튜닝", en: "Retention & difficulty tuning", ja: "リテンション・難易度調整" },
    { ko: "시즌·이벤트 운영", en: "Seasons & events", ja: "シーズン・イベント運営" },
    { ko: "리더보드 시즌", en: "Leaderboard seasons", ja: "リーダーボードシーズン" },
    { ko: "커뮤니티 테스트", en: "Community playtests", ja: "コミュニティテスト" },
    { ko: "월간 리뷰", en: "Monthly reviews", ja: "月次レビュー" },
  ],
  [
    { ko: "로블록스 브랜드 경험", en: "Brand experiences in Roblox", ja: "Roblox ブランド体験" },
    { ko: "크리에이터 콘텐츠", en: "Creator content", ja: "クリエイターコンテンツ" },
    { ko: "인게임 이벤트", en: "In-game events", ja: "ゲーム内イベント" },
    { ko: "길드 활성화", en: "Guild activation", ja: "ギルド活性化" },
    { ko: "성과 리포트", en: "Results reporting", ja: "成果レポート" },
  ],
] as LText[][];

export const about4 = {
  /* 01 identity */
  identityLabel: "About Anchored",
  headline: { ko: "우리는 로블록스 안에서 자란 사람들과 만듭니다.", en: "We build with people native to Roblox.", ja: "私たちは、Roblox の中で育った人たちとつくります。" },
  identity: [
    { ko: "앵커드는 서울을 기반으로 활동하는 로블록스 네이티브 프로덕션 컴퍼니입니다.", en: "Anchored is a Roblox-native production company based in Seoul.", ja: "Anchored は、ソウルを拠点に活動する Roblox ネイティブなプロダクションカンパニーです。" },
    { ko: "우리는 로블록스 생태계에서 실력을 쌓아온 크리에이터를 발견하고, 프로젝트에 가장 적합한 팀을 구성합니다.", en: "We discover creators who built their skills inside the Roblox ecosystem and assemble the team that fits each project best.", ja: "Roblox のエコシステムで実力を積んできたクリエイターを見つけ、プロジェクトに最も合うチームを編成します。" },
    { ko: "게임과 IP에 대한 이해부터 개발, 출시, 운영까지. 서로 다른 재능을 하나의 팀으로 연결하고, 좋은 아이디어가 실제로 플레이되는 경험이 되도록 끝까지 책임집니다.", en: "From understanding the game and the IP to development, launch and live operations — we connect different talents into one team and stay responsible until a good idea becomes something people actually play.", ja: "ゲームと IP の理解から、開発、ローンチ、運営まで。異なる才能をひとつのチームにつなぎ、良いアイデアが実際にプレイされる体験になるまで、最後まで責任を持ちます。" },
  ] as LText[],
  figuresLabel: { ko: "우리가 쌓아온 것", en: "What we've built", ja: "積み上げてきたもの" },
  figures: [
    { value: "723", name: "Guild Creators", sub: { ko: "함께 교류하는 크리에이터", en: "creators we know and work with", ja: "交流しているクリエイター" } },
    { value: "4", name: "Projects", sub: { ko: "운영 및 제작 중인 앵커드 프로젝트", en: "Anchored projects live or in production", ja: "運営中・制作中の Anchored プロジェクト" } },
    { value: { ko: "매월", en: "Monthly", ja: "毎月" }, name: "Demo Day", sub: { ko: "작품과 피드백이 만나는 자리", en: "where work meets feedback", ja: "作品とフィードバックが出会う場" } },
    { value: "End-to-end", name: "Production", sub: { ko: "기획부터 출시와 운영까지", en: "from concept to launch and LiveOps", ja: "企画からローンチ、運営まで" } },
  ] as { value: LText; name: string; sub: LText }[],

  /* 02 what we make */
  makeLabel: { ko: "우리가 만드는 것", en: "What we make", ja: "私たちがつくるもの" },
  makeTitle: { ko: "게임을 만들고, 플레이어를 연결하고, 세계를 키웁니다.", en: "We make games, connect players and grow worlds.", ja: "ゲームをつくり、プレイヤーをつなぎ、世界を育てます。" },
  services: [
    { title: "Original Games & IP", line: { ko: "새로운 게임과 세계관을 만듭니다.", en: "We create new games and worlds.", ja: "新しいゲームと世界観をつくります。" }, desc: { ko: "오리지널 게임부터 기존 IP의 로블록스 게임화까지. 플랫폼의 플레이 문화와 IP의 매력을 함께 이해하는 팀을 구성합니다.", en: "From original games to bringing existing IP to Roblox — with a team that understands both the platform's play culture and what makes the IP special.", ja: "オリジナルゲームから既存 IP の Roblox ゲーム化まで。プラットフォームのプレイ文化と IP の魅力を共に理解するチームを編成します。" }, tags: capItems[0] },
    { title: "LiveOps & Growth", line: { ko: "출시는 시작일 뿐입니다.", en: "Launch is only the beginning.", ja: "ローンチは始まりにすぎません。" }, desc: { ko: "실제 플레이 데이터와 커뮤니티 피드백을 바탕으로 게임을 개선하고, 업데이트와 이벤트를 통해 지속적인 성장을 만듭니다.", en: "We improve games from real play data and community feedback, and keep them growing through updates and events.", ja: "実際のプレイデータとコミュニティのフィードバックをもとにゲームを改善し、アップデートとイベントで継続的な成長をつくります。" }, tags: capItems[1] },
    { title: "Brands & Experiences", line: { ko: "브랜드를 플레이할 수 있는 경험으로 만듭니다.", en: "We turn brands into experiences people play.", ja: "ブランドをプレイできる体験にします。" }, desc: { ko: "게임, 크리에이터, 커뮤니티를 연결해 플레이어가 스스로 참여하고 공유하고 싶어지는 브랜드 경험을 설계합니다.", en: "We connect games, creators and community to design brand experiences players want to join and share on their own.", ja: "ゲーム、クリエイター、コミュニティをつなぎ、プレイヤーが自ら参加し、共有したくなるブランド体験を設計します。" }, tags: capItems[2] },
  ],

  /* 04 community */
  communityLabel: { ko: "커뮤니티", en: "Our community", ja: "コミュニティ" },
  communityTitle: { ko: "크리에이터가 모이고, 성장하고, 함께 만드는 곳", en: "Where creators gather, grow and build together", ja: "クリエイターが集まり、成長し、共につくる場所" },
  communityLead: { ko: "데모데이, 개발자 밋업, 앵커드 스쿨은 부대 행사가 아닙니다. 앵커드가 좋은 크리에이터를 계속 발견하고 성장시키는 기반입니다.", en: "Demo Day, the developer meetup and Anchored School aren't side events — they're how Anchored keeps discovering and growing good creators.", ja: "Demo Day、開発者ミートアップ、Anchored School は付随イベントではありません。Anchored が優れたクリエイターを見つけ、育て続けるための基盤です。" },
  community: [
    { name: "Anchored Guild", status: "live" as const, meta: { ko: "723명 · Discord", en: "723 members · Discord", ja: "723人 · Discord" }, desc: { ko: "한국 로블록스 크리에이터들이 모이고, 배우고, 협업하는 커뮤니티.", en: "Where Korea's Roblox creators gather, learn and collaborate.", ja: "韓国の Roblox クリエイターが集まり、学び、協力するコミュニティ。" }, href: "/projects/anchored-guild" },
    { name: "Demo Day", status: "live" as const, meta: { ko: "매월", en: "Monthly", ja: "毎月" }, desc: { ko: "개발 중인 프로젝트를 발표하고 피드백을 받는 월간 쇼케이스.", en: "A monthly showcase for work in progress and feedback.", ja: "開発中のプロジェクトを発表し、フィードバックを受ける月例ショーケース。" }, href: "/projects/anchored-demo-day" },
    { name: "Dev Meetup", status: "upcoming" as const, meta: { ko: "2026", en: "2026", ja: "2026" }, desc: { ko: "크리에이터·스튜디오·플랫폼·파트너를 잇는 오프라인 밋업.", en: "An offline meetup connecting creators, studios, platforms and partners.", ja: "クリエイター・スタジオ・プラットフォーム・パートナーをつなぐオフラインミートアップ。" }, href: "/projects/korea-roblox-developer-meetup-2026" },
    { name: "Anchored School", status: "upcoming" as const, meta: { ko: "Winter 2026", en: "Winter 2026", ja: "Winter 2026" }, desc: { ko: "신진 크리에이터를 ‘끝까지 출시하는 실력’으로 키우는 인큐베이션 프로그램.", en: "An incubation program growing new creators into people who ship.", ja: "新人クリエイターを「最後までリリースする力」へ育てるインキュベーションプログラム。" }, href: "/projects/winter-roblox-camp-2026" },
  ],
  communityProjects: { ko: "길드와 데모데이에서 만난 크리에이터들이 앵커드의 프로젝트를 함께 만듭니다.", en: "Creators we meet in the Guild and at Demo Day build Anchored's projects with us.", ja: "ギルドと Demo Day で出会ったクリエイターが、Anchored のプロジェクトを共につくります。" },
  projectsLink: { ko: "앵커드의 프로젝트 보기", en: "See Anchored's projects", ja: "Anchored のプロジェクトを見る" },
  creatorsLabel: { ko: "크리에이터라면", en: "For creators", ja: "クリエイターの方へ" },
  creators: [
    { label: { ko: "앵커드 길드 참여하기", en: "Join the Anchored Guild", ja: "Anchored Guild に参加する" }, href: "https://discord.gg/anchored" },
    { label: { ko: "데모데이에서 발표하기", en: "Present at Demo Day", ja: "Demo Day で発表する" }, href: "https://discord.gg/anchored" },
    { label: { ko: "프로젝트 합류 문의", en: "Ask about joining a project", ja: "プロジェクトへの参加を相談する" }, href: "mailto:contact@anchored.kr?subject=Join%20a%20project" },
  ],

  /* 05 how we work */
  howLabel: { ko: "제작 방식", en: "How we work", ja: "制作の進め方" },
  howTitle: { ko: "발굴부터 운영까지. 하나의 책임 아래.", en: "From discovery to operation — under one responsibility.", ja: "発掘から運営まで。ひとつの責任のもとで。" },
  way: "THE ANCHORED WAY",
  wayLine: { ko: "좋은 게임은 좋은 팀에서 시작됩니다.", en: "Good games start with good teams.", ja: "良いゲームは良いチームから始まります。" },
  steps: [
    { en: "Find", head: { ko: "우리가 함께할 사람을 직접 발견합니다.", en: "We find the people ourselves.", ja: "共に働く人を自ら見つけます。" }, desc: { ko: "길드와 데모데이에서 크리에이터의 작품과 활동을 지속적으로 살펴봅니다.", en: "In the Guild and at Demo Day, we keep watching creators' work and activity.", ja: "ギルドと Demo Day で、クリエイターの作品と活動を継続的に見ています。" } },
    { en: "Validate", head: { ko: "포트폴리오보다 실제 제작 역량을 봅니다.", en: "We look past the portfolio to real production ability.", ja: "ポートフォリオより実際の制作力を見ます。" }, desc: { ko: "개발 능력, 출시 경험, 협업 역량과 플랫폼 이해도를 함께 평가합니다.", en: "We assess development skill, shipping experience, collaboration and platform understanding together.", ja: "開発力、リリース経験、協働する力、プラットフォームへの理解を合わせて評価します。" } },
    { en: "Assemble", head: { ko: "게임에 맞는 팀을 만듭니다.", en: "We build the team the game needs.", ja: "ゲームに合うチームをつくります。" }, desc: { ko: "정해진 인력에 프로젝트를 끼워 맞추지 않고, 목표에 맞게 팀을 구성합니다.", en: "We don't force a project onto a fixed roster — we compose the team around its goals.", ja: "決まった人員にプロジェクトを当てはめず、目標に合わせてチームを編成します。" } },
    { en: "Produce", head: { ko: "완성을 책임집니다.", en: "We own the finish.", ja: "完成に責任を持ちます。" }, desc: { ko: "앵커드가 단일 제작 책임자로서 일정, 품질, 커뮤니케이션을 관리합니다.", en: "As the single accountable producer, Anchored manages schedule, quality and communication.", ja: "Anchored が単一の制作責任者として、スケジュール、品質、コミュニケーションを管理します。" } },
    { en: "Operate", head: { ko: "출시 이후에도 계속 개선합니다.", en: "We keep improving after launch.", ja: "ローンチ後も改善を続けます。" }, desc: { ko: "데이터와 플레이어 반응을 기반으로 게임을 발전시킵니다.", en: "We develop the game from data and player response.", ja: "データとプレイヤーの反応をもとにゲームを発展させます。" } },
  ],
  giLabel: { ko: "성장 지수 5축 — 검증의 기준", en: "Growth Index — the five axes we validate on", ja: "Growth Index 5軸 — 検証の基準" },
  giAxes: [
    { k: "CODE", v: { ko: "Luau 코드의 품질과 구조", en: "Quality and structure of Luau code", ja: "Luau コードの品質と構造" } },
    { k: "BUILD", v: { ko: "맵·에셋·월드를 만드는 역량", en: "Building maps, assets and worlds", ja: "マップ・アセット・ワールドをつくる力" } },
    { k: "SYSTEM", v: { ko: "게임 루프·진행·경제 설계", en: "Designing loops, progression and economy", ja: "ゲームループ・進行・経済の設計" } },
    { k: "TEAM", v: { ko: "협업, 소통, 일정 관리", en: "Collaboration, communication, deadlines", ja: "協働・コミュニケーション・スケジュール管理" } },
    { k: "PLATFORM", v: { ko: "로블록스 플랫폼과 플레이어에 대한 이해", en: "Understanding the Roblox platform and its players", ja: "Roblox のプラットフォームとプレイヤーへの理解" } },
  ],
  closing: { ko: "프로젝트의 단일 책임자는 앵커드입니다. 사람이 바뀌어도 프로젝트는 계속됩니다.", en: "Anchored is the single accountable party. People may change; the project carries on.", ja: "プロジェクトの単一責任者は Anchored です。人が入れ替わっても、プロジェクトは続きます。" },

  /* 06 start */
  startLabel: { ko: "프로젝트 시작", en: "Start a project", ja: "プロジェクトを始める" },
  startTitle: { ko: "다음 세계를 함께 만듭시다.", en: "Let's build the next world together.", ja: "次の世界を一緒につくりましょう。" },
  flow: [
    { ko: "문의", en: "Inquiry", ja: "お問い合わせ" },
    { ko: "첫 미팅", en: "First meeting", ja: "初回ミーティング" },
    { ko: "Production Sprint", en: "Production Sprint", ja: "Production Sprint" },
    { ko: "본 제작", en: "Production", ja: "本制作" },
  ] as LText[],
  deliverablesLabel: { ko: "Production Sprint에서 받는 것", en: "What the Production Sprint delivers", ja: "Production Sprint で受け取るもの" },
  deliverables: [
    { ko: "게임 컨셉", en: "Game concept", ja: "ゲームコンセプト" },
    { ko: "예산 범위", en: "Budget range", ja: "予算レンジ" },
    { ko: "팀 구성", en: "Team", ja: "チーム編成" },
    { ko: "일정", en: "Timeline", ja: "スケジュール" },
    { ko: "벤치마크", en: "Benchmarks", ja: "ベンチマーク" },
    { ko: "라이브옵스 방향", en: "LiveOps direction", ja: "ライブオプスの方向性" },
  ] as LText[],
  startNote: sprint.note,
  contactLabel: { ko: "연락처", en: "Contact", ja: "お問い合わせ" },
  contact: [
    { label: { ko: "새 프로젝트", en: "New Business", ja: "新規のご相談" }, value: "contact@anchored.kr", href: "mailto:contact@anchored.kr?subject=Production%20Sprint" },
    { label: { ko: "크리에이터", en: "Creators", ja: "クリエイター" }, value: "Anchored Guild (Discord)", href: "https://discord.gg/anchored" },
    { label: { ko: "소셜", en: "Social", ja: "ソーシャル" }, value: "X / GitHub", links: [{ label: "X", href: "https://x.com/anchored_kr" }, { label: "GitHub", href: "https://github.com/anchored-kr" }] },
    { label: { ko: "위치", en: "Location", ja: "所在地" }, value: { ko: "서울", en: "Seoul, Korea", ja: "ソウル" } },
  ],
};
