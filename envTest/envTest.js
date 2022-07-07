const path = require("path");
// const debug = require("debug");
const dotenv = require("dotenv");
const dotenvExpand = require("dotenv-expand");
// cli-server 中调用loadEnv 两次。
// .env 全局默认配置文件，不论什么环境都会加载合并
// .env.dev 是dev环境的环境变量
// 在源码中会先进行判断mode是否存在。存在的话，先进行设置mode所对应的环境变量，然后在调用全局默认的配置文件
// 又因为dotenv 默认情况下，永远不会修改任何已经设置的环境变量。特别是，如果您的.env文件中有一个变量与您的环境中已经存在的变量发生冲突，那么该变量将被跳过。
// 所以设置了mode所对应的环境变量之后，在调用loadEnv()也不会更改相同设置的环境变量。
// 这也是为什么调用全局的环境变量不会替换mode所对应的环境变量的原因
function run(name, args = {}) {
  const mode = args.mode;
  console.log(mode, "===");
  if (mode) {
    // loadEnv();
    loadEnv(mode);
  }
  // load base .env
  setTimeout(() => {
    // loadEnv(mode);
    loadEnv();
  }, 10000);
}
function loadEnv(mode) {
  //   const logger = debug("vue:env");
  const basePath = path.resolve("./", `.env${mode ? `.${mode}` : ``}`);
  //   const localPath = `${basePath}.local`;
  //   console.log(basePath, "1111");
  const load = (envPath) => {
    try {
      const env = dotenv.config({ path: envPath, debug: process.env.DEBUG });
      dotenvExpand(env);
      //   console.log(env, envPath, dotenvExpand(env), "333");
      console.log(process.env);
      //   logger(envPath, env);
    } catch (err) {
      // only ignore error if file is not found
      if (err.toString().indexOf("ENOENT") < 0) {
        // error(err);
        // console.log(err, "err");
      }
    }
  };

  //   load(localPath);
  load(basePath);
}
module.exports = run;
