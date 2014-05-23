describe("The MndWordSplittingService", function () {

	beforeEach(angular.mock.module("mnd.sprinkle"));

	it("should be defined by the mnd.sprinkle module", inject(function (MndWordSplittingService) {
		(MndWordSplittingService).should.not.equal(null);
		_.isFunction(MndWordSplittingService).should.equal(true);
	}));

	it("should split a string of text into words", inject(function (MndWordSplittingService) {
		var text = "Hello world, how are you?";
		var expected = [
			"Hello",
			"world,",
			"how",
			"are",
			"you?"
		];
		var actual = MndWordSplittingService(text);
		actual.should.eql(expected);
	}));

});
