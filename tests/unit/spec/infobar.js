/* For reference read the Jasmine and Sinon docs
 * Jasmine docs: http://pivotal.github.io/jasmine/
 * Sinon docs: http://sinonjs.org/docs/
 */

/* global describe, beforeEach, afterEach, it, expect, sinon, spyOn */

describe('infobar.js', function() {

    'use strict';

    describe("infobar.update", function () {

        var setup = function (ua, buildID) {
            // Test a case where the latest version is a non-dot release
            var result1 = infoBar.updateBar('35.0', ua, buildID);

            // Cleanup
            $('#mozilla-infobar').remove();

            // Test a case where the latest version is a dot release
            var result2 = infoBar.updateBar('35.0.1', ua, buildID);

            // Cleanup
            $('#mozilla-infobar').remove();

            return result1 && result2;
        }

        it('should return false if the user agent is not Firefox', function () {
            expect(setup('Mozilla/5.0 (compatible; MSIE 9.0; Windows NT 6.1; Trident/5.0)')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10.4; en; rv:1.9.2.24) Gecko/20111114 Camino/2.1 (like Firefox/3.6.24)')).toBeFalsy();
            expect(setup('Mozilla/5.0 (X11; Linux i686; rv:10.0.1) Gecko/20100101 Firefox/10.0.1 SeaMonkey/2.7.1')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Windows NT 5.1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.16 Safari/537.36')).toBeFalsy();
        });

        it('should return false if the user agent is a latest Firefox version', function () {
            expect(setup('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:39.0) Gecko/20100101 Firefox/39.0')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:36.0) Gecko/20100101 Firefox/36.0')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Macintosh; Intel Mac OS X 10.8; rv:34.0) Gecko/20100101 Firefox/34.0')).toBeFalsy();
        });

        it('should return false if the user agent is Firefox for mobile', function () {
            // Nokia N900 Linux mobile, on the Fennec browser
            expect(setup('Mozilla/5.0 (Maemo; Linux armv7l; rv:10.0) Gecko/20100101 Firefox/10.0 Fennec/10.0')).toBeFalsy();
            // Android phone and tablet
            expect(setup('Mozilla/5.0 (Android; Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Android; Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
            // Firefox OS phone and tablet
            expect(setup('Mozilla/5.0 (Mobile; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
            expect(setup('Mozilla/5.0 (Tablet; rv:26.0) Gecko/26.0 Firefox/26.0')).toBeFalsy();
        });

        it('should return false if the user agent is Firefox ESR', function () {
            // Firefox 31 ESR
            expect(setup('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:31.0) Gecko/20100101 Firefox/31.0', '20140717132905')).toBeFalsy();
            // Firefox 31.4.0 ESR
            expect(setup('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:31.0) Gecko/20100101 Firefox/31.0', '20150105205548')).toBeFalsy();
        });

        it('should return true if the user agent is an outdated Firefox version', function () {
            expect(setup('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:22.0) Gecko/20100101 Firefox/22.0')).toBeTruthy();
            expect(setup('Mozilla/5.0 (Windows NT 6.2; WOW64; rv:16.0.1) Gecko/20121011 Firefox/16.0.1')).toBeTruthy();
            expect(setup('Mozilla/5.0 (X11; U; Linux x86_64; en-US; rv:1.9.2.9) Gecko/20100915 Gentoo Firefox/3.6.9')).toBeTruthy();
            // Firefox 31 non-ESR
            expect(setup('Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:31.0) Gecko/20100101 Firefox/31.0', '20140716183446')).toBeTruthy();
        });

    });
});
