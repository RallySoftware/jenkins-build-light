'use strict'

describe('JSON.parse', () => {
  it('parses json', () => {
    expect(JSON.parse("{\"foo\":\"bar\"}")).toEqual({"foo": "bar"});
  });
  it('failes on bad json', () => {
    expect(JSON.parse.bind("{\"foo\"")).toThrowError(SyntaxError);
  });
  it('doesn\'t fail on bad json when handled', () => {
    function handle() {
      let a = 0;
      try {
        JSON.parse("{\"foo\"");
      } catch(SyntaxError) {
        a = 1;
      }
      return a;
    };
    expect(handle).not.toThrowError(SyntaxError);
    expect(handle()).toEqual(1);
  });
});
