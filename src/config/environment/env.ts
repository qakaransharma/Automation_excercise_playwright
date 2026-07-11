import {
    stageConfig,
    qaConfig,
  } from "./index";
  
  type Env = "qa" | "stage";
  
  const env = (process.env.ENV || "qa").toLowerCase() as Env; // qa
  
  const configMap = {
    qa: qaConfig,
    stage: stageConfig,
  };
  
  export const currentEnv = configMap[env] || qaConfig; // configMap[qa]
  
  