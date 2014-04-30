describe("multi-select collection getSelected", function () {
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

    describe("when 2 models are selected, use getSelected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.selectAll();
        });

        it("should return an array with 2 selected models", function () {
            var arr = collection.getSelected();
            expect(arr).toBeArray();
        });

        it("should return an array with 2 entries", function () {
            var arr = collection.getSelected();
            expect(arr).toBeArrayOfSize(2);
        });
    });

});
