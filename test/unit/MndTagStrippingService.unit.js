describe("The MndTagStrippingService", function () {

	beforeEach(angular.mock.module("mnd.sprinkle"));

	it("should be defined by the mnd.sprinkle module", inject(function (MndTagStrippingService) {
		(MndTagStrippingService).should.not.equal(null);
		_.isFunction(MndTagStrippingService).should.equal(true);
	}));

	it("should return the stripped text from well formed html", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell</b><br />";
		var expectedText = "Hell";
		var actual = MndTagStrippingService(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from malformed html", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell";
		var expectedText = "Hell";
		var actual = MndTagStrippingService(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from html with entities", inject(function (MndTagStrippingService) {
		var htmlText = "<b>Hell&egrave;";
		var expectedText = "Hellè";
		var actual = MndTagStrippingService(htmlText);
		actual.should.equal(expectedText);
	}));

	it("should return the stripped text from html with plain text", inject(function (MndTagStrippingService) {
		var htmlText = "Hell";
		var expectedText = "Hell";
		var actual = MndTagStrippingService(htmlText);
		actual.should.equal(expectedText);
	}));

});
