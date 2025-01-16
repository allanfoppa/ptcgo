
type TLogsPath = {
  DEBUG: string;
  UAT: string;
  PRODUCTION: string;
  COMBINED: string;
}

const basePath: string = 'src/common/logger/files';

export const LOGS_PATH: TLogsPath = {
  DEBUG: `${basePath}/debug.log`,
  UAT: `${basePath}/uat.log`,
  PRODUCTION: `${basePath}/production.log`,
  COMBINED: `${basePath}/combined.log`
};
