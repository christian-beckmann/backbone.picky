describe("multi-select collection set select max", function () {
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

    describe("when setMaxSelectable -1, infinite (all) models can be selected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.selectNone();
            collection.setMaxSelectable(-1);
            collection.selectAll();
        });

        it ("should all models are selected", function() {
            var size = _.size(collection.selected);
            expect(size).toBe(2);
        });
    });

    describe("when setMaxSelectable 0, and one model select", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.selectNone();
            collection.setMaxSelectable(0);
            m1.select();
        });

        it("should not have any models in the selected list", function () {
            var size = _.size(collection.selected);
            expect(size).toBe(0);
        });

    });

    describe("when setMaxSelectable 1, only one model should be selected", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.selectNone();
            collection.setMaxSelectable(1);

            //try to select more than 1
            m1.select();
            m2.select();
        });

        it ("should all models are selected", function() {
            var size = _.size(collection.selected);
            expect(size).toBe(1);
        });
    });

    describe("when setMaxSelectable 'abc'", function () {
        var m1, m2, collection;

        beforeEach(function () {
            m1 = new Model();
            m2 = new Model();

            collection = new Collection([m1, m2]);
            collection.setMaxSelectable('abc');
        });

        it ("should be -1", function() {
            var maxSelectable = collection.maxSelectable;
            expect(maxSelectable).toBe(-1);
        });
    });

});
