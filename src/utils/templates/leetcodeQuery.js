// 配置项
const queryConfig = {
  questionOfToday: `
      query questionOfToday {
       todayRecord {
         date
         userStatus
         question {
           questionId
           frontendQuestionId: questionFrontendId
           difficulty
           title
           titleCn: translatedTitle
           translatedContent
           titleSlug
           paidOnly: isPaidOnly
           acRate
           likes
           status
           stats
           solutionNum
           topicTags {
             name
             nameTranslated: translatedName
             id
           }
         }
         lastSubmission {
           id
         }
       }
     }
     `,
  randomQuestion: `
    query problemsetQuestionList($categorySlug: String, $limit: Int, $skip: Int, $filters: QuestionListFilterInput) {
      problemsetQuestionList(
        categorySlug: $categorySlug
        limit: $limit
        skip: $skip
        filters: $filters
      ) {
        hasMore
        total
        questions {
          acRate
          difficulty
          freqBar
          frontendQuestionId
          isFavor
          paidOnly
          solutionNum
          status
          title
          titleCn
          titleSlug
          topicTags {
            name
            nameTranslated
            id
            slug
          }
          extra {
            hasVideoSolution
            topCompanyTags {
              imgUrl
              slug
              numSubscribed
            }
          }
        }
      }
    }
    `,
  questionDetail: `
    query questionData($titleSlug: String!) {
      question(titleSlug: $titleSlug) {
        questionId
        questionFrontendId
        categoryTitle
        boundTopicId
        title
        titleSlug
        content
        translatedTitle
        translatedContent
        isPaidOnly
        difficulty
        likes
        dislikes
        isLiked
        similarQuestions
        contributors {
          username
          profileUrl
          avatarUrl
          __typename
        }
        langToValidPlayground
        topicTags {
          name
          slug
          translatedName
          __typename
        }
        companyTagStats
        codeSnippets {
          lang
          langSlug
          code
          __typename
        }
        stats
        hints
        solution {
          id
          canSeeDetail
          __typename
        }
        status
        sampleTestCase
        metaData
        judgerAvailable
        judgeType
        mysqlSchemas
        enableRunCode
        envInfo
        book {
          id
          bookName
          pressName
          source
          shortDescription
          fullDescription
          bookImgUrl
          pressImgUrl
          productUrl
          __typename
        }
        isSubscribed
        isDailyQuestion
        dailyRecordStatus
        editorType
        ugcQuestionId
        style
        exampleTestcases
        jsonExampleTestcases
        __typename
      }
    }
    `,
  recentAcSubmissions: `
  query recentAcSubmissions($userSlug: String!) {
    recentACSubmissions(userSlug: $userSlug) { 
      submissionId
      submitTime
      question { 
        translatedTitle
        titleSlug
        questionFrontendId
      } 
    } 
  } 
  `,
  submissions: `
  query submissions($offset: Int!, $limit: Int!, $lastKey: String, $questionSlug: String!, $markedOnly: Boolean, $lang: String) {
    submissionList(offset: $offset, limit: $limit, lastKey: $lastKey, questionSlug: $questionSlug, markedOnly: $markedOnly, lang: $lang) {
      lastKey
      hasNext
      submissions {
        id
        statusDisplay
        lang
        runtime
        timestamp
        url
        isPending
        memory
        submissionComment {
          comment
          flagType
          __typename
        }
        __typename
      }
      __typename
    }
  }
  `,
  mySubmissionDetail: `
  query mySubmissionDetail($id: ID!) {
    submissionDetail(submissionId: $id) {
      id
      code
      runtime
      memory
      rawMemory
      statusDisplay
      timestamp
      lang
      isMine
      passedTestCaseCnt
      totalTestCaseCnt
      sourceUrl
      question {
        titleSlug
        title
        translatedTitle
        questionId
        __typename
      }
      ... on GeneralSubmissionNode {
        outputDetail {
          codeOutput
          expectedOutput
          input
          compileError
          runtimeError
          lastTestcase
          __typename
        }
        __typename
      }
      submissionComment {
        comment
        flagType
        __typename
      }
      __typename
    }
  }
  `,
  questionData: `query questionData($titleSlug: String!) {
    question(titleSlug: $titleSlug) {
      questionId
      questionFrontendId
      categoryTitle
      boundTopicId
      title
      titleSlug
      content
      translatedTitle
      translatedContent
      isPaidOnly
      difficulty
      likes
      dislikes
      isLiked
      similarQuestions
      contributors {
        username
        profileUrl
        avatarUrl
        __typename
      }
      langToValidPlayground
      topicTags {
        name
        slug
        translatedName
        __typename
      }
      companyTagStats
      codeSnippets {
        lang
        langSlug
        code
        __typename
      }
      stats
      hints
      solution {
        id
        canSeeDetail
        __typename
      }
      status
      sampleTestCase
      metaData
      judgerAvailable
      judgeType
      mysqlSchemas
      enableRunCode
      envInfo
      book {
        id
        bookName
        pressName
        source
        shortDescription
        fullDescription
        bookImgUrl
        pressImgUrl
        productUrl
        __typename
      }
      isSubscribed
      isDailyQuestion
      dailyRecordStatus
      editorType
      ugcQuestionId
      style
      exampleTestcases
      jsonExampleTestcases
      __typename
    }
  }
  `,
};

module.exports = queryConfig;
