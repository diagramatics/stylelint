import testRule from "../../../testUtils/testRule"

import rule, { ruleName, messages } from ".."

testRule(rule, {
  ruleName,
  config: [undefined],

  accept: [ {
    code: "a { color: pink; }",
  }, {
    code: "a { color: pink; background: orange; }",
  }, {
    code: "a { color: pink; { &:hover { color: orange; } } }",
    description: "spec nested",
  }, {
    code: "a { color: pink; @media { color: orange; } }",
    description: "nested",
  }, {
    code: "a { color: pink; @media { color: orange; &::before { color: black; } } }",
    description: "double nested",
  }, {
    code: "a { $scss: 0; $scss: $scss + 1; }",
  }, {
    code: "a { @less: 0; @less: @less + 1; }",
  }, {
    code: "a { --custom-property: 0; --custom-property: 1; }",
  }, {
    code: "@fontface { src: url(font.eof); src: url(font.woff) }",
  } ],

  reject: [ {
    code: "a { color: pink; color: orange }",
    message: messages.rejected("color"),
  }, {
    code: "a { color: pink; background: orange; color: orange }",
    message: messages.rejected("color"),
  }, {
    code: "a { color: pink; background: orange; background: pink; }",
    message: messages.rejected("background"),
  }, {
    code: "a { color: pink; { &:hover { color: orange; color: black; } } }",
    description: "spec nested",
    message: messages.rejected("color"),
  }, {
    code: "a { color: pink; @media { color: orange; color: black; } }",
    description: "nested",
    message: messages.rejected("color"),
  }, {
    code: "@media { color: orange; .foo { color: black; color: white; } }",
    description: "nested",
    message: messages.rejected("color"),
  }, {
    code: "a { color: pink; @media { color: orange; &::before { color: black; color: white; } } }",
    description: "double nested",
    message: messages.rejected("color"),
  }, {
    code: "a { color: pink; @media { color: orange; .foo { color: black; color: white; } } }",
    description: "double nested again",
    message: messages.rejected("color"),
  } ],
})

testRule(rule, {
  ruleName,
  config: [ true, { ignore: ["consecutive-duplicates"] } ],
  skipBasicChecks: true,

  accept: [ {
    code: "p { font-size: 16px; font-size: 1rem; }",
  }, {
    code: "p { display: inline-block; font-size: 16px; font-size: 1rem; }",
  }, {
    code: "p { font-size: 16px; font-size: 1rem; color: red; }",
  }, {
    code: "p { display: inline-block; font-size: 16px; font-size: 1rem; color: red; }",
  } ],

  reject: [ {
    code: "p { font-size: 16px; font-weight: 400; font-size: 1rem; }",
    message: messages.rejected("font-size"),
  }, {
    code: "p { display: inline-block; font-size: 16px; font-weight: 400; font-size: 1rem; }",
    message: messages.rejected("font-size"),
  }, {
    code: "p { font-size: 16px; font-weight: 400; font-size: 1rem; color: red; }",
    message: messages.rejected("font-size"),
  }, {
    code: "p { display: inline-block; font-size: 16px; font-weight: 400; font-size: 1rem; color: red; }",
    message: messages.rejected("font-size"),
  } ],
})
