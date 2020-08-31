// 환경설정 관련 helper

export function getPublicUrl(): string {
  //
  return process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';
}

export default {
  getPublicUrl,
};
