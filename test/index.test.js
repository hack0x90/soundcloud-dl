const chai = require('chai');
const rewire = require('rewire');

const TRACK_URL = 'https://soundcloud.com/rashidaliofficial/bhangra-loco';

chai.use(require('chai-string'));
const expect = chai.expect;

const app = rewire('../index.js');
const getWebPageSourceCode = app.__get__('getWebPageSourceCode');
const getTrackDownloadUrl = app.__get__('getTrackDownloadUrl');

describe('Can get SoundCloud Track page HTML', () => {
  let source = '';
  before((done) => {
    getWebPageSourceCode(TRACK_URL)
      .then(res => {
        source = res;
        done();
      })
  });
  it('should starts with <!DOCTYPE html>', () => {
    expect(source).to.startWith('<!DOCTYPE html>');
  });
  it('should container window.__sc_hydration object', () => {
    expect(source).to.contain('<script>window.__sc_hydration');
  });
});

describe('Can get SoundCloud Track Play URL', () => {
  let resultObj = {};
  before((done) => {
    getTrackDownloadUrl(TRACK_URL, process.env.SC_CLIENT_ID)
      .then((res) => {
        resultObj = JSON.parse(res);
        console.log(resultObj);
        done();
      })
  });

  it ('should contain url property', () => {
    expect(resultObj).have.property('url').to.be.a('string');
  });

  it('playlist URL should have .m3u8 extension', () => {
    expect(resultObj.url).to.contain('.m3u8');
  });
});