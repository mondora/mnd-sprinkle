describe("The MndReadTimeEstimatingService", function () {

	beforeEach(angular.mock.module("mnd.sprinkle"));

	it("should be defined by the mnd.sprinkle module", inject(function (MndReadTimeEstimatingService) {
		(MndReadTimeEstimatingService).should.not.equal(null);
		_.isFunction(MndReadTimeEstimatingService).should.equal(true);
	}));

	it("should return an estimate (in minutes) of the reading length", inject(function (MndReadTimeEstimatingService) {
		var expected = 40;
		var actual = MndReadTimeEstimatingService(10000, 250);
		actual.should.equal(expected);
	}));

});
