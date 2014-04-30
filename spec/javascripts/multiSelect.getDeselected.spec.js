describe("multi-select collection getDeselected", function () {
    var Model = Backbone.Model.extend({
        initialize: function () {
            var selectable = new Backbone.Picky.Selectable();
            _.extend(this, selectable);
        }
    });

    var Collection = Backbone.Collection.extend({
        model: Model,

        initialize: function () {
            var multiSelect = new Backbone.Picky.MultiSelect();
            _.extend(this, multiSelect);
        }
    });

    describe("when 2 models are deselected, use getDeselected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
        });

        it("should return an array with 2 none selected models", function () {
            var arr = collection.getDeselected();
            expect(arr).toBeArray();
        });

        it("should return an array with 2 entries", function () {
            var arr = collection.getDeselected();
            expect(arr).toBeArrayOfSize(2);
        });
    });

    describe("when 1 model is selected, use getDeselected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            m1.select();
        });

        it("should return an array with 1 non selected model entry", function () {
            var arr = collection.getDeselected();
            expect(arr).toBeArrayOfSize(1);
        });
    });

    describe("when 2 models are selected, use getDeselected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.selectAll();
        });

        it("should return an array without any none selected model", function () {
            var arr = collection.getDeselected();
            expect(arr).toBeArrayOfSize(0);
        });
    });

});
