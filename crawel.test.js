const { normalizeUrl } =  require("./crawl");
const  { test,expect } = require("@jest/globals"); 

test("normalizeUrl", () => {
    const input = 'https://blog.boot.dev/path';
    const actual = normalizeUrl(input);
    const expected = 'blog.boot.dev/path';
    expect(actual).toEqual(expected);
});

test("normalizeUrl /", () =>{
    const input = "https://blog.boot.dev/path/";
    const actual = normalizeUrl(input);
    const expected = "blog.boot.dev/path";
    expect(actual).toEqual(expected);
})
test("normalizeUrl capital", () => {
  const input = "https://Blog.Boot.Dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});
test("normalizeUrl http", () => {
  const input = "http://Blog.Boot.Dev/path/";
  const actual = normalizeUrl(input);
  const expected = "blog.boot.dev/path";
  expect(actual).toEqual(expected);
});