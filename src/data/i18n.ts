/** Anchored OS — i18n (ko / en / ja), static dictionaries. */

export type Lang = "ko" | "en" | "ja";

/** A localized string: either one string (same in all langs) or per-language. */
export type LText = string | Record<Lang, string>;

export const LANGS: { code: Lang; label: string }[] = [
  { code: "ko", label: "한국어" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
];

/** Resolve a localized value for the active language (falls back to Korean). */
export function t(v: LText | undefined, lang: Lang): string {
  if (v == null) return "";
  return typeof v === "string" ? v : v[lang] ?? v.ko;
}

/** Static UI strings (chrome, windows, buttons). */
export const ui: Record<string, Record<Lang, string>> = {
  agencyTag: { ko: "ROBLOX IP 에이전시", en: "ROBLOX IP AGENCY", ja: "ROBLOX IP エージェンシー" },
  navServices: { ko: "서비스", en: "Services", ja: "サービス" },
  navContact: { ko: "문의", en: "Contact", ja: "お問い合わせ" },

  start: { ko: "시작", en: "Start", ja: "スタート" },
  portfolio: { ko: "포트폴리오", en: "Portfolio", ja: "ポートフォリオ" },
  startAbout: { ko: "Anchored 소개", en: "About Anchored", ja: "Anchored について" },

  // About
  aboutTitle: { ko: "IP·콘텐츠를 Roblox 게임으로", en: "Turn IP & content into Roblox games", ja: "IP・コンテンツを Roblox ゲームに" },
  aboutLead: { ko: "We turn your IP & content into Roblox games.", en: "We turn your IP & content into Roblox games.", ja: "あなたの IP・コンテンツを Roblox ゲームにします。" },
  aboutP1: {
    ko: "앵커드는 IP·콘텐츠·브랜드를 Roblox에서 실제로 플레이되는 게임으로 만드는 에이전시입니다. 기획부터 개발, 출시, 라이브옵스까지 한 팀에서 책임집니다.",
    en: "Anchored is an agency that turns IP, content, and brands into games people actually play on Roblox — from concept to development, launch, and LiveOps, all in one team.",
    ja: "Anchored は IP・コンテンツ・ブランドを Roblox で実際にプレイされるゲームにするエージェンシーです。企画から開発、ローンチ、ライブオプスまで一つのチームで担います。",
  },
  aboutP2: {
    ko: "월 2억 명이 노는 Roblox는 더 이상 게임 플랫폼이 아니라 새로운 미디어입니다. 우리는 한국 UGC 크리에이터 씬에서 발굴한 팀과 함께, 당신의 IP가 이 미디어 위에서 살아 움직이게 합니다.",
    en: "With 200M+ monthly users, Roblox is no longer just a game platform — it's a new medium. With teams discovered in Korea's UGC creator scene, we bring your IP to life on it.",
    ja: "月間2億人以上が遊ぶ Roblox は、もはやゲームプラットフォームではなく新しいメディアです。韓国の UGC クリエイターシーンで見出したチームと共に、あなたの IP をこのメディアの上で生き生きと動かします。",
  },
  statProjects: { ko: "게임 프로젝트", en: "game projects", ja: "ゲームプロジェクト" },
  statUsers: { ko: "월 Roblox 유저", en: "monthly Roblox users", ja: "月間 Roblox ユーザー" },
  statFull: { ko: "기획→런칭→운영", en: "concept→launch→ops", ja: "企画→ローンチ→運用" },
  ctaServices: { ko: "서비스 보기 →", en: "View services →", ja: "サービスを見る →" },
  ctaPortfolio: { ko: "포트폴리오 열기", en: "Open portfolio", ja: "ポートフォリオを開く" },
  ctaContact: { ko: "문의하기", en: "Get in touch", ja: "お問い合わせ" },
  aboutHint: {
    ko: "💡 바탕화면의 아이콘을 클릭해 각 작업물을 열어보세요.",
    en: "💡 Click the desktop icons to open each piece of work.",
    ja: "💡 デスクトップのアイコンをクリックして各作品を開いてください。",
  },

  // Services
  svcKicker: { ko: "WHAT WE DO", en: "WHAT WE DO", ja: "WHAT WE DO" },
  svcTitle: { ko: "IP를 게임으로 만드는 네 가지 방법", en: "Four ways we turn IP into games", ja: "IP をゲームにする4つの方法" },
  ctaProjectInquiry: { ko: "프로젝트 문의 →", en: "Start a project →", ja: "プロジェクトの相談 →" },
  ctaAbout: { ko: "회사 소개", en: "About us", ja: "会社紹介" },

  // Contact
  contactKicker: { ko: "GET IN TOUCH", en: "GET IN TOUCH", ja: "GET IN TOUCH" },
  contactTitle: { ko: "당신의 IP를 게임으로.", en: "Bring your IP into games.", ja: "あなたの IP をゲームに。" },
  contactDesc: {
    ko: "IP·콘텐츠·브랜드의 Roblox 게임화, 크리에이터 협업, 파트너십 — 무엇이든 편하게 연락주세요.",
    en: "Roblox game adaptation of your IP, content, or brand; creator collaborations; partnerships — reach out about anything.",
    ja: "IP・コンテンツ・ブランドの Roblox ゲーム化、クリエイターとのコラボ、パートナーシップ — お気軽にご連絡ください。",
  },

  // Project window
  weDid: { ko: "우리가 한 일", en: "WHAT WE DID", ja: "私たちの仕事" },
  ctaCaseStudy: { ko: "전체 케이스 보기 →", en: "View full case study →", ja: "ケーススタディを見る →" },
};
