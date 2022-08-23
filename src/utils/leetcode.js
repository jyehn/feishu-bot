const axios = require("axios");
const config = require("../../config");
const queryConfig = require("./templates/leetcodeQuery");

//set cookie, csrftoken, origin
axios.defaults.headers["cookie"] = config.axios.cookies;
axios.defaults.headers["x-csrftoken"] = config.axios.csrfToken;
axios.defaults.headers["origin"] = "https://leetcode.cn";

const nojGoUrl = "https://leetcode.cn/graphql/noj-go/";
const graphqlQlUrl = "https://leetcode.cn/graphql/";

const leetcode = {
  getQuestionOfToday: async () => {
    let res = await axios.post("https://leetcode.cn/graphql/", {
      query: queryConfig.questionOfToday,
    });
    return res.data.data;
  },
  getRandomQuestion: async difficulty => {
    const randomSkip = Math.floor(Math.random() * 500);

    const variables = {
      categorySlug: "algorithms",
      skip: randomSkip,
      limit: 1,
    };

    if (difficulty) {
      variables.filters.difficulty = difficulty;
    }
    try {
      let res = await axios.post("https://leetcode.cn/graphql/", {
        query: queryConfig.randomQuestion,
        variables,
      });
      return res.data.data.problemsetQuestionList.questions[0];
    } catch (error) {
      console.log(`error:`, error);
    }
  },
  getQuestionDetail: async titleSlug => {
    let res = await axios.post("https://leetcode.cn/graphql/", {
      operationName: "questionData",
      query: queryConfig.questionDetail,
      variables: {
        titleSlug,
      },
    });
    return res.data.data.question;
  },
  submit: async ({ questionSlug, lang, question_id, typed_code }) => {
    const url = `https://leetcode.cn/problems/${questionSlug}/submit/`;
    try {
      const res = await axios.post(url, {
        lang,
        question_id,
        typed_code,
      });
      return res.data.submission_id;
    } catch (error) {
      return error;
    }
  },
  checkSubmission: async submission_id => {
    const url = `https://leetcode.cn/submissions/detail/${submission_id}/check/`;
    const res = await axios.get(url);
    return res.data;
  },
  getRecentAcSubmissions: async userSlug => {
    const url = nojGoUrl;
    try {
      const res = await axios.post(url, {
        query: queryConfig.recentAcSubmissions,
        variables: {
          userSlug: "xcjm",
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getSubmissions: async (lastKey, limit, offset, questionSlug) => {
    const url = graphqlQlUrl;
    try {
      const res = await axios.post(url, {
        operationName: "submissions",
        query: queryConfig.submissions,
        variables: {
          lastKey,
          limit,
          offset,
          questionSlug,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
  getmySubmissionDetail: async id => {
    const url = graphqlQlUrl;
    try {
      const res = await axios.post(url, {
        operationName: "mySubmissionDetail",
        query: queryConfig.mySubmissionDetail,
        variables: {
          id,
        },
      });
      return res.data;
    } catch (error) {
      return error;
    }
  },
};
module.exports = leetcode;
