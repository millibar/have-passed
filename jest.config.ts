// 設定の型定義をインポート
import type { JestConfigWithTsJest } from 'ts-jest';

// オプションを設定
const config: JestConfigWithTsJest = {
  // TypeScript 用プリセット
  preset: 'ts-jest',
  // テスト環境
  testEnvironment: 'jsdom',
  // カバレッジ（テストコードの網羅率）を収集
  collectCoverage: true,
  // コンソール上でのみカバレッジを報告
  coverageReporters: ['text'],
};

// 設定をデフォルトエクスポートする
export default config;
